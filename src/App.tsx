import React, { useState } from 'react';
import { Button, Card, Divider, Grid, Icon, Image, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { UserStore } from './stores/User.store';

export const App: React.FC = observer(() => {
  const [localStore] = useState(() => new UserStore());

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" verticalAlign="middle" centered>
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
                Clicking "Load Random User" will update the store and at the same time the data is saved locally to{' '}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                  target="_blank"
                  rel="noreferrer"
                >
                  localStorage
                </a>
                .
                <br />
                <br />
                Refresh the browser and you will notice the data will be loaded into the store automatically.
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
                Calling <b>clearPersist</b> in the store will remove the saved data from{' '}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                  target="_blank"
                  rel="noreferrer"
                >
                  localStorage
                </a>
                .
                <br />
                <br />
                After clicking "Clear Store Persist", <b>reload the browser</b> and you will notice the locally saved
                data is no longer loaded into the store.
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
                Calling <b>stopPersist</b> in the store will stop saving any changes to the store but the saved data
                will still live in{' '}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                  target="_blank"
                  rel="noreferrer"
                >
                  localStorage
                </a>
                . <br />
                <br />
                If you click "Stop Store Persist" then click "Load Random User" and reload the browser. You will notice
                it only saved the last data before you stopped listening for changes in the store.
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>

      <Divider vertical>Demo</Divider>
    </Segment>
  );
});
