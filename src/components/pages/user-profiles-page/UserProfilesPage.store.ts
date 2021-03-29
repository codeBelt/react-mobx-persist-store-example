import { makeAutoObservable, runInAction } from 'mobx';
import { getUserRequest } from '../../../domains/auth/auth.services';
import { IUser } from '../../../domains/auth/auth.types';
import { makePersistable } from 'mobx-persist-store';
import localForage from 'localforage';
import environment from 'environment';

export class UserProfilesPageStore {
  user: IUser | null = null;
  list: IUser[] = [];

  storePersist = makePersistable(
    this,
    {
      name: 'UserProfilesPageStore',
      properties: ['user', 'list'],
      storage: environment.isBrowser ? localForage : undefined,
      // storage: isBrowser ? window.localStorage : noopStorage,
      // storage: isBrowser ? AsyncStorage : noopStorage,
      stringify: true,
    },
    { delay: 200 }
  );

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isHydrated(): boolean {
    return this.storePersist.isHydrated;
  }

  get isPersisting(): boolean {
    return this.storePersist.isPersisting;
  }

  async clearStore(): Promise<void> {
    await this.storePersist.clearPersistedStore();
  }

  stopPersist(): void {
    this.storePersist.pausePersisting();
  }

  startPersist(): void {
    this.storePersist.startPersisting();
  }

  stopPersisting(): void {
    this.storePersist.stopPersisting();
  }

  async rehydrateStore(): Promise<void> {
    await this.storePersist.hydrateStore();
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
