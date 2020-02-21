import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { View, Text, ListItem, Body, Right } from 'native-base';

export default class SubCategory extends Component {
  constructor() {
    super();
    this.state = {
      isTick: false,
    };
  }

  hanldGetSubCategory = item => {
    if (this.state.isTick) {
      AsyncStorage.setItem('FindCategory', item);
    } else {
      AsyncStorage.removeItem('FindCategory');
    }
  };

  render() {
    return (
      <View>
        <ListItem onPress={() => this.setState({ isTick: !this.state.isTick })}>
          <Body>
            <Text>{this.props.subList}</Text>
            {this.hanldGetSubCategory(this.props.subList)}
          </Body>
          <Right>
            {this.state.isTick ? (
              <Image source={require('./../../assets/images/tickIcon.png')} />
            ) : null}
          </Right>
        </ListItem>
      </View>
    );
  }
}
