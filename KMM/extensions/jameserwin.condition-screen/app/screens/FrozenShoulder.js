import React, {
    Component
} from 'react';


import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    ScrollView
} from 'react-native';

export default class FrozenShoulder extends Component {
    render() {
        return (
           <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={{top:0, flex:1, height:500,paddingTop:20}} >
                <WebView
                    
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/OFbAaPjilTQ" }}

                />
              
                 <View style={{height:300}}>
               
                  <Text
         style={{fontFamily: "Calibri", fontSize:23, paddingTop: 40, margin: 25, alignSelf:'center'}}>
        Frozen Shoulder
      </Text>
         <Text
         style={{fontFamily: "Times New Roman", fontSize:18, paddingLeft:20}}>
        1. Sitting or standing, use your good arm to lift your affected arm at the elbow and bring it up and across your body, exerting gentle pressure at the shoulder.{"\n"}{"\n"}
2. Hold for 30 seconds.{"\n"}{"\n"}
3. Repeat 3 times{"\n"}{"\n"}
As you improve, you can gradually increase the elevation of your elbow.
      </Text>
      </View>

                </View>
  </ScrollView>

    );
    }
    }
    const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      padding: 20,
      alignItems:'center',
      backgroundColor: "red",
      flex: 1
    },
    contentContainer: {
    paddingVertical: 20
  }
    });
