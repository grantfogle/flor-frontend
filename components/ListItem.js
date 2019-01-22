import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const ListItem = ({ name, imageUrl, family, description }) => {
    //might add an image small
    const { container, title, imageStyle, button } = styles;
    return (
        <View style={container}>
            <Image source={{ uri: imageUrl }} style={imageStyle} />
            <Text style={title}>{name}</Text>
            {/* Arrow tag */}
            <TouchableOpacity style={button} onPress={() => Actions.wildflower({ flower: name, imageUrl, family, description })}></TouchableOpacity>
        </View>
    )
}

const styles = {
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: 80,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    imageStyle: {
        height: 40,
        width: 40,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 30,
    },
    button: {
        backgroundColor: 'black',
        height: 40,
        width: 40,
        borderRadius: 50,
    }
}

export default ListItem;
