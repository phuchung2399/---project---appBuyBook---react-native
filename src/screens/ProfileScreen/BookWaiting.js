import React, { Component } from 'react'
import { FlatList } from 'react-native'
import ItemBook from '../../components/Profile/ItemBook';

export default class BookWaiting extends Component {
  render() {
    return (
      <FlatList
        data={this.props.bookWaiting}
        numColumns={3}
        renderItem={({ item }) => (
          <ItemBook
            item={item}
            type="waiting"
          />
        )}
        keyExtractor={item => item.Id}
        showsHorizontalScrollIndicator={false}
      />
    )
  }
}
