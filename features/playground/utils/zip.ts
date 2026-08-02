/**
 * Minimal, dependency-free ZIP writer (stored, no compression). Produces a
 * valid archive with CRC-32 checksums, local headers, and a central directory.
 */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function utf8(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function u16(value: number): Uint8Array {
  return new Uint8Array([value & 0xff, (value >>> 8) & 0xff]);
}

function u32(value: number): Uint8Array {
  return new Uint8Array([
    value & 0xff,
    (value >>> 8) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 24) & 0xff,
  ]);
}

interface ZipEntry {
  name: string;
  content: string;
}

export function createZip(files: ZipEntry[]): Blob {
  const chunks: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = utf8(file.name);
    const data = utf8(file.content);
    const crc = crc32(data);
    const size = data.length;

    const local = new Uint8Array(30 + nameBytes.length + size);
    local.set(u32(0x04034b50), 0);
    local.set(u16(20), 4);
    local.set(u16(0x0800), 6); // UTF-8 names
    local.set(u16(0), 8);
    local.set(u16(0), 10);
    local.set(u16(0), 12);
    local.set(u32(crc), 14);
    local.set(u32(size), 18);
    local.set(u32(size), 22);
    local.set(u16(nameBytes.length), 26);
    local.set(u16(0), 28);
    local.set(nameBytes, 30);
    local.set(data, 30 + nameBytes.length);
    chunks.push(local);

    const centralHead = new Uint8Array(46 + nameBytes.length);
    centralHead.set(u32(0x02014b50), 0);
    centralHead.set(u16(20), 4);
    centralHead.set(u16(20), 6);
    centralHead.set(u16(0x0800), 8);
    centralHead.set(u16(0), 10);
    centralHead.set(u16(0), 12);
    centralHead.set(u16(0), 14);
    centralHead.set(u32(crc), 16);
    centralHead.set(u32(size), 20);
    centralHead.set(u32(size), 24);
    centralHead.set(u16(nameBytes.length), 28);
    centralHead.set(u16(0), 30);
    centralHead.set(u16(0), 32);
    centralHead.set(u16(0), 34);
    centralHead.set(u16(0), 36);
    centralHead.set(u32(0), 38);
    centralHead.set(u32(offset), 42);
    centralHead.set(nameBytes, 46);
    central.push(centralHead);

    offset += local.length;
  }

  const centralStart = offset;
  const centralBlob = new Uint8Array(central.reduce((sum, c) => sum + c.length, 0));
  let cursor = 0;
  for (const c of central) {
    centralBlob.set(c, cursor);
    cursor += c.length;
  }
  const centralSize = centralBlob.length;

  const eocd = new Uint8Array(22);
  eocd.set(u32(0x06054b50), 0);
  eocd.set(u16(0), 4);
  eocd.set(u16(0), 6);
  eocd.set(u16(files.length), 8);
  eocd.set(u16(files.length), 10);
  eocd.set(u32(centralSize), 12);
  eocd.set(u32(centralStart), 16);
  eocd.set(u16(0), 20);

  const total = new Uint8Array(
    chunks.reduce((sum, c) => sum + c.length, 0) + centralSize + 22
  );
  let pos = 0;
  for (const c of chunks) {
    total.set(c, pos);
    pos += c.length;
  }
  total.set(centralBlob, pos);
  pos += centralSize;
  total.set(eocd, pos);

  return new Blob([total.buffer as ArrayBuffer], { type: "application/zip" });
}
