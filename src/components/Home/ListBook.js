import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ItemBook from './ItemBook';

export default class ListBook extends Component {
  render() {
    const { data, navigateToDetail, flex } = this.props;
    const books = data.slice(0, 5);
    return (
      <FlatList
        data={books}
        horizontal={true}
        renderItem={({ item }) => (
          <ItemBook
            item={item}
            flex={flex}
            navigateToDetail={navigateToDetail}
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listBooks: {
    marginVertical: 15,
  },
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});
