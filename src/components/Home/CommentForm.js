import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CommentForm extends Component {
  constructor(props) {
    super(props);

    const { Content, StarRating } = props.commentExist;
    this.state = {
      star: StarRating || 0,
      content: Content || ''
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.commentExist !== prevProps.commentExist) {
      const { Content, StarRating } = this.props.commentExist;
      this.setState({
        star: StarRating,
        content: Content
      })
    }
  }
  rating = (star) => {
    this.setState({
      star
    })
  }

  onChangeText = (content) => {
    this.setState(prevState => ({
      ...prevState,
      content
    }))
  }

  addComment = () => {
    const { content, star } = this.state;
    this.props.addComment(
      content, star
    )
  }
  updateComment = () => {
    const { content, star } = this.state;
    this.props.updateComment(content, star);
  }
  render() {
    var { star, content } = this.state;
    var { isUpdate } = this.props;

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
              <Text style={{ textAlign: 'center', fontSize: 18 }}>Đánh giá</Text>
              <View style={styles.star}>
                <Icon
                  name="star"
                  size={25}
                  style={{ paddingRight: 2 }}
                  color={star < 1 ? '#ababab' : '#ffd11a'}
                  onPress={() => this.rating(1)}
                />
                <Icon
                  name="star"
                  size={25}
                  style={{ paddingRight: 2 }}
                  color={star < 2 ? '#ababab' : '#ffd11a'}
                  onPress={() => this.rating(2)}
                />
                <Icon
                  name="star"
                  size={25}
                  style={{ paddingRight: 2 }}
                  color={star < 3 ? '#ababab' : '#ffd11a'}
                  onPress={() => this.rating(3)}
                />
                <Icon
                  name="star"
                  size={25}
                  style={{ paddingRight: 2 }}
                  color={star < 4 ? '#ababab' : '#ffd11a'}
                  onPress={() => this.rating(4)}
                />
                <Icon
                  name="star"
                  size={25}
                  style={{ paddingRight: 2 }}
                  color={star < 5 ? '#ababab' : '#ffd11a'}
                  onPress={() => this.rating(5)}
                />
              </View>
              <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10 }}>Nhận xét</Text>

              <TextInput
                style={{ borderColor: '#bfbfbf', borderWidth: 1, borderRadius: 5 }}
                multiline={true}
                numberOfLines={5}
                placeholder='Nhập nội dung nhận xét ở đây, tối thiểu 30 kí tự, tối đa 2000 kí tự'
                onChangeText={(text) => this.onChangeText(text)}
                value={content}
              >

              </TextInput>
              <View style={styles.buttonContent}>
                <TouchableOpacity
                  style={styles.btnClose}
                  onPress={() => {
                    this.props.setModalVisible();
                  }}>
                  <Text style={styles.closeText}>Đóng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnComment}
                  onPress={!isUpdate ? this.addComment : this.updateComment}>
                  <Text style={styles.commentText}>{isUpdate ? 'Sửa nhận xét' : 'Nhận xét'}</Text>
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
  }
})
