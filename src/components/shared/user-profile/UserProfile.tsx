import React from 'react';
import { Button, Card, Divider, Grid, Icon, Image, Label, Menu, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { UserProfilesPageStore } from '../../pages/user-profiles-page/UserProfilesPage.store';

interface IProps {
  store: UserProfilesPageStore;
}

export const UserProfile: React.FC<IProps> = observer((props) => {
  return (
    <Segment placeholder={true}>
      <div>
        <Menu compact={true}>
          <Menu.Item as="a">
            Store Hydrated
            <Label color={props.store.isHydrated ? 'teal' : 'red'} floating={true}>
              {props.store.isHydrated ? 'On' : 'Off'}
            </Label>
          </Menu.Item>
          <Menu.Item as="a">
            Store Persisting
            <Label color={props.store.isPersisting ? 'teal' : 'red'} floating={true}>
              {props.store.isPersisting ? 'On' : 'Off'}
            </Label>
          </Menu.Item>
        </Menu>
      </div>
      <Grid columns={2} relaxed="very" verticalAlign="middle" centered={true}>
        <Grid.Column>
          {!props.store.user && (
            <Button basic={true} color="green" onClick={props.store.loadRandomUser}>
              Load Random User
            </Button>
          )}
          {props.store.user && (
            <Card centered={true}>
              <Card.Content>
                <Image floated="right" size="mini" src={props.store.user.picture.thumbnail} />
                <Card.Header>
                  {props.store.user.name.first} {props.store.user.name.last}
                </Card.Header>
                <Card.Meta>{props.store.user.email}</Card.Meta>
                <Card.Description>
                  {props.store.user.location.city}, {props.store.user.location.country}
                </Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                <div className="ui two buttons">
                  <Button basic={true} color="green" onClick={props.store.loadRandomUser}>
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
              <Button
                attached="top"
                content="Rehydrate Store"
                color="green"
                icon="spinner"
                onClick={props.store.rehydrateStore}
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
                onClick={props.store.clearStore}
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
                After clicking &quot;Clear Store Persist&quot;, <b>reload the browser</b> and you will notice the
                locally saved data is no longer loaded into the store.
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <Button
                attached="top"
                content="Stop Store Persist"
                color="orange"
                icon="pause"
                onClick={props.store.stopPersist}
              />
              <Button
                attached="top"
                content="Restart Store Persist"
                color="orange"
                icon="play"
                onClick={props.store.startPersist}
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
                If you click &quot;Stop Store Persist&quot; then click &quot;Load Random User&quot; and reload the
                browser. You will notice it only saved the last data before you stopped listening for changes in the
                store.
                <br />
                <br />
                If you want to restart persisting data you can call <b>startPersist</b> in the store and it will start
                saving any changes to the store again.
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>

      <Divider vertical={true}>Demo</Divider>
    </Segment>
  );
});
