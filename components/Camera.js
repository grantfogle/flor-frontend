import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
//import camera and permissions from expo
import { Camera, Permissions } from 'expo';
const config = require('../config');

class CameraComponent extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    async identifyWildflower(photo) {
        console.log('dogs');
        let obj = {
            "task_id": config.id,
            "records": [{ "_base64": photo }]
        }

        fetch('https://api.ximilar.com/recognition/v2/classify', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Token ${config.token}`
            }
        })
            .then(response => {
                // console.log('rhinos');
                return response.json();
                // console.log(parsedResponse);
                // console.log(JSON.parse(response));
            })
            .then(response => {
                console.log(response.records[0].best_label.name)
            });
    }
    //need to figure out how to store a photo when taken and then send it off to the 
    //my machine learning app
    async snap() {
        if (this.camera) {
            await this.camera.takePictureAsync({ quality: .1, base64: true })
                .then(photo => {
                    console.log('cats')
                    this.identifyWildflower(photo.base64);
                })
            // console.log(photo);

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
        height: 80,
        width: 80,
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
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
})

export default CameraComponent;