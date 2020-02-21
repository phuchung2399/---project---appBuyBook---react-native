import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Dimensions } from "react-native";
import { connect } from 'react-redux';
import callAPI from '../../utils/callAPI';



class ItemBook extends Component {
  constructor(props) {
    super(props);
    this.getImage();
    this.state = {
      ImageAppUrl: ''
    }

  }
  getImage = async () => {
    const { token } = this.props;
    try {
      if (this.props.type !== 'borrow') {
        var data = await callAPI(`api/books/${this.props.item.Id}`, 'GET', null, token);
        this.setState({
          ImageAppUrl: data.data.Medias[0].ImageUrl
        })
      } else {
        var data = await callAPI(`api/books/${this.props.item.BookCopy.Book.Id}`, 'GET', null, token);
        this.setState({
          ImageAppUrl: data.data.Medias[0].ImageUrl
        })
      }
    } catch (error) {
      console.log('ERROR GET USER:', error);
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.book_item]}>
        <Image source={{ uri: this.state.ImageAppUrl || 'hhsjjagja' }} style={styles.book_img}></Image>
        <View style={styles.styleContent}>
          <Text numberOfLines={1} style={styles.title}>{this.props.type == 'borrow' ? this.props.item.BookCopy.Book.Title : this.props.item.Title}</Text>
          <Text style={this.props.type == 'borrow' ? styles.dateBorrow : styles.statusWaiting}>{this.props.type == 'borrow' ? `Hạn trả ${this.props.item.ExpiryDate}` : 'Sách đã hết'}</Text>
        </View>
        <View style={styles.styleContent}>
          <TouchableOpacity style={this.props.type == 'borrow' ? "" : styles.styleStatus}>
            <Text style={styles.textStatus}>{this.props.type == 'borrow' ? "" : "Hủy chờ"}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity >
    )
  }
}


const styles = StyleSheet.create({
  book_item: {
    marginVertical: 10,
    width: 140,
  },
  book_img: {
    width: 110,
    height: 150,
    borderRadius: 10
  },
  title: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 15
  },
  styleContent: {
    flexDirection: 'column',
    width: 110,
    justifyContent: 'center',
    alignContent: 'center',
  },
  dateBorrow: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 13,
    color: '#717171'
  },
  statusWaiting: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 13,
    color: '#ff6161'
  },
  styleStatus: {
    height: 35,
    width: '80%',
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: '#5bc2ef',
    backgroundColor: '#5bc2ef',
    borderRadius: 50,
  },
  textStatus: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'SVN-ProximaNova'
  },
})


function mapStateToProps(state) {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    idUser: state.authReducer.user.Id,
    token: state.authReducer.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBook);
