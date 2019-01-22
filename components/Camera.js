import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Camera extends Component {
    render() {
        const { container, camera, cameraBottom, button, takePictureContainer, buttonContainer } = styles;
        return (
            <View style={container}>
                <View style={camera}></View>
                <View style={cameraBottom}>
                    <TouchableOpacity style={button} />
                    <View style={buttonContainer}>
                        <Button title="Add from photos" onPress={() => Actions.library()} />
                        <Button title="View Library" onPress={() => Actions.library()} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#5758BB',
        borderWidth: 10,
        height: '100%',
        width: '100%',
    },
    camera: {
        // flex: 1,
        height: 400,
        width: 300,
        backgroundColor: '#fff',
    },
    cameraBottom: {
        height: 200,
        width: '100%',
        backgroundColor: '#5758BB',
    },
    button: {
        color: 'black',
        height: 40,
        width: 40,
        borderRadius: 50,
        marginTop: 10
    },
    buttonContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    }
})

export default Camera;