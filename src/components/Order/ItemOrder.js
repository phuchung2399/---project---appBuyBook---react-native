import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';

export default class ItemOrder extends Component {

  cutDate = (date) => {
    var day = date.substring(0, 10);
    return day.split("-").join("/")
  }

  openModalInfo = () => {
    this.props.openModalInfo(this.props.item)
  }

  convertDate = (string) => {
    moment.locale('en');
    const date = moment(new Date(string));
    let result = date.format('d MMM YYYY');
    return result;
  }

  render() {
    var {
      Title,
      Price,
      Quantity
    } = this.props.item.BookCopy.Book;
    const { CreatedAt, DisplayStatus, ImageUrl, Id, ExpiryDate } = this.props.item;
    let color = '#7f7f7f';
    let date = this.convertDate(CreatedAt).split(" ");
    if (DisplayStatus === 'Đã đặt trước') {
      color = '#ff6666';
    } else if (DisplayStatus === 'Đang mượn') {
      color = '#73c700';
    } else if (DisplayStatus === 'Đã trả') {
      color = '#1d9dd8';
    } else if (DisplayStatus === 'Đã hủy') {
      color = '#ff0000';
    }
    return (
      <TouchableOpacity style={styles.item} onPress={this.openModalInfo}>

        <View style={styles.content}>
          <View>
            <View style={styles.date}>
              {/* <Text style={{ fontSize: 18, color: '#4a4a4a', marginBottom: 5 }}>{String(Price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text> */}
              <Text style={styles.dateYearText}>{date[0]}</Text>
              <Text style={{ color: '#1D9DD8', fontSize: 19, fontWeight: 'bold' }}>{date[1]}</Text>
              <Text style={styles.dateYearText}>{date[2]}</Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='barcode' size={20} color='#ff6666' style={styles.icon}></Icon>
              <Text style={{ fontSize: 18 }}>{Id.toUpperCase()}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='money' size={20} color='#ff6666' style={styles.icon}></Icon>
              <Text style={styles.idText}>{String(Price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
            </View>
            <Text style={{ color: '#7f7f7f' }}>Hạn trả: <Text style={styles.idText}>{this.cutDate(ExpiryDate)}</Text></Text>
          </View>
          <View style={{ alignItems: 'flex-end', flex: 1 }}>
            <Text style={{ textAlign: 'right', fontSize: 17, color: color, paddingRight: 5 }}>{DisplayStatus}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10
  },
  content: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 20
  },
  date: {
    alignItems: 'center',
    borderRightColor: '#7f7f7f',
    borderRightWidth: 0.5,
    paddingRight: 30,
    marginRight: 15,
  },
  idText: {
    fontSize: 17,
    textAlign: 'left',
    color: '#7f7f7f'
  },
  dateYearText: {
    color: '#1D9DD8',
    fontSize: 17
  },
  icon: {
    paddingRight: 13
  }
})
