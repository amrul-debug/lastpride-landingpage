import { API } from '../config/constants';
import type { ServerInfo, PlayerInfo } from '../types/samp';
import { readUInt16, readUInt32, writeUInt16, writeUInt32, writeString } from '../utils/helpers';

interface SAMPResponse {
  players?: Array<{
    id: number;
    name: string;
    score: number;
    ping: number;
  }>;
  info?: {
    hostname: string;
    players: number;
    maxPlayers: number;
    gamemode: string;
    language: string;
  };
  ping?: number;
}

interface ResponseData {
  error?: string;
  players?: SAMPResponse['players'];
  info?: SAMPResponse['info'];
  ping?: SAMPResponse['ping'];
}

export class SAMPQuery {
  private host: string;
  private port: number;
  private readonly SAMP_HEADER = [83, 65, 77, 80];
  private readonly API: {
    PROXY_URL: string;
    ENDPOINTS: {
      INFO: string;
      PLAYERS: string;
      PING: string;
    };
  };

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.API = {
      PROXY_URL: 'http://localhost:5173/api',
      ENDPOINTS: {
        INFO: '/query/info',
        PLAYERS: '/query/players',
        PING: '/query/ping'
      }
    };
  }

  async getServerInfo(): Promise<ServerInfo | null> {
    try {
      const response = await this.sendUDPRequest(this.createPacket('i'));
      if (!response || response.length < 15) return null;

      let offset = 11;

      const isPassworded = response[offset++] === 1;

      const players = readUInt16(response, offset);
      offset += 2;

      const maxPlayers = readUInt16(response, offset);
      offset += 2;

      const readString = () => {
        const length = readUInt32(response, offset);
        offset += 4;
        const str = this.decodeString(response, offset, length);
        offset += length;
        return str;
      };

      const serverName = readString();
      const gameMode = readString();
      const language = readString();

      return {
        players,
        maxPlayers,
        serverName,
        gameMode,
        language,
        isPassworded
      };
    } catch (error) {
      console.error('Failed to query SAMP server:', error);
      return null;
    }
  }

  async getPlayers(): Promise<PlayerInfo[]> {
    try {
      const response = await this.sendUDPRequest(this.createPacket('d'));
      if (!response || response.length < 13) return [];

      let offset = 11;

      const playerCount = readUInt16(response, offset);
      offset += 2;

      const players: PlayerInfo[] = [];

      for (let i = 0; i < playerCount; i++) {
        const id = response[offset++];

        const nameLength = response[offset++];
        const name = this.decodeString(response, offset, nameLength);
        offset += nameLength;

        const score = readUInt32(response, offset);
        offset += 4;

        const ping = readUInt32(response, offset);
        offset += 4;

        players.push({ id, name, score, ping });
      }

      return players;
    } catch (error) {
      console.error('Failed to query SAMP players:', error);
      return [];
    }
  }

  async getPing(): Promise<number> {
    try {
      const pingData = crypto.getRandomValues(new Uint8Array(4));

      const packet = this.createPacket('p');
      const fullPacket = new Uint8Array(packet.length + pingData.length);
      fullPacket.set(packet);
      fullPacket.set(pingData, packet.length);

      const startTime = Date.now();
      const response = await this.sendUDPRequest(fullPacket);
      const endTime = Date.now();

      if (!response || response.length < 15) return -1;

      const isValidResponse = [...pingData].every((byte, i) =>
        response[i + 11] === byte
      );

      return isValidResponse ? endTime - startTime : -1;
    } catch (error) {
      console.error('Failed to ping SAMP server:', error);
      return -1;
    }
  }

  private createPacket(opcode: string): Uint8Array {
    const packet = new Uint8Array(11);

    this.SAMP_HEADER.forEach((byte, index) => {
      packet[index] = byte;
    });

    const ipParts = this.host.split('.').map(Number);
    for (let i = 0; i < 4; i++) {
      packet[i + 4] = ipParts[i];
    }

    packet[8] = this.port & 0xFF;
    packet[9] = (this.port >> 8) & 0xFF;
    packet[10] = opcode.charCodeAt(0);

    return packet;
  }

  private async sendUDPRequest(data: Uint8Array): Promise<Uint8Array | null> {
    try {
      const opcodeChar = String.fromCharCode(data[10]);

      const endpointMap: Record<string, string> = {
        'i': this.API.ENDPOINTS.INFO,
        'd': this.API.ENDPOINTS.PLAYERS,
        'p': this.API.ENDPOINTS.PING
      };

      const endpoint = endpointMap[opcodeChar];
      if (!endpoint) {
        throw new Error(`Unsupported opcode: ${opcodeChar}`);
      }

      const response = await fetch(`${this.API.PROXY_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: this.host,
          port: this.port,
          ...(data.length > 11 && {
            additionalData: Array.from(data.slice(11))
          })
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as { error: string };
        throw new Error(errorData.error || 'Failed to query server');
      }

      const responseData = await response.json() as ResponseData;
      const responseHandlers: Record<string, (data: Uint8Array, responseData: ResponseData) => Uint8Array> = {
        'i': (data, rd) => this.createInfoResponse(data, rd as unknown as ServerInfo),
        'd': (data, rd) => this.createPlayersResponse(data, rd.players || []),
        'p': (data, rd) => this.createPingResponse(data, rd as unknown as number)
      };

      return responseHandlers[opcodeChar](data, responseData);
    } catch (error) {
      console.error('Error in sendUDPRequest:', error);
      return null;
    }
  }

  private createPingResponse(request: Uint8Array, _pingValue: number): Uint8Array {
    const response = new Uint8Array(15);
    response.set(request.slice(0, 11));
    response.set(request.slice(11, 15), 11);
    return response;
  }

  private createInfoResponse(request: Uint8Array, info: ServerInfo): Uint8Array {
    const encoder = new TextEncoder();
    const serverNameBytes = encoder.encode(info.serverName);
    const gameModeBytes = encoder.encode(info.gameMode);
    const languageBytes = encoder.encode(info.language);

    const totalSize = 11 + 1 + 2 + 2 + 4 + serverNameBytes.length + 4 + gameModeBytes.length + 4 + languageBytes.length;
    const response = new Uint8Array(totalSize);

    response.set(request.slice(0, 11));
    let offset = 11;

    response[offset++] = info.isPassworded ? 1 : 0;

    writeUInt16(response, offset, info.players);
    offset += 2;

    writeUInt16(response, offset, info.maxPlayers);
    offset += 2;

    writeString(response, offset, serverNameBytes);
    offset += 4 + serverNameBytes.length;

    writeString(response, offset, gameModeBytes);
    offset += 4 + gameModeBytes.length;

    writeString(response, offset, languageBytes);

    return response;
  }

  private createPlayersResponse(request: Uint8Array, players: PlayerInfo[]): Uint8Array {
    const encoder = new TextEncoder();

    let totalSize = 11 + 2;
    for (const player of players) {
      const nameBytes = encoder.encode(player.name);
      totalSize += 1 + 1 + nameBytes.length + 4 + 4;
    }

    const response = new Uint8Array(totalSize);
    response.set(request.slice(0, 11));

    let offset = 11;

    writeUInt16(response, offset, players.length);
    offset += 2;

    for (const player of players) {
      const nameBytes = encoder.encode(player.name);

      response[offset++] = player.id;
      response[offset++] = nameBytes.length;

      response.set(nameBytes, offset);
      offset += nameBytes.length;

      writeUInt32(response, offset, player.score);
      offset += 4;

      writeUInt32(response, offset, player.ping);
      offset += 4;
    }

    return response;
  }

  private decodeString(buffer: Uint8Array, offset: number, length: number): string {
    return new TextDecoder().decode(buffer.slice(offset, offset + length));
  }
}
