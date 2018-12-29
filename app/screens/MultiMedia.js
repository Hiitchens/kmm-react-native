import React, {
    Component
} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

export default class MultiMedia extends Component {
    render() {
        return (
            <View style={{height:300, width:200}} >
        <WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: "https://www.youtube.com/embed/0iayQ1xPsnc" }}

        />
                <View/>

	
<View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
      </View>
        <Text style={{fontWeight: 'bold'}}>
            I am bold
            <Text style={{color: 'red'}}>
                and red
            </Text>
        </Text>
    </View>

    );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

