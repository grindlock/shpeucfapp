import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import {FlatList, Platform, Text, View, StyleSheet, TouchableOpacity, Dimensions, ProgressViewIOS, ProgressBar }from 'react-native';
=======
>>>>>>> 840c6af6f637ffc6fa79ea9c22581e9f62673be1
import { fetchMembersPoints } from '../actions';
import _ from 'lodash';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ProgressViewIOS } from 'react-native';

const dimension = Dimensions.get('window');
const iteratees = ['points','lastName','firstName'];
const order = ['desc','asc','asc'];

class Leaderboard extends Component {
  componentWillMount() {
    this.props.fetchMembersPoints();
  }

   _keyExtractor = (item, index) => index;

  render() {
    const {
      containerStyle,
      contentContainerStyle } = styles;
    const sortedMembers = _.orderBy(this.props.membersPoints, iteratees, order);


    return Platform.OS === 'ios' ?(
      <FlatList
          data={sortedMembers}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={({item, separators}) => (
          <View style={contentContainerStyle}>
              <Text>{`${item.firstName} ${item.lastName}`}</Text>
              <Text>Points:{item.points}</Text>
              <ProgressViewIOS
                progress = {item.points / sortedMembers[0].points}
                disabled
                thumbTintColor='transparent'/>
            </View>
          )}
      />
  ) :
  (
    <FlatList
        data={sortedMembers}
        extraData={this.state}
        renderItem={({item, separators}) => (
        <View style={contentContainerStyle}>
            <Text>{`${item.firstName} ${item.lastName} `}</Text>
            <Text>Points:{item.points}</Text>
            <ProgressViewIOS
              progress = {item.points / sortedMembers[0].points}
              disabled
              thumbTintColor='transparent'/>
          </View>
        )}
    />
)
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20
  },
  contentContainerStyle: {
    paddingLeft: dimension.width * .05,
    paddingRight: dimension.width * .05,
    margin: 1,
    backgroundColor: '#abc',
  }
});

const mapStateToProps = ({ members }) => {
  const { membersPoints } = members;

  return { membersPoints };
};

const mapDispatchToProps = {
  fetchMembersPoints,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
