import React from 'react';
import { Button, Card, Divider, Grid, Icon, Image, Label, Menu, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { UserProfilesPageStore } from '../../pages/user-profiles-page/UserProfilesPage.store';
import { useLocalStore } from '../local-store-provider/LocalStoreProvider';

interface IProps {}

export const UserProfile: React.FC<IProps> = observer((props) => {
  const localStore = useLocalStore<UserProfilesPageStore>();

  return (
    <Segment placeholder={true}>
      <div>
        <Menu compact={true}>
          <Menu.Item as="a">
            Store Hydrated
            <Label color={localStore.isHydrated ? 'teal' : 'red'} floating={true}>
              {localStore.isHydrated ? 'Yes' : 'No'}
            </Label>
          </Menu.Item>
          <Menu.Item as="a">
            Store Persisting
            <Label color={localStore.isPersisting ? 'teal' : 'red'} floating={true}>
              {localStore.isPersisting ? 'On' : 'Off'}
            </Label>
          </Menu.Item>
        </Menu>
      </div>
      <Grid columns={2} relaxed="very" verticalAlign="middle" centered={true}>
        <Grid.Column>
          {!localStore.user && (
            <Button basic={true} color="green" onClick={localStore.loadRandomUser}>
              Load Random User
            </Button>
          )}
          {localStore.user && (
            <Card centered={true}>
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
              <Card.Content extra={true}>
                <div className="ui two buttons">
                  <Button basic={true} color="green" onClick={localStore.loadRandomUser}>
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
                Clicking &quot;Load Random User&quot; will update the store and at the same time the data is saved
                locally to{' '}
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
                onClick={localStore.clearPersistedData}
              />
              <Segment attached="bottom" color="red">
                Calling <b>clearPersistedStore</b> in the store will remove the saved data from{' '}
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
                After clicking &quot;Clear Store Persist&quot;, <b>reload the browser</b>.
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <Button
                attached="top"
                content="Pause Store Persist"
                color="orange"
                icon="pause"
                onClick={localStore.pausePersist}
              />
              <Button
                attached="top"
                content="Restart Store Persist"
                color="orange"
                icon="play"
                onClick={localStore.startPersist}
              />
              <Button
                attached="top"
                content="Rehydrate Store"
                color="purple"
                icon="spinner"
                onClick={localStore.rehydrateStore}
              />
              <Segment attached="bottom" color="orange">
                Calling <b>pausePersisting</b> in the store will stop saving any changes to the store but the saved data
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
                If you click &quot;Pause Store Persist&quot; then click &quot;Load Random User&quot; and click
                &quot;Rehydrate Store&quot;. You will notice it only saved the last data before you stopped listening
                for changes in the store.
                <br />
                <br />
                If you want to restart persisting data you can call <b>startPersisting</b> in the store and it will
                start saving any changes to the store again.
              </Segment>

              <Button content="Get Store Persist" color="green" icon="upload" onClick={localStore.getPersistedData} />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>

      <Divider vertical={true}>Demo</Divider>
    </Segment>
  );
});
