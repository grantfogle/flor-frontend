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
            alert: '',
        }
    }
    // async fetchUser(type) {
    //     //on button click, trigger a sign up or submit
    //     let obj = {
    //         username: this.state.username,
    //         password: this.state.password
    //     }

    //     if (type = "signup") {
    //         fetch('heroku.com/signup', {
    //             method: 'POST',
    //             body: JSON.stringify(obj),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             }
    //         })
    //             .then(response => {
    //                 if (response === 'false') {
    //                     this.setState({})
    //                 }
    //             });
    //     }
    //     //login
    // }

    formUpdate(text, name) {
        this.setState({ [name]: text })
        console.log(this.state)
    }

    render() {
        const { backgroundImage, logoStyle, formRow, formFill, buttonView, button, buttonText } = styles;
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
                    <TouchableOpacity style={button} onPress={() => Actions.camera()}>
                        <Text style={buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button}>
                        <Text style={buttonText}>Sign Up</Text>
                    </TouchableOpacity>
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
        marginTop: -80,
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
    buttonView: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#7124E2',
        width: 80,
        height: 40,
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 14,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    }
})

export default Welcome;