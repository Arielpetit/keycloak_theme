declare module '*.html' {
  const content: string;
  export default content;
}

type MainTheme = "vymalo-light" | "vymalo-dark";

declare interface Window {
  setTheme(theme: MainTheme): void;
}