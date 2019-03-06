import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class GravityStretch extends React.Component {
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
        [sadButton('0102', '1', 1),
          neutralButton('0102', '2', 2),
          happyButton('0102', '3', 3)],
      ],
      happyPhrases: [
        'This activity can be performed with a heat pack on the shoulder, and the duration can be increased up to 15 minutes.',
        'In later stages of recovery a light weight can be placed in the hand to increase the stretch.',
        'If you feel comfortable performing all of your homecare activities, why not try the quick rating feature?'
      ],
      medPhrases: [
        'This activity can be performed with a heat pack on the shoulder, and the duration can be increased up to 15 minutes.',
        'Discomfort is allowable, but if pain is felt discontinue.',
        'Are you having troubles performing this activity?  Try reading the General Information on Stretching and review the video a few times to ensure you are doing this stretch correctly. ',
        'Remember that these homecare activities may be uncomfortable at first, but this will pass.  Try not to stretch to the point of pain, just to a point of slight tension or discomfort.'
      ],
      sadPhrases: [
        'This activity can be performed with a heat pack on the shoulder, and the duration can be increased up to 15 minutes.',
        'Discomfort is allowable, but if pain is felt discontinue.',
        'Aim to hold this stretch for up to 15 minutes, but when initially performing this stretch shorter durations are recommended.'
      ],
    }
  }


  _alertIndex(index, rating, exerciseName) {
    const {username} = this.props;
    let random = 0;
    let hello;

    if (exerciseName === 1){
      random = Math.floor(Math.random()*3);
      hello = this.state.sadPhrases[random];
    }
    else if (exerciseName === 2){
      random = Math.floor(Math.random()*4);
      hello = this.state.medPhrases[random];
    }
    else if(exerciseName === 3){
      random = Math.floor(Math.random()*3);
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
              }}>Gravity Stretch
          </Text>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:1320,paddingTop:20}} >
              <View style={{ height: 300 }}>
                <WebView
                    maxHeight={300}
                    align
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/YzsaPg-d8FE" }}
                />
              </View>


              <Text
                  style={{fontFamily: 'Noto Sans', fontSize:19, color: '#000000', paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Step-by-Step Instructions
              </Text>
              <View/>
              <Text
                  style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>
                •	While standing, bend slightly forward with legs spread apart for a strong base.{"\n"}{"\n"}
                •	Lean on a chair, counter, or desk with the unaffected arm for added support.{"\n"}{"\n"}
                •	Relax your shoulders and let your affected arm dangle at your side.{"\n"}{"\n"}
                •	Initiate motion by gently swinging your arm in various directions such as side-to-side, forward and backward, and clockwise and counter clockwise circular movements.{"\n"}{"\n"}
                •	Carry out the arm swings for 30 seconds and repeat several times.{"\n"}{"\n"}
                •	Additional Tips:{"\n"}{"\n"}
                •	This activity is especially helpful when your shoulder pain level is high{"\n"}{"\n"}
                •	This activity should not cause pain, so stop if pain is experienced.{"\n"}{"\n"}
                •	A 1 – 2 pound weight (e.g.: can of soup) can be added as a progression for this exercise.{"\n"}{"\n"}

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
  head: {height: 37, backgroundColor: '#000',},
  text: {fontFamily: 'Noto Sans', margin: 6, textAlign: 'center', fontSize: 12, fontWeight: '800', color: '#F6F7FF'},
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

export default connect(mapStateToProps, undefined)(GravityStretch);
