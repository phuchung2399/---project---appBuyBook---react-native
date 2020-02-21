import React, { Component } from 'react';
import {
  View,
  ScrollView,
  SectionList,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ListBook from '../../components/Home/ListBook';
import { offlineData } from '../../data/offlineData';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import * as bookActions from '../../reduxs/bookRedux/actions';
import TitleSection from '../../components/Home/TitleSection';
import navigateTo from '../../utils/navigateTo';
import IconCart from '../../components/Cart/IconCart';
import BestUser from '../../components/Home/BestUser'

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.fetchCmsHome();
    Navigation.events().bindComponent(this)
  }

  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    try {
      if (buttonId === 'SideBar') {
        Navigation.mergeOptions(componentId, {
          sideMenu: {
            left: {
              visible: true,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  filterData = booksHome => {
    var books = [];
    var title = '';
    Object.keys(booksHome).forEach(function (key) {
      if (Array.isArray(offlineData[key])) {
        if (key == 'NewBooks') {
          title = 'Sách mới nhất';
        }
        if (key == 'HotTrendBooks') {
          title = 'Sách nổi bật nhất';
        }
        if (key == 'MostBorrowBooks') {
          title = 'Sách mượn nhiều nhất';
        }
        if (offlineData[key].length > 0) {
          var bookList = [];
          offlineData[key].forEach(item => {
            if (!item.IsDeleted) {
              bookList.push(item)
            }
          })
          books.push({
            type: title,
            data: [{ bookList }],
          });
        }
      }
    });
    return books;
  };

  navigateToDetailCall = item => {
    navigateTo({
      item
    }, this.props.componentId, 'Detail');
  };

  setCart = (cart) => {
    this.props.setCart(cart);
  }

  navigateToSeeAll = (data, type) => {
    navigateTo({ data }, this.props.componentId, 'SeeAll', {
      title: {
        text: type,
        alignment: 'center'
      }
    });
  };

  navigateToCart = () => {
    navigateTo({}, this.props.componentId, "Cart", {
      visible: true,
      title: {
        text: 'Danh sách giỏ hàng',
        alignment: 'center'
      },
      rightButtons: {
        id: 'deleteAll',
        icon: require('../../assets/images/delete.png'),
      },
    });
  }

  render() {
    const { loading, booksHome, bestUsers, bestReviewers } = this.props.data;
    const { isAuthenticated, cart } = this.props;
    if (loading) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="#ff6666" style={{ flex: 1 }} />
        </View>
      );
    } else {
      const books = this.filterData(booksHome) || [];
      return (
        <View style={{ flex: 1, margin: 15 }}>
          <SectionList
            showsVerticalScrollIndicator={false}
            sections={books}
            keyExtractor={(item, index) => item + index}
            renderItem={item => (
              <ListBook
                data={item.section.data[0].bookList}
                navigateToDetail={this.navigateToDetailCall}
                flex='column'
              />
            )}
            renderSectionHeader={({ section: { type, data } }) => (
              <TitleSection
                type={type}
                data={data[0].bookList}
                navigateToSeeAll={this.navigateToSeeAll}
              />
            )}
            ListFooterComponent={() => (
              <>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>Top 10 Bạn Đọc Mượn Sách</Text>
                <FlatList
                  data={bestUsers}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <BestUser
                      item={item}
                    />
                  )}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                />
                <Text style={{ fontSize: 20, marginVertical: 20 }}>Top 5 Bạn Đọc Nhận Xét Nổi Bật</Text>
                <FlatList
                  data={bestReviewers}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <BestUser
                      item={item}
                    />
                  )}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
          />
          {isAuthenticated && <IconCart navigateToCart={this.navigateToCart} cart={cart}></IconCart>}

        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.bookReducer,
    isAuthenticated: state.authReducer.isAuthenticated,
    cart: state.authReducer.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCmsHome: () => dispatch(bookActions.fetchCmsHome()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
