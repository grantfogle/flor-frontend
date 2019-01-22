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
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(proxy + 'https://flor-backend.herokuapp.com/')
        const json = await response.json();
        this.setState({ flowers: json })
        console.log(this.state.flowers);
    }

    renderUsersFlowers() {
        if (this.state.flowers) {
            return this.state.flowers.map(flower => {
                return <ListItem name={flower.name} imageUrl={flower.image} family={flower.family} description={flower.description}></ListItem>
            })
        }
    }

    render() {
        return (
            <View>
                {this.renderUsersFlowers()}
            </View>
        );
    }
}

export default Library;