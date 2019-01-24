import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ListItem from './ListItem';

class Library extends Component {
    //fetch request
    constructor(props) {
        super(props);
        this.state = {
            flowers: '',
        }
    }

    async componentDidMount() {
        const response = await fetch('https://flor-backend.herokuapp.com/')
        const json = await response.json();
        console.log(json)
        this.setState({ flowers: json })
        console.log(this.state.flowers);
    }

    renderUsersFlowers() {
        if (this.state.flowers) {
            return this.state.flowers.map(flower => {
                return <ListItem key={flower.id} name={flower.name} imageUrl={flower.image} family={flower.family} description={flower.description}></ListItem>
            })
        }
    }

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                {this.renderUsersFlowers()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#706fd3',
    }
})

export default Library;