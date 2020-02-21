import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  AsyncStorage,
} from 'react-native';
import { some, filter } from 'lodash';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import * as bookActions from '../../reduxs/bookRedux/actions';
import ItemBook from '../../components/Home/ItemBook';
import navigateTo from '../../utils/navigateTo';

class FilterScreen extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
      isShow: false,
      listIcon: false,
    };
  }

  componentDidMount = async () => {
    this.props.fetchBook();
    let category = await AsyncStorage.getItem('FindCategory');
    this.setState({
      category: category,
      numColumns: 2,
    });
  };

  navigateToDetail = item => {
    console.log('Detai', item);
    console.log('this.props.componentId: ', this.props.componentId);
    navigateTo({ item }, this.props.componentId, 'Detail', item.Title);
  };

  onPressBack = () => {
    Navigation.dismissModal(this.props.componentId);
    // Navigation.showModal({
    //   sideMenu,
    // });
  };

  onPressMoveTypeScreen = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              id: 'SideBar',
              name: 'SideBar',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  onMoveSortScreen = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'SortBook',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  onPressMoveSearchScreen = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'SearchBook',
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  hanldSortBook = (sort, dataBook) => {
    if (sort === 'atz') {
      return dataBook.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sort === 'zta') {
      return dataBook.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sort === 'htl') {
      return dataBook.sort((a, b) => b.Price - a.Price);
    } else if (sort === 'lth') {
      return dataBook.sort((a, b) => a.Price - b.Price);
    } else {
      return dataBook;
    }
  };

  hanldFilterBook = (itemView, key, flex, numColumns, sort, dataBook) => {
    return (
      <View style={itemView}>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={this.hanldSortBook(sort, dataBook)}
          numColumns={numColumns}
          key={key}
          renderItem={({ item }) => (
            <ItemBook
              item={item}
              flex={flex}
              navigateToDetail={this.navigateToDetail}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  render() {
    const { dataBook } = this.props;
    let { sort } = this.props;
    const categories = filter(dataBook, value => {
      return some(value.Categories, { Name: this.state.category });
    });
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.onPressBack}>
            <Image source={require('./../../assets/images/backIcon.png')} />
          </TouchableOpacity>
          <Text>
            {this.state.category !== null ? this.state.category : 'List Sách'}
          </Text>
          <TouchableOpacity onPress={this.onPressMoveSearchScreen}>
            <Image source={require('./../../assets/images/searchIcon.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPressMoveTypeScreen}>
            <View style={styles.button}>
              <Text>Thể Loại</Text>
              <Image
                style={styles.filterIcon}
                source={require('./../../assets/images/filterIcon.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortIcon}
            onPress={this.onMoveSortScreen}>
            <View style={styles.button}>
              <Text style={{ marginLeft: 10 }}>Sắp xếp</Text>
              <Image
                style={{ marginLeft: 60 }}
                source={require('./../../assets/images/sortIcon.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                isShow: !this.state.isShow,
                listIcon: !this.state.listIcon,
              })
            }>
            {this.state.listIcon === false ? (
              <View style={styles.button}>
                <Image source={require('./../../assets/images/listIcon.png')} />
              </View>
            ) : (
                <View style={styles.button}>
                  <Image
                    source={require('./../../assets/images/listIconSq.png')}
                  />
                </View>
              )}
          </TouchableOpacity>
        </View>
        {this.state.category === null && this.state.isShow === false
          ? this.hanldFilterBook(
            styles.itemView,
            null,
            'column',
            2,
            sort,
            dataBook,
          )
          : this.state.category === null && this.state.isShow === true
            ? this.hanldFilterBook(
              null,
              this.state.numColumns,
              'row',
              1,
              sort,
              dataBook,
            )
            : this.state.isShow === false
              ? this.hanldFilterBook(
                styles.itemView,
                null,
                'column',
                2,
                sort,
                categories,
              )
              : this.state.isShow === true
                ? this.hanldFilterBook(
                  null,
                  this.state.numColumns,
                  'row',
                  1,
                  sort,
                  categories,
                )
                : console.log('error')}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    dataBook: state.bookReducer.books,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBook: () => dispatch(bookActions.fetchBooks()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 40,
  },
  filterIcon: {
    marginLeft: 50,
    marginRight: -50,
  },
  sortIcon: {
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  itemView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 150,
  },
});
