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
  getPersistedStore,
  StorageController,
} from 'mobx-persist-store';
import environment from 'environment';
import { delay } from '../../../utils/misc.utils';
import ms from 'milliseconds';

const customizedStorageController: StorageController | undefined = environment.isBrowser
  ? {
      setItem: (key, data) => window.localStorage.setItem(key, data),
      removeItem: (key) => window.localStorage.removeItem(key),
      getItem: async (key: string) => {
        await delay(ms.seconds(2));

        return window.localStorage.getItem(key);
      },
    }
  : undefined;

export class UserProfilesPageStore {
  user: IUser | null = null;
  list: IUser[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'UserProfilesPageStore',
      properties: ['user', 'list'],
      storage: customizedStorageController,
    });
  }

  get isHydrated(): boolean {
    return isHydrated(this);
  }

  get isPersisting(): boolean {
    return isPersisting(this);
  }

  async clearPersistedData(): Promise<void> {
    await clearPersistedStore(this);
  }

  pausePersist(): void {
    pausePersisting(this);
  }

  startPersist(): void {
    startPersisting(this);
  }

  disposePersist(): void {
    stopPersisting(this);
  }

  async rehydrateStore(): Promise<void> {
    await hydrateStore(this);
  }

  async getPersistedData(): Promise<void> {
    const data = await getPersistedStore(this);

    alert(JSON.stringify(data));
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
