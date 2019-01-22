import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const Wildflower = ({ flower, family, imageUrl, description }) => {
    const { imageStyle, } = styles;

    return (
        <View>
            {/* <View style=> */}
            <Image source={{ uri: imageUrl }} style={imageStyle} />
            {/* </View> */}
            <Text>{flower}</Text>
            <Text>{family}</Text>
            <View>
                <Text>{description}</Text>
            </View>
        </View>
    )
}

const styles = {
    imageStyle: {
        width: '100%',
        height: '40%',
    }
}

export default Wildflower;