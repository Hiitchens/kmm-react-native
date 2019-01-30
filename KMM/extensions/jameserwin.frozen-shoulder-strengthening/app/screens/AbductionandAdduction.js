//  include react-native-swipeout
import Swipeout from 'react-native-swipeout';
import Emoji from 'react-native-emoji';
//  example row data (see for json structure)
import rows from './data';
//  example styles
import styles from './styles';

import React, {Component} from 'react';
import {Alert,Platform,TouchableOpacity, AppRegistry, WebView, StyleSheet, ScrollView, ListView, Text, View, TouchableWithoutFeedback} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';
//  example swipout app
export class AbductionandAdduction extends Component {

    constructor(props) {
        super(props);
        const sadButton = (value, rating, username) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating, username)}>
                <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const neutralButton = (value, rating, username) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating, username)}>
                <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const happyButton = (value, rating, username) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating, username)}>
                <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );

        this.state = {
            tableHead: ['Exercise', 'Pain', 'Some Difficulties', 'No Problems!'],
            tableData: [
                ['Cross Body Reach', sadButton('0101', '1'),
                    neutralButton('0101', '2'),
                    happyButton('0101', '3')],
                ['Pendulum Swing', sadButton('0102', '1'),
                    neutralButton('0102', '2'),
                    happyButton('0102', '3')
                ],
                ['Hanging Arm Chair Stretch', sadButton('0103', '1'),
                    neutralButton('0103', '2'),
                    happyButton('0103', '3')],
                ['Gravity Stretch for the Shoulder', sadButton('0104', '1'),
                    neutralButton('0104', '2'),
                    happyButton('0104', '3')],
                ['Wall Walk', sadButton('0105', '1'),
                    neutralButton('0105', '2'),
                    happyButton('0105', '3')],
                ['Flexion Exercise', sadButton('0106', '1'),
                    neutralButton('0106', '2'),
                    happyButton('0106', '3')],
                ['Extension Exercise', sadButton('0107', '1'),
                    neutralButton('0107', '2'),
                    happyButton('0107', '3')],
                ['Abduction and Adduction Exercise', sadButton('0108', '1'),
                    neutralButton('0108', '2'),
                    happyButton('0108', '3')],
            ],
            dataSource: this.state.tableData,
            sectionID: null,
            rowID: null,
        }
        // var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});


    }



    _alertIndex(index, rating) {
        const {username} = this.props;

        if (!username) {
            Alert.alert(`You have successfully rated exercise ${index} as a ${rating}`);
        } else {
            Alert.alert(`${username} successfully rated exercise ${index} as a ${rating}`);
        }
        this.componentDidMount(index, rating, username);
    }

    componentDidMount(id, rating, username) {
        return fetch('http://45.33.42.72:1234/exerciseRating',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: username,
                    exercises: [
                        {
                            name: id,
                            condition: "Frozen Shoulder",
                            rating: rating
                        }
                    ]
                }),
            })

            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    //  datasource rerendered when change is made (used to set swipeout to active)


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

          <View style={styles.navbar}><Text style={styles.navbarTitle}>Abduction and Adduction Exercise</Text></View>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:800,paddingTop:20}} >
              <View style={{ height: 200 }}>
                <WebView
                    maxHeight={200}
                    align
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/H2VcGtsnarM" }}

                />
              </View>


              <Text
                  style={{fontFamily: "Calibri", fontSize:19, paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Step-by-Step Instructions
              </Text>
              <Text
                  style={{fontFamily: "Times New Roman", fontSize:18, paddingLeft:20, paddingRight:20}}>

                • Stand upright and hold the towel or wand in both hands, palms facing down.
                • Stretch your arms by lifting them over your head, or as high as you can without pain
                • Keep your elbows straight.
                • Hold for 5 seconds and return to the starting position.
                • Repeat 10 times




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
export const mapStateToProps = (state) => {
    const currentUser = getUser(state);
    const username = _.get(currentUser, 'profile.nick', false);

    return {
        username: username,
    };
};

export default connect(mapStateToProps, undefined)(AbductionandAdduction);
