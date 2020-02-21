import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import navigateTo from '../../utils/navigateTo'

export default class IconCart extends Component {

  navigateToCart = () => {
    this.props.navigateToCart();
  }
  render() {
    return (
      <>
        <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
          <TouchableOpacity style={styles.btn} onPress={this.navigateToCart}>
            <Icon name='shoppingcart' size={35} color='#ffffff'></Icon>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', right: 10, bottom: 38, borderRadius: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#ffffff' }}>{this.props.cart.length}</Text>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6666',
  }
})
