import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, WebView, TouchableWithoutFeedback} from 'react-native';
import Emoji from 'react-native-emoji';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

import thisData from '../PlantarFascia5-8';

import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';


//variables are set here, logic is the same below for all slides
const condition = 'Plantar Fasciitis';
const YouTube = "https://www.youtube.com/embed/LmmN1U9x7Ps";

const serverAddress = 'http://45.33.42.72:1234/exerciseRating';

const data = thisData.PlantarFasciaStretch;

const sadLength = data.sadPhrases.length;
const medLength = data.medPhrases.length;
const happyLength = data.happyPhrases.length;

const description = data.description;
const descLength = description.length;


const exerciseIndex = '0307';



export class PlantarFasciaWallStretch extends React.Component {
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
                [sadButton(exerciseIndex, '1', 1),
                    neutralButton(exerciseIndex, '2', 2),
                    happyButton(exerciseIndex, '3', 3)],
            ],
        }
    }

    renderCategories() {
        return description.map((item, index) => <Text key={index}>• {item}{"\n"}{"\n"}</Text>);
    }


    _alertIndex(index, rating, serverPing) {
        const {username} = this.props;
        let random = 0;
        let popup;

        if (serverPing === 1){
            random = Math.floor(Math.random()*sadLength);
            popup = data.sadPhrases[random];
        }
        else if (serverPing === 2){
            random = Math.floor(Math.random()*medLength);
            popup = data.medPhrases[random];
        }
        else if(serverPing === 3){
            random = Math.floor(Math.random()*happyLength);
            popup = data.happyPhrases[random];
        }
        if (!username) {
            Alert.alert(`Please sign in to get customized notifications!`);
        } else {
            Alert.alert(`${popup}`);
        }
        this.componentDidMount(index, rating, serverPing, username);
    }

    componentDidMount(id, rating, exerciseName, username) {
        return fetch(serverAddress,
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
                            condition: condition,
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
                    }}>Plantar Fascia Wall Stretch
                </Text>

                <ScrollView scrollingEnabled={true}>
                    <View style={{top:0, flex:1, height:1150,paddingTop:20}} >
                        <View style={{ height: 300 }}>
                            <WebView
                                maxHeight={300}
                                align
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: YouTube }}
                            />
                        </View>

                        <Text
                            style={{fontFamily: 'Noto Sans', fontSize:19, color: '#000000', paddingTop: 40, margin: 25, alignSelf:'center'}}>
                            Step-by-Step Instructions
                        </Text>
                        <View/>

                        <Text
                            style={{fontFamily: 'Noto Serif', fontSize:18, paddingLeft:20, paddingRight:20, color:'#000000'}}>

                            {this.renderCategories()}

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
export default connect(mapStateToProps, undefined)(PlantarFasciaWallStretch);
