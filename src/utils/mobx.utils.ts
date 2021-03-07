import { PersistenceStore } from 'mobx-persist-store/lib/types';
import { persistence, StorageAdapter } from 'mobx-persist-store';

export const persistStore = <T extends Record<string, any>, P extends keyof T>(
  target: T,
  properties: P[],
  persistName: string
): T | PersistenceStore<T> => {
  // If you are using Next.js or server side rendering
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return target;
  }

  return persistence({
    name: persistName,
    properties: properties as string[],
    adapter: new StorageAdapter({
      read: async (name) => {
        const data = window.localStorage.getItem(name);

        return data ? JSON.parse(data) : undefined;
      },
      write: async (name, content) => {
        window.localStorage.setItem(name, JSON.stringify(content));
      },
    }),
    reactionOptions: {
      delay: 200,
    },
  })(target);
};
