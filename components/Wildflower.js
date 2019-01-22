import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const Wildflower = ({ flower, family, imageUrl, description }) => {
    return (
        <View>
            <View>
                <Image source={{ uri: imageUrl }} />
            </View>
            <View>
                <Text>{flower}</Text>
                <Text>{family}</Text>
            </View>
            <View>
                <Text>{description}</Text>
            </View>
        </View>
    )
}

export default Wildflower;