import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default class BestUser extends Component {
  render() {
    const { ImageUrl, Name, BooksCount, ReviewCount } = this.props.item;

    return (
      <View style={styles.user}>
        <Image source={{ uri: ImageUrl || 'https://cdn4.iconfinder.com/data/icons/iconza-ios-tab-icons/60/11-user-active-512.png' }}
          style={styles.avatar} />
        <Text style={{ fontSize: 17 }}>{Name}</Text>
        <Text style={{ color: '#7f7f7f' }}>{BooksCount ? `${BooksCount} lượt mượn` : `${ReviewCount} nhận xét`}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  user: {
    flexDirection: 'column',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 55
  }
})
