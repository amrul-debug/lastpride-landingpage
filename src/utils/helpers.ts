export function formatDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided to formatDate');
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}


export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }

  return formatDate(date);
}


export function truncateString(str: string, maxLength: number): string {
  if (typeof str !== 'string') {
    throw new Error('First argument must be a string');
  }
  
  if (typeof maxLength !== 'number' || maxLength < 0) {
    throw new Error('Second argument must be a positive number');
  }

  if (str.length <= maxLength) {
    return str;
  }

  return `${str.slice(0, maxLength - 3)}...`;
}


export function getPingColorClass(ping: number): string {
  if (typeof ping !== 'number' || isNaN(ping)) {
    throw new Error('Ping must be a valid number');
  }

  if (ping < 0) return 'text-gray-400';
  if (ping < 100) return 'text-gta-green';
  if (ping < 200) return 'text-gta-orange';
  return 'text-gta-red';
}


export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}


export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = func(...args);
    cache.set(key, result);

    return result;
  };
}


export function readUInt16(buffer: Uint8Array, offset: number): number {
  return buffer[offset] | (buffer[offset + 1] << 8);
}


export function readUInt32(buffer: Uint8Array, offset: number): number {
  return buffer[offset] |
         (buffer[offset + 1] << 8) |
         (buffer[offset + 2] << 16) |
         (buffer[offset + 3] << 24);
}


export function writeUInt16(buffer: Uint8Array, offset: number, value: number): void {
  buffer[offset] = value & 0xFF;
  buffer[offset + 1] = (value >> 8) & 0xFF;
}


export function writeUInt32(buffer: Uint8Array, offset: number, value: number): void {
  buffer[offset] = value & 0xFF;
  buffer[offset + 1] = (value >> 8) & 0xFF;
  buffer[offset + 2] = (value >> 16) & 0xFF;
  buffer[offset + 3] = (value >> 24) & 0xFF;
}


export function writeString(buffer: Uint8Array, offset: number, stringBytes: Uint8Array): void {
  writeUInt32(buffer, offset, stringBytes.length);
  buffer.set(stringBytes, offset + 4);
}

export function validatePort(port: number): boolean {
  return Number.isInteger(port) && port > 0 && port <= 65535;
}

export function validateHostname(hostname: string): boolean {
  const hostnameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
  return hostnameRegex.test(hostname);
}

export function sanitizeString(str: string): string {
  return str.replace(/[<>]/g, '');
}

export function formatNumber(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Input must be a valid number');
  }
  return new Intl.NumberFormat('en-US').format(num);
}
