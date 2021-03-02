import React, { useState } from 'react';
import { Button, Card, Divider, Grid, Icon, Image, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { UserStore } from './stores/User.store';

export const App: React.FC = observer(() => {
  // const [localStore] = useState(() => persistUserStore());
  const [localStore] = useState(() => new UserStore());

  console.log(`isSynchronized`, localStore.isSynchronized);
  // console.log(`isPersistence`, localStore.isPersistence);

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very">
        <Grid.Column>
          {!localStore.user && (
            <Button basic color="green" onClick={() => localStore.loadRandomUser()}>
              Load Random User
            </Button>
          )}
          {localStore.user && (
            <Card centered>
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
        </Grid.Column>

        <Grid.Column>
          <Grid>
            <Grid.Column>
              <Button
                attached="top"
                content="Reload Browser"
                color="blue"
                icon="redo"
                onClick={() => window.location.reload()}
              />
              <Segment attached="bottom" color="blue">
                <Icon name="arrow left" />
                Clicking "Load Random User" will update the store and the data with be saved (persisted).
                <br />
                <br />
                Refresh the browser and you will notice the data has been saved (persisted).
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <Button
                attached="top"
                content="Clear Store Persist"
                color="red"
                icon="delete"
                onClick={() => localStore.clearStore()}
              />
              <Segment attached="bottom" color="red">
                Calling <b>clearPersist</b> in the store will clear the saved (persisted) data. <br />
                <br />
                After clicking "Clear Store Persist", <b>refresh the browser</b> you will notice the (persisted) data is
                no longer there on load.
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <Button
                attached="top"
                content="Stop Store Persist"
                color="orange"
                icon="stop"
                onClick={() => localStore.stopPersist()}
              />
              <Segment attached="bottom" color="orange">
                Calling <b>stopPersist</b> in the store will stop saving and changes to the store. <br />
                <br />
                If you click "Stop Store Persist" then click "Load Random User" and then refresh the browser you will
                notice only the last user was saved.
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>

      <Divider vertical>Demo</Divider>
    </Segment>
  );
});
