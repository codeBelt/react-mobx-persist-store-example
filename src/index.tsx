import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Container, Divider, Header, List } from 'semantic-ui-react';
import { configure } from 'mobx';

// https://mobx.js.org/configuration.html#configuration-
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

ReactDOM.render(
  <React.StrictMode>
    <Container style={{ margin: 20 }}>
      <Header as="h1" dividing>
        Mobx Persist Store with MobX 6
      </Header>
      <List bulleted>
        <List.Item
          as="a"
          content="Official Documentation"
          href="https://github.com/quarrant/mobx-persist-store"
          target="_blank"
        />
      </List>
      <Divider hidden />
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
