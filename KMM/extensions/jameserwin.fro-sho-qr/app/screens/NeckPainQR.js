import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class NeckPainQR extends React.Component {
  constructor(props) {
    super(props);
    const sadButton = (value,rating, exerciseName,  username) => (
        <TouchableOpacity onPress={() => this._alertIndex(value, rating, exerciseName, username)}>
          <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>
        </TouchableOpacity>
    );
    const neutralButton = (value, rating, exerciseName, username) => (
        <TouchableOpacity onPress={() => this._alertIndex(value, rating, exerciseName, username)}>
          <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>
        </TouchableOpacity>
    );
    const happyButton = (value,  rating, exerciseName, username) => (
        <TouchableOpacity onPress={() => this._alertIndex(value, rating, exerciseName, username)}>
          <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>
        </TouchableOpacity>
    );

    this.state = {
      tableHead: ['Exercise', 'Pain', 'Some Difficulties', 'No Problems!'],
      tableData: [
        ['Stretch for Neck', sadButton('0201', '1', 'Stretch for Neck'),
          neutralButton('0201', '2', 'Stretch for Neck'),
          happyButton('0201', '3', 'Stretch for Neck')],
        ['Doorway Stretch', sadButton('0202', '1', 'Doorway Stretch'),
          neutralButton('0202', '2', 'Doorway Stretch'),
          happyButton('0202', '3', 'Doorway Stretch')
        ],
        ['Towel Roll', sadButton('0203', '1', 'Towel Roll'),
          neutralButton('0203', '2', 'Towel Roll'),
          happyButton('0203', '3', 'Towel Roll')],
        ['Forearm Rotation with Blade Squeeze', sadButton('0204', '1', 'Forearm Rotation with Blade Squeeze'),
          neutralButton('0204', '2','Forearm Rotation with Blade Squeeze'),
          happyButton('0204', '3', 'Forearm Rotation with Blade Squeeze')],
        ['Hand Clasp', sadButton('0205', '1', 'Hand Clasp'),
          neutralButton('0205', '2', 'Hand Clasp'),
          happyButton('0205', '3', 'Hand Clasp')],
        ['Rowing Exercise', sadButton('0206', '1','Rowing Exercise'),
          neutralButton('0206', '2','Rowing Exercise'),
          happyButton('0206', '3','Rowing Exercise')],

      ]
    }
  }


  _alertIndex(index, rating, exerciseName) {
    const {username} = this.props;

    /*if (!username) {
      Alert.alert(`You have successfully rated exercise ${index} as a ${rating}`);
    } else {
      Alert.alert(`${username} successfully rated exercise ${index} as a ${rating}`);
    }*/
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
                fontFamily: "Noto Serif",
                fontSize: 23,
                paddingTop: -30,
                marginBottom: 15,
                alignSelf: 'center',
                color:'#4D49D4'
              }}>Neck Pain & Headaches
          </Text>
          <ScrollView>

            <Table borderStyle={{borderColor: '#F6F7FF'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.sideline}/>
              {
                state.tableData.map((rowData, index) => (
                    <TouchableOpacity onPress={() => this._alertIndex(index)}>
                      <TableWrapper borderStyle={{borderColor: '#b6cbff'}} key={index} style={styles.row}>
                        {
                          rowData.map((cellData, cellIndex) => (
                              <Cell key={cellIndex}
                                    data={cellIndex === 5 ? element(cellData, index) : cellData}
                                    textStyle={styles.text}


                              />
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
  container: {flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#F6F7FF'},
  head: {height: 40, backgroundColor: '#323232'},
  text: {margin: 6, textAlign: 'center', fontSize: 11, color: '#000', fontWeight: 500},
  sideline: {margin: 6, textAlign: 'center', fontSize: 11, color: '#FFF'},
  row: {textAlign: 'center', flexDirection: 'row', backgroundColor: '#b6cbff', color:'#000000'},
    row1: {textAlign: 'center', flexDirection: 'row', backgroundColor: '#f53c4c', color:'#000000'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB'},
  btnText: {textAlign: 'center', color: '#000000'}
});

export const mapStateToProps = (state) => {
  const currentUser = getUser(state);
  const username = _.get(currentUser, 'profile.nick', false);

  return {
    username: username,
  };
};

export default connect(mapStateToProps, undefined)(NeckPainQR);
