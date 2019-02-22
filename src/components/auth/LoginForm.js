import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, goToResetPassword, goToRegistration } from '../../actions';
import { Card, CardSection, Spinner, Input } from '../general';
import {RkTheme, RkAvoidKeyboard, RkButton} from 'react-native-ui-kitten';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderLogInButton() {
    return (
      <RkButton rkType='rounded stretch'
        style={{backgroundColor: '#FECB00', marginTop: 10, marginBottom: 10}}
        contentStyle={{color: 'white', fontWeight: 'bold'}}
        onPress={this.onButtonPress.bind(this)}>
        LOGIN
      </RkButton>
    );
  }

  renderResetPassword() {
    return (
      <View style={styles.resetPasswordContainer}>
        <TouchableOpacity
          onPress={this.props.goToResetPassword}>
          <Text style={styles.resetPasswordButton}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderSignUpButton() {
    return (
      <View style={styles.signUpContainer}>
        <Text style={styles.question}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={this.props.goToRegistration}>
          <Text style={styles.signUpButton}> Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderButtons() {
    if (this.props.loading) {
      return (
        <View style={{ marginTop: 40, marginBottom: 20}}>
          <Spinner size="large" />
        </View>
      );
    };
    return (
      <View>
        {this.renderLogInButton()}
        {this.renderResetPassword()}
        {this.renderSignUpButton()}
      </View>
    );
  }

  renderContent() {
    if (this.props.loggedIn) {
      return <Spinner />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.formContainerStyle}>
            <RkAvoidKeyboard>
            <View style={{flexDirection: 'row', justifyContent: 'center', bottom: 10}}>
              <Image
                source={require('../../assets/images/Icon_SHPE_UCF_152x152.png')}
                style={{width: 100, height: 100}}/>
            </View>
				<View style= {styles.headercolumn}>
            <View style={styles.headerStyle}>
              <Text style={styles.headerTextStyle}>S H P E  </Text>
							<Text style={styles.headerlowerTextStyle}>U C F </Text>
            </View>
						<Text style={styles.headerSubtitleStyle}>Society of Hispanic Professional Engineers</Text>
						</View>
            <Input
              placeholder="Knights Email"
              value={this.props.email}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={this.onEmailChange.bind(this)}
            />
            <Input
              secureTextEntry={true}
              placeholder="Password"
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
            />

            {this.renderError()}
            {this.renderButtons()}

            </RkAvoidKeyboard>
          </View>
        </View>
      );
    }
  }

  render() {
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0b0b',
    justifyContent: 'flex-end',
  },
  formContainerStyle: {
    marginLeft: 20,
    marginRight: 20,
    bottom: 90,
  },
  headerStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
		marginTop: 5,
    marginBottom: 5,
  },
  headerTextStyle: {
		color: 'white',
    fontSize: 40,
  },
	headercolumn: {
	 flexDirection: 'column',
	 alignItems: 'center',
	 justifyContent: 'center',
	 padding: 5,
	 marginBottom: 10,

	},
	headerlowerTextStyle: {
		color: 'yellow',
    fontSize: 40,
  },
	headerSubtitleStyle: {
		color: 'gray',
		fontWeight: 'bold',
		marginBottom: 50
	},
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
    padding: 10,
  },
  formButton: {
    marginTop: 10,
    marginBottom: 10
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
		//color: 'white',
  },
  resetPasswordButton: {
    fontWeight: 'bold',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpButton: {
    fontWeight: 'bold',
    color: 'white',
  },
	question: {
		fontWeight: 'bold',
		color: 'grey',
	},
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedIn } = auth;

  return { email, password, error, loading, loggedIn };
};

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  loginUser,
  goToResetPassword,
  goToRegistration};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
