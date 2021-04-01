import { makeAutoObservable, runInAction } from 'mobx';
import { getUserRequest } from '../../../domains/auth/auth.services';
import { IUser } from '../../../domains/auth/auth.types';

export class UserProfilesPageStore {
  user: IUser | null = null;
  list: IUser[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadRandomUser(): Promise<void> {
    const { data } = await getUserRequest();

    if (data) {
      runInAction(() => {
        this.user = data.results[0];

        this.list.push(this.user);
      });
    }
  }
}
