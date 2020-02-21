import React, { Component } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import ItemBook from '../../components/Profile/ItemBook';

export default class BookBorrowing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.bookBorrowing) {
      return (
        <ScrollView>
          <FlatList
            data={this.props.bookBorrowing.Items}
            numColumns={3}
            renderItem={({ item }) => (
              <ItemBook
                item={item}
                type="borrow"
              />
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      )
    }
  }
}