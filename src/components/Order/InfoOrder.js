import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Star from '../../components/Home/Star'
export default class InfoOrder extends Component {
  convertDate = (inputDate) => {
    const yourDate = new Date(inputDate);
    let date = yourDate.getDate() + "/" + parseInt(yourDate.getMonth() + 1) + "/" + yourDate.getFullYear();
    return date
  }

  cutDate = (date) => {
    var day = date.substring(0, 10);
    return day.split("-").join("/")
  }

  updateStatus = (status) => {
    const { Id } = this.props.item;
    this.props.updateStatus(Id, status);
  }

  render() {
    var {
      Title,
      Price,
      Quantity,
      OverallStarRating,
      TotalReview
    } = this.props.item?.BookCopy?.Book || {};

    const { DateReturned, CreatedAt, DisplayStatus, ImageUrl, Id, BorrowedDate, Status } = this.props.item;

    let color = '#7f7f7f';
    var date = '';
    if (DisplayStatus === 'Đã đặt trước') {
      color = '#ff6666';
      date = 'Ngày yêu cầu: ' + this.convertDate(CreatedAt);
    } else if (DisplayStatus === 'Đang mượn') {
      color = '#73c700';
      date = 'Ngày mượn: ' + this.cutDate(BorrowedDate);
    } else if (DisplayStatus === 'Đã trả') {
      color = '#1d9dd8';
      date = 'Ngày trả: ' + this.cutDate(DateReturned);
    } else if (DisplayStatus === 'Đã hủy') {
      color = '#ff0000';
      date = 'Ngày yêu cầu: ' + this.convertDate(CreatedAt);
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible();
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={this.props.setModalVisible} style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.contentContainer}>
              <View style={styles.info}>
                <Image
                  source={{ uri: ImageUrl }}
                  style={styles.book_img}
                />
                <Text style={styles.title} numberOfLines={1}>
                  {Title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                  }}>
                  <Icon
                    name="book"
                    size={17}
                    color="#ff6666"
                    style={{ marginRight: 5 }}
                  />
                  <Text>{Quantity != 0 ? Quantity + ' quyển' : 'Hết sách'}</Text>
                  <Icon
                    name="money"
                    size={17}
                    color="#ff6666"
                    style={{ marginLeft: 25, marginRight: 5 }}
                  />
                  <Text>{String(Price).replace(/(.)(?=(\d{3})+$)/g, '$1,')}đ</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 19, color: color, textAlign: 'center' }}>{DisplayStatus}</Text>
                  <Text style={{ color: '#7f7f7f', fontSize: 17 }}>{date}</Text>
                </View>
              </View>
              <View style={styles.buttonContent}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => {
                    Status === "Reserved" ? this.updateStatus("Cancelled") : this.props.setModalVisible()
                  }}>
                  <Text style={styles.closeText}>{Status === "Reserved" ? "Hủy" : "Đóng"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnComment, { display: Status === "Returned" || Status === "Cancelled" ? 'none' : 'flex' }]}
                  onPress={() => {
                    Status === "Reserved" ? this.updateStatus("Borrowed") : this.updateStatus("Returned")
                  }}>
                  <Text style={styles.commentText}> {Status === "Reserved" ? "Mượn" : "Trả"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
  },

  contentContainer: {
    backgroundColor: '#ffffff',
    width: "90%",
    borderRadius: 10,
    padding: 20
  },

  buttonContent: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },

  btnClose: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff6666'
  },
  closeText: {
    color: '#ff6666',
    textAlign: 'center',
  },
  btnComment: {
    width: 100,
    justifyContent: 'center',
    backgroundColor: '#ff6666',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  commentText: {
    color: '#fff',
    textAlign: 'center',
  },
  star: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  book_img: {
    width: 100,
    height: 150,
    borderRadius: 6,
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SVN-ProximaNova',
    fontSize: 18,
  }
})
