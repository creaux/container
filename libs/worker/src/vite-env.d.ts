declare const self: {
  onmessage: (message: MessageEvent) => void;
  postMessage: (message: unknown) => void;
};

declare module "*?raw" {
  const content: string;
  export default content;
}

// In a type declaration file, e.g., vite-env.d.ts
declare module "*?worker" {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}
