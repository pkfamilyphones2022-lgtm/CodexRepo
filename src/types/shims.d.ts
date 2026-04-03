declare module "next" {
  export type Metadata = {
    title?: string;
    description?: string;
  };

  export type NextConfig = Record<string, unknown>;
}

declare module "react" {
  export type ReactNode = unknown;
  export type FormEvent<T = Element> = {
    preventDefault(): void;
    target: T;
  };

  export function useState<S>(initialState: S): [S, (value: S | ((prev: S) => S)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}

declare const process: {
  env: Record<string, string | undefined>;
};
