import { PersistenceStore } from 'mobx-persist-store/lib/types';
import { persistence, StorageAdapter } from 'mobx-persist-store';

export const persistStore = <T extends { [key: string]: any }, K extends keyof T>(
  target: T,
  properties: K[],
  name: string
): T | PersistenceStore<T> => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return target;
  }

  return persistence({
    name: name,
    properties: properties as string[],
    adapter: new StorageAdapter({
      read: async (name: string) => {
        const data = window.localStorage.getItem(name);

        return data ? JSON.parse(data) : undefined;
      },
      write: async (name, content) => {
        window.localStorage.setItem(name, JSON.stringify(content));

        return undefined;
      },
    }),
    reactionOptions: {
      delay: 200,
    },
  })(target);
};
