import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class RowingEx extends React.Component {
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
                [sadButton('0206', '1', 1),
                    neutralButton('0206', '2', 2),
                    happyButton('0206', '3', 3)],
            ],
          happyPhrases: ['If you sit for long periods of time, try performing this activity while standing or sitting several times per hour.  Setting an alarm can help.',
          'A 1 – 2 pound weight (e.g.: can of soup) can be added as a progression for this exercise.',
          'If you sit for long periods of time, try performing this activity while standing or sitting several times per hour.  Setting an alarm can help.',
          'If you feel comfortable performing all of your homecare activities, why not try the quick rating feature?'
          ],
          medPhrases: ['Don’t forget to stretch before performing this activity. ',
          'Make sure your movements are slow and even so as not to cause any pain.',
          'Ensure you do not stretch to the point of pain.',
          'If you cannot clasp your hands, try using a small towel or cloth.',
          'If 30 seconds is too long go hold this stretch, try to perform several 5 second long stretches instead. ',
          'Take a deep breath while doing this activity in order to enhance the stretch in the chest.',
          'Are you having troubles performing this activity?  Try reading the General Information on Strengthening and review the video a few times to ensure you are doing this activity correctly. '
          ],
          sadPhrases: ['Don’t forget to stretch before performing this activity. ',
          'If 30 seconds is too long go hold this stretch, try to perform several 5 second long stretches instead. ',
          'Is this activity causing pain? Make sure you perform this activity only to the point of slight tension or discomfort. It should not aggravate your condition. ',
          'Try to modify daily activities that aggravate your condition.  Talk to your therapist about alternative activities that may be easier for you. ',
          'Take a break between activities if you begin to feel pain as you work through them. Slow and steady is the road to healing.']
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
                    }}>Rowing Exercise
                </Text>
                <ScrollView scrollingEnabled={true}>
                    <View style={{top:0, flex:1, height:1190,paddingTop:20}} >
                        <View style={{ height: 300 }}>
                            <WebView
                                maxHeight={300}
                                align
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: "https://www.youtube.com/embed/fKQTcF5Dt0I" }}
                            />
                        </View>

                        <Text
                            style={{fontFamily: 'Noto Sans', fontSize:19, color: '#000000', paddingTop: 40, margin: 25, alignSelf:'center'}}>
                            Step-by-Step Instructions
                        </Text>
                        <View/>
                        <Text
                            style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>
                            •	While standing, grasp your hands behind your back and press the palms together.{"\n"}{"\n"}
                            •	Squeeze your shoulder blades and push your clasped hands down towards the ground.{"\n"}{"\n"}
                            •	Try not to shrug your shoulders.{"\n"}{"\n"}
                            •	This activity will strengthen muscles along the spine while allowing the chest muscles to open up.{"\n"}{"\n"}
                            •	Hold for up to 30 seconds. Release.{"\n"}{"\n"}
                            •	Additional Tips:{"\n"}{"\n"}
                            •	Take a deep breath while doing this to enhance the stretch in the chest.{"\n"}{"\n"}
                            •	This is especially useful if you have been sitting at a computer for a while.  In this case try to do this stretch several times per hour while standing or sitting.{"\n"}{"\n"}
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
  btnText: {textAlign: 'center', color: '#000', fontSize: 13, fontWeight: 100}
});

export const mapStateToProps = (state) => {
    const currentUser = getUser(state);
    const username = _.get(currentUser, 'profile.nick', false);
    return {
        username: username,
    };
};

export default connect(mapStateToProps, undefined)(RowingEx);
