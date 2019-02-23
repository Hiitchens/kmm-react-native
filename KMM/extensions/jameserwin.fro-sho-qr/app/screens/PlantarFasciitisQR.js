import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class PlantarFasciitisQR extends React.Component {
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
        ['NonWeight Calf Stretch', sadButton('0301', '1', 'NonWeight Calf Stretch'),
          neutralButton('0301', '2', 'NonWeight Calf Stretch'),
          happyButton('0301', '3', 'NonWeight Calf Stretch')],
        ['NonWeight Soleus Stretch', sadButton('0302', '1', 'NonWeight Soleus Stretch'),
          neutralButton('0302', '2', 'NonWeight Soleus Stretch'),
          happyButton('0302', '3', 'NonWeight Soleus Stretch')
        ],
        ['Weighted Gastrocnemius', sadButton('0303', '1', 'Weighted Gastrocnemius'),
          neutralButton('0303', '2', 'Weighted Gastrocnemius'),
          happyButton('0303', '3', 'Weighted Gastrocnemius')],
        ['Weighted Soleus Stretch', sadButton('0304', '1', 'Weighted Soleus Stretch'),
          neutralButton('0304', '2','Weighted Soleus Stretch'),
          happyButton('0304', '3', 'Weighted Soleus Stretch')],
        ['Weighted Soleus Stretch', sadButton('0305', '1', 'Weighted Soleus Stretch'),
          neutralButton('0305', '2', 'Weighted Soleus Stretch'),
          happyButton('0305', '3', 'Weighted Soleus Stretch')],
        ['Plantar Fascia Stretch', sadButton('0306', '1','Plantar Fascia Stretch'),
          neutralButton('0306', '2','Plantar Fascia Stretch'),
          happyButton('0306', '3','Plantar Fascia Stretch')],
        ['Hamstring Stretch', sadButton('0306', '1','Hamstring Stretch'),
          neutralButton('0306', '2','Hamstring Stretch'),
          happyButton('0306', '3','Hamstring Stretch')],
        ['Wall Stretch', sadButton('0308', '1','Plantar Fascia Stretch'),
          neutralButton('0308', '2','Plantar Fascia Stretch'),
          happyButton('0308', '3','Plantar Fascia Stretch')],
        ['Plantar Fascia Stretch', sadButton('0306', '1','Plantar Fascia Stretch'),
          neutralButton('0306', '2','Plantar Fascia Stretch'),
          happyButton('0306', '3','Plantar Fascia Stretch')],
        ['Plantar Fascia Stretch', sadButton('0306', '1','Plantar Fascia Stretch'),
          neutralButton('0306', '2','Plantar Fascia Stretch'),
          happyButton('0306', '3','Plantar Fascia Stretch')],

      ]
    }
  }


  _alertIndex(index, rating, exerciseName) {
    const {username} = this.props;

    if (!username) {
      Alert.alert(`You have successfully rated exercise ${index} as a ${rating}`);
    } else {
      Alert.alert(`${username} successfully rated exercise ${index} as a ${rating}`);
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
                fontFamily: "Times New Roman",
                fontSize: 23,
                paddingTop: -30,
                marginLeft: 25,
                marginBottom: 15,
                alignSelf: 'center',
                color:'#FFF'
              }}>Plantar Fasciitis
          </Text>
          <ScrollView>

            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.sideline}/>
              {
                state.tableData.map((rowData, index) => (
                    <TouchableOpacity onPress={() => this._alertIndex(index)}>
                      <TableWrapper key={index} style={styles.row}>
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
  container: {flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#494c64'},
  head: {height: 40, backgroundColor: '#323232'},
  text: {margin: 6, textAlign: 'center', fontSize: 11, color: '#000'},
  sideline: {margin: 6, textAlign: 'center', fontSize: 11, color: '#FFF'},
  row: {textAlign: 'center', flexDirection: 'row', backgroundColor: '#F5DABD', color:'#000000'},
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

export default connect(mapStateToProps, undefined)(PlantarFasciitisQR);