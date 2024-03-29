import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class PlantarFasciaStretch extends React.Component {
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
        [sadButton('0305', '1', 1),
          neutralButton('0305', '2', 2),
          happyButton('0305', '3', 3)],
      ],
      happyPhrases: [
        'This is an easy activity to repeat often throughout the day, even while sitting at your desk.',
        'If you feel comfortable performing all of your homecare activities, why not try the quick rating feature?'
      ],
      medPhrases: [
        'Don’t forget to warm up the affected area before stretching! See the Homecare Tracker app topics on General Information on Stretching or Hydrotherapy for more information.',
        'This is an easy activity to repeat often throughout the day, even while sitting at your desk.',
        'Aim to hold for a maximum of 30 seconds, but when initially performing this stretch shorter durations are fine.',
        'Are you having troubles performing this activity?  Try reading the General Information on Stretching and review the video a few times to ensure you are doing this stretch correctly.',
        'Remember that these homecare activities may be uncomfortable at first, but this will pass.  Try not to stretch to the point of pain, just to a point of slight tension or discomfort.'
      ],
      sadPhrases: [
        'Is this activity causing pain? Make sure you perform this stretch only to the point of slight tension or discomfort. It should not aggravate your condition.',
        'If 30 seconds is too long, hold the stretches for as long as you can and work up to 30 seconds over time.'
      ],
    }
  }


  _alertIndex(index, rating, exerciseName) {
    const {username} = this.props;
    let random = 0;
    let hello;

    if (exerciseName === 1){
      random = Math.floor(Math.random()*2);
      hello = this.state.sadPhrases[random];
    }
    else if (exerciseName === 2){
      random = Math.floor(Math.random()*5);
      hello = this.state.medPhrases[random];
    }
    else if(exerciseName === 3){
      random = Math.floor(Math.random()*2);
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
              condition: "Plantar Fasciitis",
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
          }}>Plantar Fascia Stretch
        </Text>
        <ScrollView scrollingEnabled={true}>
          <View style={{top:0, flex:1, height:875,paddingTop:20}} >
            <View style={{ height: 300 }}>
              <WebView
                maxHeight={300}
                align
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: "https://www.youtube.com/embed/gRww4UOd6u8" }}
              />
            </View>


            <Text
              style={{fontFamily: 'Noto Sans', fontSize:19, color: '#000000', paddingTop: 40, margin: 25, alignSelf:'center'}}>
              Step-by-Step Instructions
            </Text>
            <View/>
            <Text
              style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>
              •	While seated, cross the affected foot over your opposite leg.{"\n"}{"\n"}
              •	Grasp the base of your toes and pull the toes up towards your shin.{"\n"}{"\n"}
              •	You should feel a stretch in the arch of your foot.{"\n"}{"\n"}
              •	Hold for up to 30 seconds.  Repeat up to 10 times at each session.{"\n"}{"\n"}
              •	Additional Tip:{"\n"}{"\n"}
              •	This is an easy activity to repeat often throughout the day.{"\n"}{"\n"}

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

export default connect(mapStateToProps, undefined)(PlantarFasciaStretch);
