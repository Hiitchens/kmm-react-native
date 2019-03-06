import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class FrozenShoulderQuickRate extends React.Component {
    constructor(props) {
        super(props);
        const sadButton = (value, rating, exerciseName, username) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating, exerciseName, username)}>
                <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const neutralButton = (value, rating, exerciseName, username) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating, username)}>
                <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const happyButton = (value, rating, exerciseName, username) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating, username)}>
                <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );

        this.state = {
            tableHead: ['Exercise', 'Pain', 'Some Difficulties', 'No Problems!'],
            tableData: [
                ['Cross Body Reach', sadButton('0101', '1', 'Cross Body Reach'),
                    neutralButton('0101', '2', 'Cross Body Reach'),
                    happyButton('0101', '3', 'Cross Body Reach')],
                ['Pendulum Swing', sadButton('0102', '1', 'Pendulum Swing'),
                    neutralButton('0102', '2', 'Pendulum Swing'),
                    happyButton('0102', '3', 'Pendulum Swing')
                ],
                ['Hanging Arm Chair Stretch', sadButton('0103', '1', 'Hanging Arm Chair Stretch'),
                    neutralButton('0103', '2', 'Hanging Arm Chair Stretch'),
                    happyButton('0103', '3', 'Hanging Arm Chair Stretch')],
                ['Gravity Stretch for the Shoulder', sadButton('0104', '1', 'Gravity Stretch'),
                    neutralButton('0104', '2', 'Gravity Stretch'),
                    happyButton('0104', '3', 'Gravity Stretch')],
                ['Wall Walk', sadButton('0105', '1', 'Wall Walk'),
                    neutralButton('0105', '2', 'Wall Walk'),
                    happyButton('0105', '3', 'Wall Walk')],
                ['Flexion Exercise', sadButton('0106', '1', 'Flexion Exercise'),
                    neutralButton('0106', '2', 'Flexion Exercise'),
                    happyButton('0106', '3', 'Flexion Exercise')],
                ['Extension Exercise', sadButton('0107', '1', 'Extension Exercise'),
                    neutralButton('0107', '2', 'Extension Exercise'),
                    happyButton('0107', '3', 'Extension Exercise')],
                ['Abduction and Adduction Exercise', sadButton('0108', '1', 'Abduction and Adduction'),
                    neutralButton('0108', '2', 'Abduction and Adduction'),
                    happyButton('0108', '3', 'Abduction and Adduction')],
            ]
        }
    }


    _alertIndex(index, rating, exerciseName) {
        const {username} = this.props;
  /*
        if (!username) {
            Alert.alert(`You have successfully rated exercise ${index} as a ${rating}`);
        } else {
            Alert.alert(`${username} successfully rated exercise ${index} as a ${rating}`);
        }
        */
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
                        fontFamily: "Times New Roman",
                        fontSize: 23,
                        paddingTop: -30,
                        marginLeft: 25,
                        marginBottom: 15,
                        alignSelf: 'center',
                        color:'#4D49D4'
                    }}>Frozen Shoulder
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

export default connect(mapStateToProps, undefined)(FrozenShoulderQuickRate);
