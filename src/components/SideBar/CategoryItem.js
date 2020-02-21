import React, { Component } from 'react';
import { FlatList, Image, AsyncStorage } from 'react-native';
import { View, Text, ListItem, Body, Right } from 'native-base';
import SubCategory from './SubCategory';

export default class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false, isTick: false, data: null };
  }

  renderItem = ({ item }) => {
    return <SubCategory tick={item.Name} subList={item.Name} />;
  };

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
        <ListItem
          icon
          onPress={() =>
            this.setState({
              isTick: !this.state.isTick,
              isShow: !this.state.isShow,
            })
          }>
          <Body>
            <Text>{this.props.name}</Text>
            {this.hanldGetSubCategory(this.props.name)}
          </Body>
          <Right>
            {this.props.subList.length !== 0 ? (
              <Image source={require('./../../assets/images/arrow.png')} />
            ) : this.state.isTick ? (
              <Image source={require('./../../assets/images/tickIcon.png')} />
            ) : null}
          </Right>
        </ListItem>
        {this.state.isShow ? (
          <FlatList
            data={this.props.subList}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
        ) : null}
      </View>
    );
  }
}
