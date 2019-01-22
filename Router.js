import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import Welcome from './components/Welcome';
import Camera from './components/Camera';
import Library from './components/Library';
import Wildflower from './components/Wildflower';
//import reactrouter flux library
//import additional components

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root">
                <Scene key="login" component={Welcome} title="Login Signup" initial />
                <Scene key="camera" component={Camera} title="Camera" />
                <Scene key="library" component={Library} title="Library" />
                <Scene key="wildflower" component={Wildflower} title="Wildflower" />
            </Stack>
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