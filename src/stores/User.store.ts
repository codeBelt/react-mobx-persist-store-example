import { makeAutoObservable } from 'mobx';
import { getUserRequest } from '../domains/user/auth.services';
import { IUser } from '../domains/user/auth.types';
import { stopPersist, clearPersist, isSynchronized } from 'mobx-persist-store';
import { persistStore } from '../utils/mobx.utils';

export class UserStore {
  user: IUser | null = null;

  get isSynchronized() {
    return isSynchronized(this);
  }

  constructor() {
    makeAutoObservable(this);

    const thing = persistStore(this, ['user'], 'UserStore');
    console.log(`thing`, thing);
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
//
// export const persistUserStore = () => {
//   return persistence({
//     name: 'UserStore',
//     properties: ['user'],
//     adapter: new StorageAdapter({
//       read: async (name: string) => {
//         const data = window.localStorage.getItem(name);
//
//         return data ? JSON.parse(data) : undefined;
//       },
//       write: async (name, content) => {
//         // console.log(`write`, name, content);
//         window.localStorage.setItem(name, JSON.stringify(content));
//
//         return undefined;
//       },
//     }),
//     reactionOptions: {
//       delay: 200,
//     },
//   })(new UserStore());
// };
