import React from 'react';
import { Text } from 'react-native'
import { Button, Event, EventSection, Field, Spinner } from './common';
import firebase from 'firebase';



class LoginForm extends React.Component {
  state = { email: '',password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch(this.onLoginFail.bind(this))
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''

    });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false })
}

renderButton() {
  if (this.state.loading) {
    return <Spinner size="small" />
  }
  return (
    <Button onPress={this.onButtonPress.bind(this)}>
      Log In
          </Button>
  )
}

render() {
  return (
    <Event>
      <EventSection>
        <Field
          placeholder="user@gmail.com"
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
      </EventSection>

      <EventSection>
        <Field
          secureTextEntry
          placeholder="password"
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

      </EventSection>

      <Text style={styles.errorTextStyle}>
        {this.state.error}
      </Text>

      <EventSection>
        {this.renderButton()}
      </EventSection>
    </Event>
  );
}
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'

  }

}

export default LoginForm;
