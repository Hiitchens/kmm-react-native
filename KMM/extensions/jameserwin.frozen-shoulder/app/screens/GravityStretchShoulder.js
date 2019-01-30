import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class GravityStretchShoulder extends React.Component {
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
      tableHead: ['Pain', 'Some Difficulties', 'No Problems!'],
      tableData: [
        [sadButton('0104', '1'),
          neutralButton('0104', '2'),
          happyButton('0104', '3')],
      ]
    }
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
                fontFamily: 'Lustria',
                fontSize: 21,
                paddingTop: -30,
                marginBottom: 15,
                alignSelf: 'center',
                color:'#fff'
              }}>Gravity Stretch
          </Text>
          <ScrollView scrollingEnabled={true}>
            <View style={{top:0, flex:1, height:800,paddingTop:20}} >
              <View style={{ height: 300 }}>
                <WebView
                    maxHeight={300}
                    align
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: "https://www.youtube.com/embed/tj5eRa0CUME" }}
                />
              </View>

              <Text
                  style={{fontFamily: 'Lustria', fontSize:19, color: '#fff', paddingTop: 40, margin: 25, alignSelf:'center'}}>
                Step-by-Step Instructions
              </Text>
              <View/>
              <Text
                  style={{fontFamily: 'Lustria', fontSize:18, paddingLeft:20, paddingRight:20, color:'#fff'}}>
                • Lay face up with the affected shoulder on the free edge of the bed or couch.{"\n"}{"\n"}
                • Bend the elbow of the affected side to 90 degrees.{"\n"}{"\n"}
                • With the affected arm over the edge of the bed/couch, allow gravity to gently stretch the shoulder{"\n"}{"\n"}
                • You should feel this stretch in your anterior shoulder and chest area.{"\n"}{"\n"}
                • Discomfort is allowable, but if pain is felt discontinue.{"\n"}{"\n"}
                • This activity can be performed with a heat pack on the shoulder, and the duration can be increased up to 15 minutes.{"\n"}{"\n"}
                • In later stages of recovery a light weight can be placed in the hand to increase the stretch{"\n"}{"\n"}

              </Text>
            </View>


            <Table borderStyle={{borderColor: 'transparent'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
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
  container: {flex: 1, padding: 16, paddingTop: 10,},
  head: {height: 40, backgroundColor: '#494C64'},
  text: {margin: 6, textAlign: 'center', fontSize: 11, color: '#fff'},
  row: {textAlign: 'center', flexDirection: 'row', backgroundColor: '#F5DABD'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB'},
  btnText: {textAlign: 'center', color: '#fff'}
});

export const mapStateToProps = (state) => {
  const currentUser = getUser(state);
  const username = _.get(currentUser, 'profile.nick', false);

  return {
    username: username,
  };
};

export default connect(mapStateToProps, undefined)(GravityStretchShoulder);