import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const Wildflower = ({ flower, family, imageUrl, description }) => {
    const { container, imageStyle, info, header, familyStyle, descriptionStyle } = styles;

    return (
        <View style={container}>
            {/* <View style=> */}
            <Image source={{ uri: imageUrl }} style={imageStyle} />
            {/* </View> */}
            <View style={info}>
                <Text style={header}>{flower}</Text>
                <Text style={familyStyle}>{family}</Text>
                <View>
                    <Text style={descriptionStyle}>{description}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    imageStyle: {
        width: '100%',
        height: '50%',
    },
    info: {
        flex: 1,
        height: '50%',
        width: '100%',
        padding: 12,
    },
    header: {
        width: '100%',
        fontSize: 40,
    },
    familyStyle: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    descriptionStyle: {
        marginTop: 10,
    }
}

export default Wildflower;