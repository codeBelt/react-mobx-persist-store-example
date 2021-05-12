import React, { useEffect, useState } from 'react';
import { UserProfilesPageStore } from './UserProfilesPage.store';
import { UserProfile } from '../../shared/user-profile/UserProfile';
import { LocalStoreProvider } from '../../shared/local-store-provider/LocalStoreProvider';

interface IProps {}

export const UserProfilesPage: React.FC<IProps> = (props) => {
  const [localStore] = useState(() => new UserProfilesPageStore());

  useEffect(() => {
    return () => localStore.disposePersist();
  }, [localStore]);

  return (
    <LocalStoreProvider localStore={localStore}>
      <h3>MobxPersistStore Example with MobX 6</h3>
      <UserProfile />
    </LocalStoreProvider>
  );
};

UserProfilesPage.displayName = 'WithMobx6';
UserProfilesPage.defaultProps = {};
