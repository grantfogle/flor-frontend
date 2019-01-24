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

    //need to figure out how to store a photo when taken and then send it off to the 
    //my machine learning app
    async snap() {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ base64: true });
            console.log('cats');
            console.log(photo)
            //send to machine learning app
            //photo is an object that includes size and uri (location of image)
        }
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
                    <Camera
                        style={cameraStyle}
                        type={this.state.type}
                        ref={ref => { this.camera = ref; }}
                    >
                        <View style={cameraTrigger}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    {/* // </View> */}
                    <View style={cameraBottom}>
                        {/* <View style={cameraTrigger}>
                            <TouchableOpacity style={button} />
                        </View> */}
                        <View style={takePictureContainer}>
                            <TouchableOpacity style={button} onPress={() => this.snap()} />
                        </View>
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
        // borderColor: '#5758BB',
        height: '100%',
        width: '100%',
    },
    cameraStyle: {
        flex: 1,
        height: '80%',
        width: '100%',
        backgroundColor: '#fff',
    },
    cameraTrigger: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    cameraButton: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    cameraBottom: {
        height: '20%',
        width: '100%',
        backgroundColor: '#227093',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#ccae62',
        height: 50,
        width: 50,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 50,
        marginTop: 10
    },
    takePictureContainer: {
        height: 50,
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default CameraComponent;