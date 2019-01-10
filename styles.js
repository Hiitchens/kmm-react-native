import React from 'react';
import { StyleSheet } from 'react-native';

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {

  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingBottom:22,
    paddingTop:16
  },
  liContainer: {
    height: 140,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height:20,
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500",
    paddingBottom: 22,
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  }
})

module.exports = styles
