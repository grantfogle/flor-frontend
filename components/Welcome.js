import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BGImage from '../images/welcomeBackground.jpg';
import logo from '../images/florLogo.png';
import { Icon } from 'react-native-elements';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            alert: false,
            alertMessage: '',
        }
    }
    async fetchUser(command) {
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        if (command === 'signup') {
            fetch('https://flor-backend.herokuapp.com/signup', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message !== "User already exists") {
                        return Actions.camera()
                    }
                    return (
                        this.setState({ alertMessage: 'User already exists' }),
                        this.showAlert()
                    )
                })
        } else {
            fetch('https://flor-backend.herokuapp.com/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Authenticated') {
                        return Actions.camera();
                    }
                    return (
                        this.setState({ alertMessage: 'Username/password was incorrect' }),
                        this.showAlert()
                    )
                })
        }

    }

    showAlert() {
        this.setState({ alert: true });
        setTimeout(function () {
            this.setState({ alert: false });
        }
            .bind(this), 3500);
    }

    formUpdate(text, name) {
        this.setState({ [name]: text })
    }

    render() {
        const { backgroundImage, logoStyle, formRow, formFill,
            buttonView, button, buttonText, alertContainer,
            alertContainerTrue, alertText } = styles;
        return (
            <ImageBackground source={BGImage} style={backgroundImage}>
                <Image style={logoStyle} source={logo} />
                <View style={formRow}>
                    <TextInput
                        style={formFill}
                        placeholder='Username/Email'
                        autoCapitalize='none'
                        onChangeText={(text) => this.formUpdate(text, 'username')}
                    ></TextInput>
                    <Icon name='user' type='font-awesome' color='#d3d3d3' />
                </View>
                <View style={formRow}>
                    <TextInput
                        style={formFill}
                        placeholder='Password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={(text) => this.formUpdate(text, 'password')}
                    />
                    <Icon name='unlock' type='font-awesome' color='#d3d3d3' />
                </View>
                <View style={buttonView}>
                    <TouchableOpacity style={button} onPress={() => this.fetchUser('login')}>
                        <Text style={buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button} onPress={() => this.fetchUser('signup')}>
                        <Text style={buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={this.state.alert ? alertContainerTrue : alertContainer}>
                    <Text style={alertText}>
                        {this.state.alert ? this.state.alertMessage : ''}
                    </Text>
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: 200,
        width: 140,
        borderRadius: 10,
        marginBottom: 20,
    },
    header: {
        fontSize: 60,
        color: '#fff',
    },
    formRow: {
        width: 200,
        height: 40,
        backgroundColor: '#ecf0f1',
        marginBottom: 20,
        borderRadius: 14,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formFill: {
        width: 160,
        height: 40,
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    button: {
        backgroundColor: '#7124E2',
        width: 200,
        height: 40,
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 14,
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
    alertContainer: {
        width: '100%',
        height: 40,
        backgroundColor: 'transparent',
    },
    alertContainerTrue: {
        width: '100%',
        height: 40,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertText: {
        fontSize: 20,
        color: '#c0392b',
    }
})

export default Welcome;