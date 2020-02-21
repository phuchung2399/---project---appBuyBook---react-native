import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class ItemSetting extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.navigationScreen}>
        <Image style={styles.imageStyle} source={this.props.image}></Image>
        <View style={styles.styleViewText}>
          <Text style={styles.textStyle}> {this.props.title}</Text>
        </View>
      </TouchableOpacity >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    padding: 15,
  },
  imageStyle: {
    marginHorizontal: 10,
    height: 30,
    width: 30
  },
  textStyle: {
    fontFamily: 'SVN-ProximaNova',
    color: '#4a4a4a',
    fontSize: 18
  },
  styleViewText: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: '#e9e9e9',
    width: '70%'
  }
})

