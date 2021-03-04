import { makeAutoObservable } from 'mobx';
import { getUserRequest } from '../domains/user/user.services';
import { IUser } from '../domains/user/user.types';
import { stopPersist, clearPersist, isSynchronized, persistence, StorageAdapter } from 'mobx-persist-store';
import { persistStore } from '../utils/mobx.utils';

export class UserStore {
  user: IUser | null = null;

  get isSynchronized() {
    return isSynchronized(this);
  }

  // get isPersistence() {
  //   return isPersistence(this);
  // }

  constructor() {
    makeAutoObservable(this);

    persistStore(this, ['user'], 'UserStore');
  }

  async clearStore() {
    await clearPersist(this);
  }

  stopPersist() {
    stopPersist(this);
  }

  *loadRandomUser() {
    const { data } = yield getUserRequest();

    if (data) {
      this.user = data.results[0];
    }
  }
}

/*
export const persistUserStore = () => {
  return persistence({
    name: 'UserStore',
    properties: ['user'],
    adapter: new StorageAdapter({
      read: async (name: string) => {
        const data = window.localStorage.getItem(name);

        return data ? JSON.parse(data) : undefined;
      },
      write: async (name, content) => {
        // console.log(`write`, name, content);
        window.localStorage.setItem(name, JSON.stringify(content));

        return undefined;
      },
    }),
    reactionOptions: {
      delay: 200,
    },
  })(new UserStore());
};
*/
