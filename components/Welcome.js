import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import BGImage from '../images/WelcomeBackground.jpg';

class Welcome extends Component {
    render() {
        const { backgroundImage, header, emailFill, buttonView, button, buttonText } = styles;
        return (
            // <View style={}>
            <ImageBackground source={BGImage} style={backgroundImage}>
                <Text style={header}>Flor</Text>
                <TextInput style={emailFill} placeholder="Username/Email">
                </TextInput>
                <TextInput style={emailFill} placeholder="Password">
                </TextInput>
                <View style={buttonView}>
                    <TouchableOpacity style={button}>
                        <Text style={buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button}>
                        <Text style={buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            // </View>
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
    header: {
        fontSize: 60,
        color: '#fff',
    },
    emailFill: {
        width: 200,
        height: 40,
        backgroundColor: '#ecf0f1',
        marginBottom: 10,
    },
    buttonView: {
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#9980FA',
        width: 100,
        height: 40,
        marginRight: 10,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    }
})
export default Welcome