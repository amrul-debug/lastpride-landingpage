const express = require('express');
const cors = require('cors');
const dgram = require('dgram');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const QUERY_TIMEOUT = 3000;
const SAMP_HEADER = Buffer.from('SAMP');
app.use(cors());
app.use(express.json());

const udpClient = dgram.createSocket('udp4');
udpClient.on('error', (err) => {
  const errorDetails = {
    message: err.message,
    code: err.code,
    stack: err.stack,
    timestamp: new Date().toISOString()
  };
  
  console.error('UDP socket error:', JSON.stringify(errorDetails, null, 2));
  
  // Attempt to recover the socket
  try {
    udpClient.close();
    udpClient.bind();
  } catch (recoveryError) {
    console.error('Failed to recover UDP socket:', recoveryError);
  }
});


function querySAMPServer(host, port, opcode, additionalData = null) {
  return new Promise((resolve, reject) => {
    try {
      const packet = createPacket(host, port, opcode, additionalData);

      // Set a timeout for the request
      const timeout = setTimeout(() => {
        udpClient.removeListener('message', onMessage);
        reject(new Error('Request timed out'));
      }, QUERY_TIMEOUT);

      // Message handler
      function onMessage(msg, rinfo) {
        // Check if the message is from the server we queried
        if (rinfo.address === host && rinfo.port === port) {
          clearTimeout(timeout);
          udpClient.removeListener('message', onMessage);

          // Validate response
          if (!msg || msg.length < 11) {
            return reject(new Error(`Invalid response: too short (${msg ? msg.length : 0} bytes)`));
          }

          // Check if the response has the SAMP header
          if (msg.slice(0, 4).toString() !== 'SAMP') {
            return reject(new Error('Invalid response: missing SAMP header'));
          }

          resolve(msg);
        }
      }

      // Listen for messages
      udpClient.on('message', onMessage);

      // Send the packet
      udpClient.send(packet, 0, packet.length, port, host, (err) => {
        if (err) {
          clearTimeout(timeout);
          udpClient.removeListener('message', onMessage);
          reject(err);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}


function createPacket(host, port, opcode, additionalData = null) {
  const packetSize = 11 + (additionalData ? additionalData.length : 0);
  const packet = Buffer.alloc(packetSize);

  SAMP_HEADER.copy(packet, 0);

  const ipParts = host.split('.').map(Number);
  for (let i = 0; i < 4; i++) {
    packet[i + 4] = ipParts[i];
  }

  packet.writeUInt16LE(port, 8);
  packet.write(opcode, 10, 1);

  if (additionalData) {
    additionalData.copy(packet, 11);
  }

  return packet;
}


function validateRequest(req, res) {
  const { host, port } = req.body;

  if (!host || !port) {
    res.status(400).json({ error: 'Host and port are required' });
    return false;
  }

  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(host)) {
    res.status(400).json({ error: 'Invalid host format' });
    return false;
  }

  const portNum = parseInt(port, 10);
  if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
    res.status(400).json({ error: 'Invalid port number' });
    return false;
  }

  return { host, port: portNum };
}


function handleError(res, operation, error) {
  console.error(`Error ${operation}:`, error);

  // Send a more user-friendly error message
  const errorMessage = error.message || 'Unknown error';
  const userMessage = errorMessage.includes('ECONNREFUSED')
    ? 'Could not connect to the server. The server might be offline or the address is incorrect.'
    : errorMessage.includes('timed out')
    ? 'The server did not respond in time. It might be offline or experiencing high latency.'
    : errorMessage.includes('Invalid response')
    ? 'Received an invalid response from the server. The server might be running a different version of SA-MP.'
    : errorMessage;

  res.status(500).json({
    error: userMessage,
    details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
  });
}


app.post('/api/query/info', async (req, res) => {
  try {
    const params = validateRequest(req, res);
    if (!params) return;

    const { host, port } = params;

    // Add a timeout for the entire request
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), QUERY_TIMEOUT + 1000);
    });

    // Race between the actual query and the timeout
    const response = await Promise.race([
      querySAMPServer(host, port, 'i'),
      timeoutPromise
    ]);

    // Parse the response and send it back
    const result = parseInfoResponse(response);

    // Add server address to the response
    result.address = `${host}:${port}`;

    res.json(result);
  } catch (error) {
    handleError(res, 'querying server info', error);
  }
});


app.post('/api/query/players', async (req, res) => {
  try {
    const params = validateRequest(req, res);
    if (!params) return;

    const { host, port } = params;

    // Add a timeout for the entire request
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), QUERY_TIMEOUT + 1000);
    });

    // Race between the actual query and the timeout
    const response = await Promise.race([
      querySAMPServer(host, port, 'd'),
      timeoutPromise
    ]);

    // Parse the response and send it back
    const result = parsePlayersResponse(response);

    // Add server address to the response
    result.address = `${host}:${port}`;

    res.json(result);
  } catch (error) {
    handleError(res, 'querying player list', error);
  }
});


app.post('/api/query/ping', async (req, res) => {
  try {
    const params = validateRequest(req, res);
    if (!params) return;

    const { host, port } = params;
    const pingData = Buffer.alloc(4);
    crypto.randomFillSync(pingData);

    // Add a timeout for the entire request
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), QUERY_TIMEOUT + 1000);
    });

    const startTime = Date.now();

    // Race between the actual query and the timeout
    const response = await Promise.race([
      querySAMPServer(host, port, 'p', pingData),
      timeoutPromise
    ]);

    const endTime = Date.now();

    // Validate response
    if (!response || response.length < 15) {
      return res.status(500).json({
        error: 'Invalid ping response: response too short',
        address: `${host}:${port}`
      });
    }

    // Check if the response contains our ping data
    const responseData = Buffer.from(response.subarray(11, 15));
    const isValidResponse = Buffer.compare(responseData, pingData) === 0;

    if (!isValidResponse) {
      return res.status(500).json({
        error: 'Invalid ping response: data mismatch',
        address: `${host}:${port}`
      });
    }

    // Return the ping time
    res.json({
      ping: endTime - startTime,
      address: `${host}:${port}`
    });
  } catch (error) {
    handleError(res, 'pinging server', error);
  }
});


function readUInt16(buffer, offset) {
  if (offset + 2 > buffer.length) {
    console.warn(`Buffer out of bounds: tried to read UInt16 at offset ${offset} but buffer length is ${buffer.length}`);
    return 0;
  }
  return buffer.readUInt16LE(offset);
}


function readUInt32(buffer, offset) {
  if (offset + 4 > buffer.length) {
    console.warn(`Buffer out of bounds: tried to read UInt32 at offset ${offset} but buffer length is ${buffer.length}`);
    return 0;
  }
  return buffer.readUInt32LE(offset);
}


function readString(buffer, offset) {
  if (offset + 4 > buffer.length) {
    console.warn(`Buffer out of bounds: tried to read string length at offset ${offset} but buffer length is ${buffer.length}`);
    return { str: "", newOffset: offset };
  }

  const length = readUInt32(buffer, offset);
  offset += 4;

  if (offset + length > buffer.length) {
    console.warn(`Buffer out of bounds: tried to read string of length ${length} at offset ${offset} but buffer length is ${buffer.length}`);
    return { str: "", newOffset: offset };
  }

  const str = buffer.toString('utf8', offset, offset + length);

  return { str, newOffset: offset + length };
}


function parseInfoResponse(response) {
  // Check if response is valid
  if (!response || response.length < 11) {
    console.warn(`Invalid response: too short (${response ? response.length : 0} bytes)`);
    return {
      isPassworded: false,
      players: 0,
      maxPlayers: 0,
      serverName: "Unknown",
      gameMode: "Unknown",
      language: "Unknown"
    };
  }

  let offset = 11;

  // Check if we can read the password flag
  if (offset >= response.length) {
    console.warn(`Invalid response: can't read password flag at offset ${offset}`);
    return {
      isPassworded: false,
      players: 0,
      maxPlayers: 0,
      serverName: "Unknown",
      gameMode: "Unknown",
      language: "Unknown"
    };
  }

  const isPassworded = response[offset++] === 1;

  const players = readUInt16(response, offset);
  offset += 2;

  const maxPlayers = readUInt16(response, offset);
  offset += 2;

  let result = readString(response, offset);
  const serverName = result.str;
  offset = result.newOffset;

  result = readString(response, offset);
  const gameMode = result.str;
  offset = result.newOffset;

  result = readString(response, offset);
  const language = result.str;

  return {
    isPassworded,
    players,
    maxPlayers,
    serverName: serverName || "Unknown",
    gameMode: gameMode || "Unknown",
    language: language || "Unknown"
  };
}


function parsePlayersResponse(response) {
  // Check if response is valid
  if (!response || response.length < 11) {
    console.warn(`Invalid response: too short (${response ? response.length : 0} bytes)`);
    return { players: [] };
  }

  let offset = 11;

  // Check if we can read the player count
  if (offset + 2 > response.length) {
    console.warn(`Invalid response: can't read player count at offset ${offset}`);
    return { players: [] };
  }

  const playerCount = readUInt16(response, offset);
  offset += 2;

  // Sanity check for player count
  if (playerCount > 1000) {
    console.warn(`Invalid player count: ${playerCount} (likely corrupted data)`);
    return { players: [] };
  }

  const players = [];

  for (let i = 0; i < playerCount; i++) {
    // Check if we can read the player ID
    if (offset >= response.length) {
      console.warn(`Buffer out of bounds: tried to read player ID at offset ${offset} but buffer length is ${response.length}`);
      break;
    }
    const id = response[offset++];

    // Check if we can read the name length
    if (offset >= response.length) {
      console.warn(`Buffer out of bounds: tried to read name length at offset ${offset} but buffer length is ${response.length}`);
      break;
    }
    const nameLength = response[offset++];

    // Sanity check for name length
    if (nameLength > 100 || offset + nameLength > response.length) {
      console.warn(`Invalid name length: ${nameLength} at offset ${offset} (buffer length: ${response.length})`);
      break;
    }

    const name = response.toString('utf8', offset, offset + nameLength);
    offset += nameLength;

    // Check if we can read the score
    if (offset + 4 > response.length) {
      console.warn(`Buffer out of bounds: tried to read score at offset ${offset} but buffer length is ${response.length}`);
      break;
    }
    const score = readUInt32(response, offset);
    offset += 4;

    // Check if we can read the ping
    if (offset + 4 > response.length) {
      console.warn(`Buffer out of bounds: tried to read ping at offset ${offset} but buffer length is ${response.length}`);
      break;
    }
    const ping = readUInt32(response, offset);
    offset += 4;

    players.push({ id, name, score, ping });
  }

  return { players };
}


app.listen(PORT, () => {
  console.log(`SAMP Query Proxy server running on port ${PORT}`);
  console.log(`Server is available at http://localhost:${PORT}`);
});
