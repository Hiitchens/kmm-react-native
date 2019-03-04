import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';

export class ForearmRotationBladeSqueeze extends React.Component {
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
                [sadButton('0204', '1'),
                    neutralButton('0204', '2'),
                    happyButton('0204', '3')],
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
                        fontFamily: 'Noto Serif',
                        fontSize: 21,
                        paddingTop: -30,
                        marginBottom: 15,
                        alignSelf: 'center',
                        color:'#000000'
                    }}>Forearm Rotational Blade Squeeze
                </Text>
                <ScrollView scrollingEnabled={true}>
                    <View style={{top:0, flex:1, height:1030,paddingTop:20}} >
                        <View style={{ height: 300 }}>
                            <WebView
                                maxHeight={300}
                                align
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: "https://www.youtube.com/embed/50kE4AfMpPM" }}
                            />
                        </View>

                        <Text
                            style={{fontFamily: 'Noto Sans', fontSize:19, color: '#000000', paddingTop: 40, margin: 25, alignSelf:'center'}}>
                            Step-by-Step Instructions
                        </Text>
                        <View/>
                        <Text
                            style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>
                            •	Stand with your arms relaxed and palms facing forward.{"\n"}{"\n"}
                            •	Slowly squeeze your shoulder blades together.{"\n"}{"\n"}
                            •	Try not to shrug your shoulders.{"\n"}{"\n"}
                            •	Hold for 5 seconds. Release.{"\n"}{"\n"}
                            •	Repeat up to 10 times.{"\n"}{"\n"}
                            •	Repeat as often as possible during the day.{"\n"}{"\n"}
                            •	Additional Tips:{"\n"}{"\n"}
                            •	This is especially useful if you have been sitting at a computer for a while.  In this case try to do this stretch several times per hour while standing or sitting.{"\n"}{"\n"}
                            •	This activity will strengthen muscles along the spine while allowing the chest muscles to open up.{"\n"}{"\n"}
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
    head: {height: 40},
    text: {fontFamily: 'Noto Sans', margin: 6, textAlign: 'center', fontSize: 13, fontWeight: 200, color: '#000'},
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

export default connect(mapStateToProps, undefined)(ForearmRotationBladeSqueeze);