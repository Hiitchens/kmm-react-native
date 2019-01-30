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
export default class Gravity extends Component {

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

          <View style={styles.navbar}><Text style={styles.navbarTitle}>Gravity Stretch</Text></View>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:800,paddingTop:20}} >
              <View style={{ height: 200 }}>
                <WebView
                    maxHeight={200}
                    align
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/tj5eRa0CUME" }}

                />
              </View>


              <Text
                  style={{fontFamily: "Calibri", fontSize:23, paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Frozen Shoulder
              </Text>
              <Text
                  style={{fontFamily: "Times New Roman", fontSize:18, paddingLeft:20, paddingRight:20}}>

                • Stand upright and hold the towel or wand in both hands, palms facing down.
                Stretch your arms by lifting them over your head, or as high as you can without pain
                Keep your elbows straight.
                Hold for 5 seconds and return to the starting position.
                Repeat 10 times




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
