import React from 'react';
import { NextPage } from 'next';
import { UserProfilesPage } from '../../components/pages/user-profiles-page/UserProfilesPage';

interface IProps {}

const UserProfilesRoute: NextPage<IProps> = (props) => {
  return <UserProfilesPage />;
};

export default UserProfilesRoute;
