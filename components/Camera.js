import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
//import camera and permissions from expo
import { Camera, Permissions } from 'expo';

class CameraComponent extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { container, cameraStyle, cameraBottom, cameraTrigger, button, takePictureContainer, buttonContainer } = styles;
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={container}>
                    {/* <View style={cameraStyle}> */}
                    <Camera style={cameraStyle} type={this.state.type}>

                    </Camera>
                    {/* // </View> */}
                    <View style={cameraBottom}>
                        {/* <View style={cameraTrigger}>
                            <TouchableOpacity style={button} />
                        </View> */}
                        <View style={buttonContainer}>
                            <Button title="Add from photos" color="white" onPress={() => Actions.library()} />
                            <Button title="View Library" color="white" onPress={() => Actions.library()} />
                        </View>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        borderColor: '#5758BB',
        borderWidth: 10,
        height: '100%',
        width: '100%',
    },
    cameraStyle: {
        flex: 1,
        height: 400,
        width: '100%',
        backgroundColor: '#fff',
    },
    cameraBottom: {
        height: 200,
        width: '100%',
        backgroundColor: '#5758BB',
    },
    button: {
        color: 'white',
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: 10
    },
    buttonContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    cameraButton: {
        height: 50,
        width: '100%',
    }
})

export default CameraComponent;