import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class AbductionAdduction extends React.Component {
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
        [sadButton('0108', '1', 1),
          neutralButton('0108', '2', 2),
          happyButton('0108', '3', 3)],
      ],
      happyPhrases: [
        'Maintain a straight back with shoulders down while performing this activity. Ensure your elbows are as straight as possible.',
        'If you feel comfortable performing all of your homecare activities, why not try the quick rating feature?'
      ],
      medPhrases: [
        'Don’t forget to warm up the affected area with stretches before attempting this strengthening activity! ',
        'Maintain a straight back with shoulders down while performing this activity. Ensure your elbows are as straight as possible.',
        'Discomfort is allowable, but only lift your affected arm to the side as far as you can without pain.',
        'Are you having troubles performing this activity?  Try reading the General Information on Stretching and review the video a few times to ensure you are doing this activity correctly. ',
        'Aim to hold for 5 seconds, but when initially performing this activity shorter durations are fine.'
      ],
      sadPhrases: [
        'Discomfort is allowable, but only lift your affected arm to the side as far as you can without pain.',
        'Don’t forget to warm up the affected area with stretches before attempting this strengthening activity! ',
        'Aim to hold for 5 seconds, but when initially performing this activity shorter durations are fine.'
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
          }}>Abduction and Adduction
        </Text>
        <ScrollView scrollingEnabled={true}>


          <View style={{top:0, flex:1, height:800,paddingTop:20}} >
            <View style={{ height: 300 }}>
              <WebView
                maxHeight={300}
                align
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: "https://www.youtube.com/embed/WhoYVgobW2I" }}
              />
            </View>



            <View/>
            <Text
              style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>
              •	Stand upright and hold a wand with both hands, palms down.{"\n"}{"\n"}
              •	Rest the wand against the front of your thighs.{"\n"}{"\n"}
              •	While keeping your elbows straight, use your good arm to push your injured arm out to the side and up as high as possible.{"\n"}{"\n"}
              •	Hold for 5 seconds.{"\n"}{"\n"}
              •	Repeat up to 10 times{"\n"}{"\n"}
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
  text: {fontFamily: 'Noto Sans', margin: 6, textAlign: 'center', fontSize: 13, fontWeight: 200, color: '#ffffff'},
  row: {textAlign: 'center', flexDirection: 'row',},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB'},
  btnText: {textAlign: 'center', color: '#000', fontSize: 13, fontWeight: 100}}
  );

export const mapStateToProps = (state) => {
  const currentUser = getUser(state);
  const username = _.get(currentUser, 'profile.nick', false);
  return {
    username: username,
  };
};

export default connect(mapStateToProps, undefined)(AbductionAdduction);