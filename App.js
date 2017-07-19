import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';



class App extends React.Component {
  state = { loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCQ7RL6-AStBt3f4YhSLh4el5aQH7HBSzw',
      authDomain: 'whats-occurrin.firebaseapp.com',
      databaseURL: 'https://whats-occurrin.firebaseio.com',
      projectId: 'whats-occurrin',
      storageBucket: 'whats-occurrin.appspot.com',
      messagingSenderId: '104730148110'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true: <Button>
        log Out
      </Button>;
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large" />
    }
  }


  render() {
    return (
      <View>
        <Header headerText={'What\'s Occurring?'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
