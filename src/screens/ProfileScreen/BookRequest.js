import React, { Component } from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import ItemRequestBook from '../../components/Profile/ItemRequestBook'


export default class BookRequest extends Component {
  render() {
    return (
      <ScrollView >
        <FlatList
          data={this.props.requestBook}
          horizontal={false}
          style={{ backgroundColor: '#fff' }}
          renderItem={({ item }) => (
            <ItemRequestBook
              item={item}
              flex="row"
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    )
  }
}
