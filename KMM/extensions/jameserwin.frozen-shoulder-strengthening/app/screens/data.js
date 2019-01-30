import React from 'react';
import Emoji from 'react-native-emoji';
import {Image} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getUser} from 'shoutem.auth';
import {ext} from '../const';
var btnsDefault = [ { text: 'Button' } ];

var btnsTypes = [
  { text: 'Primary',    type: 'primary',   },
  { text: 'Secondary',  type: 'secondary', },
  { text: 'Delete',     type: 'delete',    }
];



var rows = [
  {
    text: "Review this exercise",
    right: [
      {component: <Emoji name="weary" style={{fontSize: 40, textAlign: 'center'}}/>},
      { component: <Emoji name="slightly_smiling_face" style={{fontSize: 35}} />},
      { component:  <Emoji name="smile" style={{fontSize: 35}} />},

    ],
    autoClose: true,
  }
];

export default rows;
