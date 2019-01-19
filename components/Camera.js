import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Camera extends Component {
    render() {
        const { border, cameraBottom } = styles;
        return (
            <View >
                <Text>Party Boy</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    border: {
        borderColor: '#5758BB',
        borderWidth: 10,
    }
})

export default Camera;