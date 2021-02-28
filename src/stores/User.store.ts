import { makeAutoObservable } from 'mobx';
import { getUserRequest } from '../domains/user/auth.services';
import { IUser } from '../domains/user/auth.types';

export class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  *loadRandomUser() {
    const { data } = yield getUserRequest();

    if (data) {
      this.user = data.results[0];
    }
  }
}

// export const persistRandomUserStore = () => {
//   return persistStore(new RandomUserStore(), ['castsResults', 'showResults', 'sortValue'], 'RandomUserStore');
// };
