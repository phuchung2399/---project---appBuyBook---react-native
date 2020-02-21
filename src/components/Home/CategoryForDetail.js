import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

export default class CategoryForDetail extends Component {
  render() {
    const { cate } = this.props;
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>{cate.Name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#cecece',
    height: 30,
    margin: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#ababab'
  }
})
