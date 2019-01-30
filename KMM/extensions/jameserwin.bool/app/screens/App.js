//  include react-native-swipeout
import Swipeout from 'react-native-swipeout';
import Emoji from 'react-native-emoji';
//  example row data (see for json structure)
import rows from './data';
//  example styles
import styles from './styles';

import React, {Component} from 'react';
import {Platform, AppRegistry, WebView, StyleSheet, ScrollView, ListView, Text, View, TouchableWithoutFeedback} from 'react-native';

//  example swipout app
export default class App extends Component {

  constructor() {
    super();

    //  datasource rerendered when change is made (used to set swipeout to active)
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

    this.state = {
      dataSource: ds.cloneWithRows(rows),
      sectionID: null,
      rowID: null,
    };
  }
  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
        <Swipeout
            close={!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
            left={rowData.left}
            right={rowData.right}
            rowID={rowID}
            sectionID={sectionID}
            autoClose={rowData.autoClose}
            backgroundColor={rowData.backgroundColor}
            onOpen={(sectionID, rowID) => {
              this.setState({
                sectionID,
                rowID,
              })
            }}
            onClose={() => console.log('===close') }
            scroll={event => console.log('scroll event') }
        >
          <TouchableWithoutFeedback onPress={() => console.log('press children')}>
            <View style={styles.li} >
              <Text style={styles.liText}>{rowData.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Swipeout>
    );
  }
  render() {
    return (
        <View style={styles.container}>

          <View style={styles.navbar}><Text style={styles.navbarTitle}>Wall Walk</Text></View>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:800,paddingTop:20}} >
              <WebView
                  align
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{ uri: "https://www.youtube.com/embed/OFbAaPjilTQ" }}

              />



              <Text
                  style={{fontFamily: "Calibri", fontSize:23, paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Frozen Shoulder
              </Text>
              <Text
                  style={{fontFamily: "Times New Roman", fontSize:18, paddingLeft:20, paddingRight:20}}>
                • Sitting or standing, use your good arm to lift your affected arm at the elbow and bring it up and across your body, exerting gentle pressure at the shoulder.{"\n"}{"\n"}
                •  Hold for 30 seconds.{"\n"}{"\n"}
                • Repeat 3 times{"\n"}{"\n"}
                As you improve, you can gradually increase the elevation of your elbow.{"\n"}{"\n"}{"\n"}
              </Text>
            </View>
          </ScrollView>


          <ListView

              dataSource={this.state.dataSource}
              renderRow={this._renderRow.bind(this)}
              style={styles.listview}
          />
        </View>









    );
  }
}
