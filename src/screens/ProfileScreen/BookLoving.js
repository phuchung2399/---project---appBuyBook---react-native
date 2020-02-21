import React, { Component } from 'react'
import { FlatList } from 'react-native'
import ItemBook from '../../components/Home/ItemBook'
import navigateTo from '../../utils/navigateTo';


export default class BookLoving extends Component {

  navigateToDetailCall = item => {
    navigateTo({
      item
    }, this.props.componentId, 'Detail', {
      rightButtons: {
        id: 'favorite',
        icon: require('../../assets/images/heart.png'),
      },
    });
  };
  render() {
    return (
      <FlatList
        data={this.props.bookFollowing}
        horizontal={false}
        renderItem={({ item }) => (
          <ItemBook
            item={item}
            flex="row"
            navigateToDetail={this.navigateToDetailCall}
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    )
  }
}
