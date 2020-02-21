export const sideMenu = {
  left: {
    component: {
      name: 'SideBar',
      options: {
        topBar: {
          title: {
            text: 'Thể loại',
            alignment: 'center',
          },
        },
      },
    },
    visible: true,
  },
  center: {
    stack: {
      children: [
        {
          bottomTabs: {
            children: [
              {
                component: {
                  name: 'Home',
                  options: {
                    topBar: {
                      leftButtons: {
                        id: 'SideBar',
                        component: {
                          name: 'SideBar',
                        },
                        icon: require('./../assets/images/homeIcon.png'),
                      },
                    },
                    bottomTab: {
                      selectedTextColor: '#ff6666',
                      titleDisplayMode: 'showWhenActive',
                      text: 'Home',
                      icon: require('../assets/images/home.png'),
                      testID: 'FIRST_TAB_BAR_BUTTON',
                    },
                  },
                  passProps: {
                    text: 'This is tab 1',
                  },
                },
              },
              {
                component: {
                  name: 'Order',
                  passProps: {
                    text: 'This is tab 2',
                  },
                  options: {
                    topBar: {
                      visible: true,
                      title: {
                        text: 'Danh sách đơn hàng',
                        alignment: 'center'
                      },
                    },
                    bottomTab: {
                      selectedTextColor: '#ff6666',
                      titleDisplayMode: 'showWhenActive',
                      text: 'Order',
                      icon: require('../assets/images/order.png'),
                      testID: 'SECOND_TAB_BAR_BUTTON',
                    },
                  },
                },
              },
              {
                component: {
                  name: 'Profile',
                  passProps: {
                    text: 'This is tab 2',
                  },
                  options: {
                    topBar: {
                      visible: true,
                      title: {
                        text: 'Trang cá nhân',
                        alignment: 'center'
                      },
                    },
                    bottomTab: {
                      selectedTextColor: '#ff6666',
                      titleDisplayMode: 'showWhenActive',
                      text: 'Profile',
                      icon: require('../assets/images/profile.png'),
                      testID: 'SECOND_TAB_BAR_BUTTON',
                    },
                    topBar: {
                      visible: false,
                      drawBehind: true,
                    },
                  },
                },
              },
              {
                component: {
                  name: 'Notification',
                  passProps: {
                    text: 'This is tab 2',
                  },
                  options: {
                    topBar: {
                      visible: true,
                      title: {
                        text: 'Thông báo',
                        alignment: 'center'
                      },
                    },
                    bottomTab: {
                      selectedTextColor: '#ff6666',
                      titleDisplayMode: 'showWhenActive',
                      text: 'Thông báo',
                      icon: require('../assets/images/notification.png'),
                      testID: 'SECOND_TAB_BAR_BUTTON',
                    }
                  },
                },
              },
              {
                component: {
                  name: 'Library',
                  passProps: {
                    text: 'This is tab 2',
                  },
                  options: {
                    topBar: {
                      visible: false,
                      drawBehind: true,
                    },
                    bottomTab: {
                      animate: true,
                      selectedTextColor: '#ff6666',
                      titleDisplayMode: 'showWhenActive',
                      text: 'Thư viện',
                      icon: require('../assets/images/library.png'),
                      testID: 'SECOND_TAB_BAR_BUTTON',
                    },
                  },
                },
              },
            ],
          },
        },
      ],
      options: {
        bottomTab: {
          selectedTextColor: '#ff6666',
          titleDisplayMode: 'showWhenActive',
          text: 'Home',
          icon: require('../assets/images/home.png'),
          testID: 'FIRST_TAB_BAR_BUTTON',
        },
      },
    },
  },
};
