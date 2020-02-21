import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class ItemRequestBook extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.book_item}>
        <View style={styles.styleContent}>
          <Text style={styles.title}>Bạn vừa yêu cầu sách <Text style={styles.titleBook}>{this.props.item.Title}</Text></Text>
          <Text style={styles.dateRequest}>{this.props.item.CreatedAt}</Text>
        </View>
      </TouchableOpacity >
    )
  }
}

const styles = StyleSheet.create({
  book_item: {
    marginVertical: 20,
    marginHorizontal: 8,
  },
  title: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 15
  },
  styleContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dateRequest: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 13,
    color: '#717171'
  },
  titleBook: {
    color: '#1b969f'
  }
})