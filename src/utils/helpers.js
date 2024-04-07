export const fixedPathname = (pathname) =>
  pathname
    .split('%20')
    .filter((p) => p !== '%20')
    .join(' ');
