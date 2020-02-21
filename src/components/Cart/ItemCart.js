import React, { Component } from 'react';
import callAPI from '../../utils/callAPI';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Star } from '../Home/Star';

export default class ItemCart extends Component {
  navigateToDetail = async () => {
    const { item } = this.props;
    try {
      var data = await callAPI(`api/books/${item.Id}`, 'GET');

      this.props.navigateToDetail(data.data);
    } catch (error) {
      console.log("Erro get: ", error);

    }

  };

  handleDeleteItemCart = () => {

    this.props.deleteItemCart(this.props.item.Id);
  }

  changeQuantity = (quantity) => {
    if (quantity >= 1) {
      this.props.changeQuantity(this.props.item.Id, quantity);
    } else {
      this.props.deleteItemCart(this.props.item.Id);
    }
  }

  render() {
    var {
      Authors,
      Title,
      OverallStarRating,
      Price,
      Quantity,
      TotalReview,
      Medias,
    } = this.props.item;

    const { quantity } = this.props;

    return (
      <View
        style={[styles.book_item, { flexDirection: 'row' }]}
      >
        <TouchableOpacity onPress={this.navigateToDetail} >
          <Image source={{ uri: Medias[0].ImageAppUrl || '' }} style={styles.book_img} />
        </TouchableOpacity>
        <View style={{ marginTop: 5 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Icon
              onPress={this.handleDeleteItemCart}
              name="close"
              size={19}
              color="#ff6666"
            />
          </View>
          <View
            style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={styles.title} numberOfLines={1}>
              {Title}
            </Text>
            <Text style={styles.author} numberOfLines={1}>{Authors[0].Name || ''}</Text>
            <Star star={OverallStarRating} TotalReview={TotalReview} />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <Icon
                name="book"
                size={17}
                color="#ff6666"
                style={{ marginRight: 5 }}
              />
              <Text>{Quantity != 0 ? Quantity + ' quyển' : 'Hết sách'}</Text>
              <Icon
                name="money"
                size={17}
                color="#ff6666"
                style={{ marginHorizontal: 5 }}
              />
              <Text>{String(Price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Text style={{ fontSize: 16, }}>Quantity</Text>
              <View style={{ alignSelf: 'flex-end', flexDirection: 'row', }}>
                <Icon
                  onPress={() => this.changeQuantity(quantity - 1)}
                  name="minus"
                  size={17}
                  style={styles.icon}
                  color="#ff6666" />
                <Text style={[styles.icon, { fontSize: 16 }]}>{quantity}</Text>
                <Icon
                  name="plus"
                  size={17}
                  color="#ff6666"
                  style={styles.icon}
                  onPress={() => this.changeQuantity(quantity + 1)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  book_item: {
    width: 155,
    marginVertical: 20,
    marginHorizontal: 8,
  },
  book_img: {
    width: 145,
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 17,
  },
  author: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 15,
    color: '#ababab',
  },
  star_icon: {
    paddingHorizontal: 2,
  },
  icon: {
    paddingHorizontal: 5
  }
});
