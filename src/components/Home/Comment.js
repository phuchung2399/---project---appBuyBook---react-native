import React, { Component } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import StarIcon from './StarIcon'
import Icon from 'react-native-vector-icons/FontAwesome';
import format from '../../utils/DateFormatter'

export default class Comment extends Component {
  showUpdateComment = () => {
    this.props.showUpdateComment();
  }
  render() {
    const { idUser } = this.props;
    const { UserName, StarRating, UrlImageUser, Content, UserId, CreatedAt } = this.props.item;
    // const yourDate = new Date(CreatedAt);
    // let date = yourDate.getDate() + "-" + parseInt(yourDate.getMonth() + 1) + "-" + yourDate.getFullYear();

    return (
      <View style={{ flexDirection: 'row', marginBottom: 20, }}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: UrlImageUser || 'https://cdn4.iconfinder.com/data/icons/iconza-ios-tab-icons/60/11-user-active-512.png' }}
            style={styles.book_img} />
        </View>
        <View style={{ flex: 4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{UserName}</Text>
            {UserId == idUser ?
              (<View style={{ flexDirection: 'row' }}>
                <Icon name='edit' size={18} style={[{ marginHorizontal: 10 }, styles.icon]} onPress={this.showUpdateComment}></Icon>
                <Icon name='trash' size={17} style={styles.icon} onPress={this.props.deleteComment}></Icon>
              </View>)
              :
              <Text>{format(CreatedAt)}</Text>}
          </View>
          <View style={{ marginTop: 5 }}>
            <StarIcon star={StarRating}></StarIcon>
          </View>
          <Text style={{ color: '#7f7f7f', marginTop: 10, }}>
            {Content}
          </Text>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  book_img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    color: '#5f5f5f'
  }
});
