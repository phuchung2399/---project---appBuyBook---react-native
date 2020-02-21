import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ItemBook from '../../components/Home/ItemBook';
import navigateTo from '../../utils/navigateTo';
import { Navigation } from 'react-native-navigation';

export default class SeeAll extends Component {
  navigateToDetail = item => {
    navigateTo({ item }, this.props.componentId, 'Detail');
  };
  render() {
    const { data } = this.props;
    return (
      <FlatList
        style={{ marginHorizontal: 10 }}
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <ItemBook
            item={item}
            flex="column"
            navigateToDetail={this.navigateToDetail}
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}
