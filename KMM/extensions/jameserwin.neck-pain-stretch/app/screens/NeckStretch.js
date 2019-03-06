import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class NeckStretch extends React.Component {
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
        [sadButton('0201', '1', 1),
          neutralButton('0201', '2', 2),
          happyButton('0201', '3', 3)],
      ],
      happyPhrases: ['This is a good stretch to start with, but make sure your neck is warmed up first.  See the Homecare Tracker app topics on General Information on Stretching or Hydrotherapy for more information.',
        'Ensure that you keep your shoulders down.  Grasping the seat of a chair helps with this.',
        'By doing this stretch on each side looking forward, upwards, then downwards, you are stretching a number of muscles that contribute to tension headaches.',
        'Make sure you breathe slowly while performing these stretches.', 'Hold for a maximum of 30 seconds, but when initially performing these stretches shorter durations are fine.',
        'If you feel comfortable performing all of your homecare activities, why not try the quick rating feature?',
        'Hold for a maximum of 30 seconds, but when initially performing these stretches shorter durations are fine.'],
      medPhrases: ['Are you having troubles performing this activity?  Try reading the General Information on Stretching and review the video a few times to ensure you are doing this stretch correctly.',
      'Don’t forget to warm up the affected area before stretching! See the Homecare Tracker app topics on General Information on Stretching or Hydrotherapy for more information.',
      'Remember that these homecare activities may be uncomfortable at first, but this will pass.  Try not to stretch to the point of pain, just to a point of slight tension or discomfort.',
      'Stretch only to the point of slight tension and hold. You shouldn’t feel a sharp pain. If this occurs, stop your stretch and hold at the point of tension.  Then, attempt to stretch slightly farther the next time.',
      'Try to modify daily activities that aggravate your condition.  Talk to your therapist about alternative activities that may be easier for you. There is always a way!'],
      sadPhrases: ['Did you try warming up your neck and shoulders first? Try applying heat for 5-10 minutes.  See Hydrotherapy information on this Homecare Tracker app for more information.',
      'Is this activity causing pain? Make sure you perform this stretch only to the point of slight tension or discomfort. It should not aggravate your condition.',
        'If 30 seconds is too long, hold the stretches for as long as you can and work up to 30 seconds over time.',
        'Talk to your therapist at your next appointment about modifying this stretch if you cannot perform it without pain.',
        'Try to modify daily activities that aggravate your condition.  Talk to your therapist about alternative activities that may be easier for you. There is always a way!',
        'Take a break between activities if you begin to feel pain as you work through them. Slow and steady is the road to healing.'
      ]
    }
  }


  _alertIndex(index, rating, exerciseName) {
    const {username} = this.props;
    let random = 0;
    let hello;

    if (exerciseName === 1){
      random = Math.floor(Math.random()*6);
      hello = this.state.sadPhrases[random];
    }
    else if (exerciseName === 2){
      random = Math.floor(Math.random()*5);
      hello = this.state.medPhrases[random];
    }
    else if(exerciseName === 3){
      random = Math.floor(Math.random()*6);
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
                condition: "Neck Pain",
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
              }}>Neck Stretch
          </Text>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:1030,paddingTop:20}} >
              <View style={{ height: 300 }}>
                <WebView
                    maxHeight={300}
                    align
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/OzQFRnrA97k" }}
                />
              </View>

              <Text
                  style={{fontFamily: 'Noto Sans', fontSize:19, color: '#000000', paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Step-by-Step Instructions
              </Text>
              <View/>
              <Text
                  style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>
                  •	While seated, grasp the seat of the chair with one hand.{"\n"}{"\n"}
                  •	Tilt your head slowly to the opposite shoulder while facing forward{"\n"}{"\n"}
                  •	Be sure to keep shoulders fixed, and do not lean your body to the side.{"\n"}{"\n"}
                  •	Hold stretch for up to 30 seconds.{"\n"}{"\n"}
                  •	Perform this same stretch while looking downward, and then looking up.{"\n"}{"\n"}
                  •	Repeat each of these stretches 3 times.{"\n"}{"\n"}
                  •	Once finished on one side of the neck repeat the entire procedure on the opposite side.{"\n"}{"\n"}

                  
              </Text>
            </View>

            <Table borderStyle={{borderColor: '#000000'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              {
                state.tableData.map((rowData, index) => (
                    <TouchableOpacity onPress={() => this._alertIndex(index)}>
                      <TableWrapper borderStyle={{borderColor: '#000000'}} key={index} style={styles.row}>
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
    text: {fontFamily: 'Noto Sans', margin: 6, textAlign: 'center', fontSize: 13, fontWeight: 200, color: '#ffffff'},
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

export default connect(mapStateToProps, undefined)(NeckStretch);
