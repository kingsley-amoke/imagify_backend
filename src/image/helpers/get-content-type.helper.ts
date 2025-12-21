export function getContentType(format: string): string {
  const formatMap = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
  };
  return formatMap[format.toLowerCase()] || 'application/octet-stream';
}
