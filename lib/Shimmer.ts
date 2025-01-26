
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%"/>
      <stop stop-color="#edeef1" offset="20%"/>
      <stop stop-color="#f6f7f8" offset="40%"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8"/>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);