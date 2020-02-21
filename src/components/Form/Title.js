import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native"

export default class Title extends Component {
  render() {
    var { title } = this.props;
    return (
      <View style={styles.textView}>
        <Text>{title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textView: {
    // flex: 1,
  }
})
