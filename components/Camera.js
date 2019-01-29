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
                return response.json();
            })
            .then(response => {
                console.log(response.records[0].best_label.name)
            });
    }
    async snap() {
        if (this.camera) {
            await this.camera.takePictureAsync({ quality: .1, base64: true })
                .then(photo => {
                    console.log('cats')
                    this.identifyWildflower(photo.base64);
                })
        }
    }

    render() {
        const { container, cameraStyle, cameraBottom, button, takePictureContainer } = styles;
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        } else {
            return (
                <View style={container}>
                    <Camera
                        style={cameraStyle}
                        type={this.state.type}
                        ref={ref => { this.camera = ref; }}
                    >
                    </Camera>
                    <View style={cameraBottom}>
                        <View style={takePictureContainer}>
                            <TouchableOpacity style={button} onPress={() => this.snap()} />
                        </View>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
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
        backgroundColor: '#2980b9',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#34495e',
        height: 80,
        width: 80,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 50,
    },
    takePictureContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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