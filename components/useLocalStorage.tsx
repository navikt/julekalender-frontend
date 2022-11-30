export function useLocalStorage(): [
  (key: string, value: string) => void,
  (key: string) => string | null
] {
  const save = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, value);
    }
  };

  const load = (key: string): string | null => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key);
    }
    return null;
  };

  return [save, load];
}
