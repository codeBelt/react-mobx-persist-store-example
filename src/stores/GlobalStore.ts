import { ToastGlobalStore } from './toast/ToastGlobalStore';
import { configure } from 'mobx';
import environment from 'environment';
import { enableStaticRendering } from 'mobx-react-lite';
import { AuthGlobalStore } from './auth/AuthGlobalStore';
import { configurePersistable } from 'mobx-persist-store';
import localForage from 'localforage';
import ms from 'milliseconds';

enableStaticRendering(environment.isServer);
// https://mobx.js.org/configuration.html#configuration-
configure({
  enforceActions: 'always',
  computedRequiresReaction: environment.isBrowser,
  reactionRequiresObservable: environment.isBrowser,
  observableRequiresReaction: environment.isBrowser,
  disableErrorBoundaries: false,
});
configurePersistable(
  {
    storage: environment.isBrowser ? localForage : undefined,
    expireIn: ms.days(1),
    stringify: false,
    debugMode: true,
  },
  { delay: 200, fireImmediately: false }
);

export default class GlobalStore {
  readonly authStore: AuthGlobalStore;
  readonly toastStore: ToastGlobalStore;

  constructor() {
    this.authStore = new AuthGlobalStore(this);
    this.toastStore = new ToastGlobalStore(this);
  }

  async hydrate(initialState?: Partial<GlobalStore>) {
    // TODO: hydrate your global stores when needed
    // this.exampleStore.hydrate(initialState.exampleStore);
  }
}
