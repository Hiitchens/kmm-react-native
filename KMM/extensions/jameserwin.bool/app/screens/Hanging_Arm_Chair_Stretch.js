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
export default class Hanging_Arm_Chair_Stretch extends Component {

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

          <View style={styles.navbar}><Text style={styles.navbarTitle}>Hanging Arm Chair Stretch</Text></View>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:800,paddingTop:20}} >
              <View style={{ height: 200 }}>
                <WebView
                    maxHeight={200}
                    align
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/RjIniSMj4fA" }}

                />
              </View>


              <Text
                  style={{fontFamily: "Calibri", fontSize:23, paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Frozen Shoulder
              </Text>
              <Text
                  style={{fontFamily: "Times New Roman", fontSize:18, paddingLeft:20, paddingRight:20}}>

                • Sit sideways in a high-backed chair (kitchen chair is best) with a thick towel resting over the backrest. {"\n"}{"\n"}
                • Hang affected arm over back of the chair for 1-3 minutes {"\n"}{"\n"}
                • This stretch should be pain-free. {"\n"}{"\n"}
                • Make sure the pressure from the chair is on your ribcage not your armpit. {"\n"}{"\n"}
                • A 1 – 2 pound weight, such as a can of soup, can be added as a progression for this exercise. {"\n"}{"\n"}




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
