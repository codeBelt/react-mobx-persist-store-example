import React, { useEffect, useState } from 'react';
import { UserProfilesPageStore } from './UserProfilesPage.store';
import { UserProfile } from '../../shared/user-profile/UserProfile';

interface IProps {}

export const UserProfilesPage: React.FC<IProps> = (props) => {
  const [localStore] = useState(() => new UserProfilesPageStore());

  useEffect(() => {}, [localStore]);

  return (
    <div>
      <h3>MobxPersistStore Example with MobX 6</h3>
      <UserProfile store={localStore} />
    </div>
  );
};

UserProfilesPage.displayName = 'WithMobx6';
UserProfilesPage.defaultProps = {};
