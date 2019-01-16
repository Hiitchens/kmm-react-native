import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Emoji from 'react-native-emoji';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
 
export default class App extends React.Component {
    constructor(props) {
        super(props);
        const sadButton = (value, rating) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating)}>
                <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const neutralButton = (value, rating) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating)}>
                <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const happyButton = (value, rating) => (
            <TouchableOpacity onPress={() => this._alertIndex(value, rating)}>
                <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        this.state = {
            tableHead: ['Exercise', 'Pain', 'Some Difficulties', 'No Problems!'],
            tableData: [
                ['Cross Body Reach', sadButton('0101', '1'),
                    neutralButton('0101', '2'),
                    happyButton('0101', '3')],
                ['Pendulum Swing',  sadButton('0102', '1'),
                    neutralButton('0102', '2'),
                    happyButton('0102', '3')
                   ],
                ['Hanging Arm Chair Stretch',  sadButton('0103', '1'),
                    neutralButton('0103', '2'),
                    happyButton('0103', '3')],
                ['Gravity Stretch for the Shoulder',  sadButton('0104', '1'),
                    neutralButton('0104', '2'),
                    happyButton('0104', '3')],
                ['Wall Walk',  sadButton('0105', '1'),
                    neutralButton('0105', '2'),
                    happyButton('0105', '3')],
                ['Flexion Exercise',  sadButton('0106', '1'),
                    neutralButton('0106', '2'),
                    happyButton('0106', '3')],
                ['Extension Exercise',  sadButton('0107', '1'),
                    neutralButton('0107', '2'),
                    happyButton('0107', '3')],
                ['Abduction and Adduction Exercise',  sadButton('0108', '1'),
                    neutralButton('0108', '2'),
                    happyButton('0108', '3')],

            ]
        }
    }


    _alertIndex(index, rating) {
        Alert.alert(`You have successfully rated exercise ${index} as a ${rating}`);
        this.componentDidMount(index,rating);
    }

    componentDidMount(id, rating)  {
        return fetch('http://45.33.42.72:1234/exerciseRating',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: "5c0744719f1f8c143735de8d",
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
                        fontFamily: "Verdana",
                        fontSize: 23,
                        paddingTop: -30,
                        marginLeft: 25,
                        marginBottom: 15,
                        alignSelf: 'center'
                    }}>
                    Frozen Shoulder
                </Text>
                <ScrollView>
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
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6, textAlign: 'center' },
  row: {  textAlign: 'center', flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});