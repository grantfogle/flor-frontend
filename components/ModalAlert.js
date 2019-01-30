import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, StyleSheet } from 'react-native';
import Wildflower from './Wildflower';
import { Icon } from 'react-native-elements';

class ModalAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modalVisible: this.props.visible,
        }
    }

    // setModalVisible(visible) {
    //     this.setState({ modalVisible: visible });
    // }

    render() {
        const { container, backButton } = styles;
        const { name, image, description, family, setModalVisible } = this.props;
        return (
            <View >
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.visible}
                    presentationStyle="formSheet"
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <Wildflower flower={name} description={description} imageUrl={image} family={family} />
                    <View>
                        <TouchableHighlight
                            onPress={() => {
                                setModalVisible(false);
                                // this.setModalVisible(!this.state.modalVisible);
                            }}
                            style={backButton}>
                            <Text>Back to Camera</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                {/* <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        height: 200,
        width: 200,
        backgroundColor: 'transparent',
        // opacity: .8,
    },
    backButton: {
        width: 200,
        height: 80,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        color: 'white'
    }
})

export default ModalAlert;