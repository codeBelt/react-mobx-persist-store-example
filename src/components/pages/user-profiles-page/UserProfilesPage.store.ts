import { makeAutoObservable, runInAction } from 'mobx';
import { getUserRequest } from '../../../domains/auth/auth.services';
import { IUser } from '../../../domains/auth/auth.types';
import {
  clearPersistedStore,
  hydrateStore,
  isPersisting,
  makePersistable,
  pausePersisting,
  startPersisting,
  isHydrated,
  stopPersisting,
} from 'mobx-persist-store';

export class UserProfilesPageStore {
  user: IUser | null = null;
  list: IUser[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, { name: 'UserProfilesPageStore', properties: ['user', 'list'] });
  }

  get isHydrated(): boolean {
    return isHydrated(this);
  }

  get isPersisting(): boolean {
    return isPersisting(this);
  }

  async clearStore(): Promise<void> {
    await clearPersistedStore(this);
  }

  stopPersist(): void {
    pausePersisting(this);
  }

  startPersist(): void {
    startPersisting(this);
  }

  stopPersisting(): void {
    stopPersisting(this);
  }

  async rehydrateStore(): Promise<void> {
    await hydrateStore(this);
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
