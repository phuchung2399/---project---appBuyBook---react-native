import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Title extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View>
        <Text style={styles.styleTextTitle}>{this.props.title}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  styleTextTitle: {
    fontSize: 15,
    fontFamily: 'SVN-ProximaNova',
    color: '#4a4a4a',
    paddingBottom: 5,
    margin: 5,
  }
});