import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Welcome from './components/Welcome';
import Camera from './components/Camera';
//import reactrouter flux library
//import additional components

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="login" component={Welcome} title="Login Signup" initial />
                <Scene key="camera" component={Camera} title="Camera" />
            </Scene>
        </Router>
    )
}

const styles = {
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
};

export default RouterComponent;