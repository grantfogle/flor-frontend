import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderUsersFlowers() {
        return this.props.flowers.map(flower => {
            return <ListItem key={flower.id} name={flower.name} imageUrl={flower.image} family={flower.family} description={flower.description}></ListItem>
        })
    }

    render() {
        const { container } = styles;
        return (
            <ScrollView style={container}>
                {this.renderUsersFlowers()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#9b59b6',
    }
})

function mapStateToProps(state) {
    return {
        flowers: state.flowers
    }
}

export default connect(mapStateToProps)(Library);