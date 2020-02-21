import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import format from '../../utils/DateFormatter'

export default class ItemNotifi extends Component {
  updateSeen = () => {
    this.props.updateSeen(this.props.item.Id)
  }
  render() {
    const { Title, CreatedAt, Body, Type, } = this.props.item.Notification;
    const { IsSeen } = this.props.item;
    var icon = 'bell-o';
    var title = 'Thông báo';
    var color = 'f5a623';
    if (Type === 'Book') {
      title = 'Mượn sách';
      icon = 'book';
      color = '#eb6f6f'
    }
    if (Type === 'BookRequest') {
      title = 'Thành viên';
      icon = 'user';
      color = '#7ed321'
    }
    if (Type === 'Notification') {
      title = 'Thông báo';
      icon = 'bell-o';
      color = '#f5a623'
    }
    return (
      <TouchableOpacity style={[styles.notifi, { backgroundColor: IsSeen ? '#fff' : '#E4E9F1', }]} onPress={this.updateSeen}>
        <TouchableOpacity style={[{ backgroundColor: color }, styles.icon]}>
          <Icon name={icon} color='#fff' size={20}></Icon>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 10, flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#4a4a4a', fontSize: 20 }}>{title}</Text>
            <Text style={{ color: '#ababab', fontSize: 15 }}>{format(CreatedAt)}</Text>
          </View>
          <Text style={{ color: '#7f7f7f', fontSize: 18 }}>{Title}</Text>
          <Text style={{ color: '#7f7f7f', fontSize: 17 }}>{Body}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifi: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#b3b3b3',
  }
})
