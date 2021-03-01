import React, { useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { UserStore } from './stores/User.store';

export const App: React.FC = observer(() => {
  // const [localStore] = useState(() => persistUserStore());
  const [localStore] = useState(() => new UserStore());

  console.log(`isSynchronized`, localStore.isSynchronized);

  return (
    <Card.Group centered={true}>
      {!localStore.user && (
        <Button basic color="green" onClick={() => localStore.loadRandomUser()}>
          Load Random User
        </Button>
      )}
      {localStore.user && (
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
            </div>
          </Card.Content>
        </Card>
      )}
      <Card>
        <Card.Content>
          <Card.Header>Persist Controllers</Card.Header>
        </Card.Content>
        <Card.Content>
          <Button basic color="red" onClick={() => localStore.clearStore()}>
            Clear Store Persist
          </Button>
          <Button basic color="red" onClick={() => localStore.stopPersist()}>
            Stop Store Persist
          </Button>
          <Button basic color="red" onClick={() => window.location.reload()}>
            Reload Browser
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
});
