import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Emoji from 'react-native-emoji';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
 
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Exercise', 'Pain', 'Some Difficulties', 'No Problems!'],
            tableData: [
                ['Cross Body Reach', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],
                ['Pendulum Swing', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],
                ['Hanging Arm Chair Stretch', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],
                ['Gravity Stretch for the Shoulder', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],
                ['Wall Walk', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],
                ['Flexion Exercise', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],
                ['Extension Exercise', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],
                ['Abduction and Adduction Exercise', <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="neutral_face" style={{fontSize: 40, textAlign: 'center'}}/>,
                    <Emoji name="smile" style={{fontSize: 40, textAlign: 'center'}}/>],

            ]
        }
    }


    _alertIndex(index) {
        Alert.alert(`You have successfully rated exercise ${index + 1}`);
        this.componentDidMount();
    }

    componentDidMount() {
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