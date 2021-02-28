import React, { useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { UserStore } from './stores/User.store';

export const App: React.FC = observer(() => {
  const [localStore] = useState(() => new UserStore());

  if (!localStore.user) {
    return (
      <Button basic color="green" onClick={() => localStore.loadRandomUser()}>
        Load Random User
      </Button>
    );
  }

  return (
    <Card.Group centered={true}>
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" src={localStore.user.picture.thumbnail} />
          <Card.Header>
            {localStore.user.name.first} {localStore.user.name.last}
          </Card.Header>
          <Card.Meta>{localStore.user.email}</Card.Meta>
          <Card.Description>
            {localStore.user.location.city}, {localStore.user.location.country}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green" onClick={() => localStore.loadRandomUser()}>
              Load Random User
            </Button>
            {/*<Button basic color="red">
              Decline
            </Button>*/}
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
});
