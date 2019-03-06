import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class PendulumSwing extends React.Component {
  constructor(props) {
    super(props);
    const sadButton = (value, rating, exerciseName, username) => (
        <TouchableOpacity onPress={() => this._alertIndex(value, rating, exerciseName, username)}>
          <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>
        </TouchableOpacity>
    );
    const neutralButton = (value, rating, exerciseName, username) => (
        <TouchableOpacity onPress={() => this._alertIndex(value, rating, exerciseName, username)}>
          <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>
        </TouchableOpacity>
    );
    const happyButton = (value, rating, exerciseName, username) => (
        <TouchableOpacity onPress={() => this._alertIndex(value, rating,exerciseName, username)}>
          <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>
        </TouchableOpacity>
    );

    this.state = {
      tableHead: ['Pain', 'Some Difficulties', 'No Problems!'],
      tableData: [
        [sadButton('0104', '1', 1),
          neutralButton('0104', '2', 2),
          happyButton('0104', '3', 3)],
      ],
      happyPhrases: [
        'This is a good stretch to begin with, but make sure you are warmed up.  See the Homecare Tracker app topics on General Information on Stretching or Hydrotherapy for more information.',
        'Hold for a maximum of 30 seconds, but when initially performing these stretches shorter durations are fine.',
        'A 1 – 2 pound weight (e.g.: can of soup) can be added as a progression for this exercise.',
        'If you feel comfortable performing all of your homecare activities, why not try the quick rating feature?'
      ],
      medPhrases: [
        'Don’t forget to warm up the affected area before stretching! See the Homecare Tracker app topics on General Information on Stretching or Hydrotherapy for more information.',
        'This activity is especially helpful when your shoulder pain level is high, but make sure your gentle motions do not cause a higher degree of pain.',
        'This is a good activity to start with, but make sure your shoulder is warmed up first.',
        'During initial stages, perform this stretch slowly.  This activity should not cause pain, so stop if pain is experienced.',
        'Try to hold this stretch for 30 seconds, but when initially performing this stretch shorter durations are fine.',
        'Are you having troubles performing this activity?  Try reading the General Information on Stretching and review the video a few times to ensure you are doing this stretch correctly.',
        'Remember that these homecare activities may be uncomfortable at first, but this will pass.  Try not to stretch to the point of pain, just to a point of slight tension or discomfort.'
      ],
      sadPhrases: [
        'Is this activity causing pain? Make sure you perform this stretch only to the point of slight tension or discomfort. It should not aggravate your condition.',
        'This activity is especially helpful when your shoulder pain level is high, but make sure your gentle motions do not cause a higher degree of pain.',
        'This is a good activity to start with, but make sure your shoulder is warmed up first.',
        'Did you try warming up your shoulders first? Try applying heat for 5-10 minutes.  See Hydrotherapy information on this Homecare Tracker app for more information.',
        'If 30 seconds is too long, hold the stretches for as long as you can and work up to 30 seconds over time.'
      ],
    }
  }


  _alertIndex(index, rating, exerciseName) {
    const {username} = this.props;
    let random = 0;
    let hello;

    if (exerciseName === 1){
      random = Math.floor(Math.random()*5);
      hello = this.state.sadPhrases[random];
    }
    else if (exerciseName === 2){
      random = Math.floor(Math.random()*7);
      hello = this.state.medPhrases[random];
    }
    else if(exerciseName === 3){
      random = Math.floor(Math.random()*4);
      hello = this.state.happyPhrases[random];
    }
    if (!username) {
      Alert.alert(`${hello}`);
    } else {
      Alert.alert(`${hello}`);
    }
    this.componentDidMount(index, rating, exerciseName, username);
  }

  componentDidMount(id, rating, exerciseName, username) {
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
                rating: rating,
                nameOfEx: exerciseName
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

  render() {
    const state = this.state;
    const element = (data, index) => (
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>button</Text>
          </View>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
          <Text
              style={{
                fontFamily: 'Noto Serif',
                fontSize: 21,
                paddingTop: -30,
                marginBottom: 15,
                alignSelf: 'center',
                color:'#000000'
              }}>Pendulum Swing
          </Text>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:880,paddingTop:20}} >
              <View style={{ height: 300 }}>
                <WebView
                    maxHeight={300}
                    align
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/zV-qEOsGsEY" }}
                />
              </View>


              <Text
                  style={{fontFamily: 'Noto Sans', fontSize:19, color: '#000000', paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Step-by-Step Instructions
              </Text>
              <View/>
              <Text
                  style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>
                •	Sit sideways in a high-backed chair with a thick towel resting over the backrest.{"\n"}{"\n"}
                •	Hang the affected arm over the back of the chair for 1-3 minutes.{"\n"}{"\n"}
                •	This activity should be pain-free.{"\n"}{"\n"}
                •	Make sure the pressure from the chair is on your ribcage not your armpit.{"\n"}{"\n"}
                •	A 1 – 2 pound weight, such as a can of soup, can be added as a progression for this exercise.{"\n"}{"\n"}
              </Text>
            </View>
              <Table borderStyle={{borderColor: '#f6f7ff'}}>
                  <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                  {
                      state.tableData.map((rowData, index) => (
                          <TouchableOpacity onPress={() => this._alertIndex(index)}>
                              <TableWrapper borderStyle={{borderColor: '#F6F7FF'}} key={index} style={styles.row}>
                                  {
                                      rowData.map((cellData, cellIndex) => (
                                          <Cell key={cellIndex}
                                                data={cellIndex === 5 ? element(cellData, index) : cellData}
                                                textStyle={styles.text}/>
                                      ))
                                  }
                              </TableWrapper>
                          </TouchableOpacity>
                      ))
                  }
              </Table>


          </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 10,},
  head: {height: 37, backgroundColor: '#000'},
    text: {fontFamily: 'Noto Sans', margin: 6, textAlign: 'center', fontSize: 12, fontWeight: '500', color: '#F6F7FF'},
  row: {textAlign: 'center', flexDirection: 'row',},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB'},
  btnText: {textAlign: 'center', color: '#000', fontSize: 13, fontWeight: 100}
});

export const mapStateToProps = (state) => {
  const currentUser = getUser(state);
  const username = _.get(currentUser, 'profile.nick', false);
  return {
    username: username,
  };
};

export default connect(mapStateToProps, undefined)(PendulumSwing);
