import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Camera, Permissions } from 'expo';
import { Icon } from 'react-native-elements';
const config = require('../config');

class CameraComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    mapthroughWildflowers(result) {
        const filteredFlower = this.props.flowers.filter(flower => flower.name === result)[0];
        return Actions.wildflower({ title: filteredFlower.name, flower: filteredFlower.name, imageUrl: filteredFlower.image, family: filteredFlower.family, description: filteredFlower.description });
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
                this.mapthroughWildflowers(response.records[0].best_label.name)
            });
    }

    async snap() {
        if (this.camera) {
            await this.camera.takePictureAsync({ quality: .1, base64: true })
                .then(photo => {
                    this.identifyWildflower(photo.base64);
                })
        }
    }

    async setModalVisible(status) {
        let newStatus = status;
        this.setState({ visible: newStatus })
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
                    />
                    <View style={cameraBottom}>
                        <View style={takePictureContainer}>
                            <TouchableOpacity style={button} onPress={() => this.snap()}>
                                <Icon name='camera' type='font-awesome' color='#fff' size={40} />
                            </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: '#9b59b6',
        justifyContent: 'center',
        borderTopWidth: 4,
        borderTopColor: 'black',
    },
    button: {
        backgroundColor: '#34495e',
        height: 80,
        width: 80,
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
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

function mapStateToProps(state) {
    return {
        flowers: state.flowers
    }
}

export default connect(mapStateToProps)(CameraComponent);