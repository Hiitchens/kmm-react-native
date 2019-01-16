import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Emoji from 'react-native-emoji';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
 
export default class App extends React.Component {
    constructor(props) {
        super(props);
        const sadButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const neutralButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        const happyButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
                <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>
            </TouchableOpacity>
        );
        this.state = {
            tableHead: ['Exercise', 'Pain', 'Some Difficulties', 'No Problems!'],
            tableData: [
                ['Cross Body Reach', sadButton('0101'),
                    neutralButton('0101'),
                    happyButton('0101')],
                ['Pendulum Swing',  sadButton('0102'),
                    neutralButton('0102'),
                    happyButton('0102')
                   ],
                ['Hanging Arm Chair Stretch',  sadButton('0103'),
                    neutralButton('0103'),
                    happyButton('0103')],
                ['Gravity Stretch for the Shoulder',  sadButton('0104'),
                    neutralButton('0104'),
                    happyButton('0104')],
                ['Wall Walk',  sadButton('0105'),
                    neutralButton('0105'),
                    happyButton('0105')],
                ['Flexion Exercise',  sadButton('0106'),
                    neutralButton('0106'),
                    happyButton('0106')],
                ['Extension Exercise',  sadButton('0107'),
                    neutralButton('0107'),
                    happyButton('0107')],
                ['Abduction and Adduction Exercise',  sadButton('0108'),
                    neutralButton('0108'),
                    happyButton('0108')],

            ]
        }
    }


    _alertIndex(index) {
        Alert.alert(`You have successfully rated exercise ${index}`);
        this.componentDidMount();
    }

    componentDidMount()  {
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
                            name: "Cross Body Reach",
                            condition: "Frozen Shoulder",
                            rating: "3"
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