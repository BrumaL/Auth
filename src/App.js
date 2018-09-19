import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBlwKqZd6Tb6ACVoZn4Fy6_QLFfYw_qtww',
            authDomain: 'auth-c15d9.firebaseapp.com',
            databaseURL: 'https://auth-c15d9.firebaseio.com',
            projectId: 'auth-c15d9',
            storageBucket: 'auth-c15d9.appspot.com',
            messagingSenderId: '450995955697'
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                <View 
                style={{ 
                    flex: 1, 
                    marginTop: 240, 
                    justifyContent: 'center', 
                    alignItems: 'center' }}
                >
                    <Spinner />
                </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
