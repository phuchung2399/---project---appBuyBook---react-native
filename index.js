import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import { Navigation } from 'react-native-navigation';
import Detail from './src/screens/HomeScreen/Detail';
import Library from './src/screens/LibraryScreen';
import Notification from './src/screens/NotificationScreen';
import Order from './src/screens/OrderScreen';
import Profile from './src/screens/ProfileScreen';
import Slide from './src/screens/SlideScreen';
import Home from './src/screens/HomeScreen';
import SideBar from './src/screens/SideBarScreen';
import { store, persistor } from './src/reduxs/store';
import { Provider } from 'react-redux';
import SeeAll from './src/screens/HomeScreen/SeeAll';
import Auth from './src/screens/AuthScreen'
import Cart from './src/screens/HomeScreen/Cart'
import FilterScreen from './src/screens/FilterScreen';
import SortBook from './src/screens/FilterScreen/SortBook';
import SearchBook from './src/screens/FilterScreen/SearchBook';
import SettingInfo from './src/screens/ProfileScreen/SettingInfo'
import PersonalInfo from './src/screens/ProfileScreen/PersonalInfo.js'
import ChangePass from './src/screens/ProfileScreen/ChangePass'

console.disableYellowBox = true;
Navigation.registerComponent(
  'Home',
  () => ReducerComponent(Home),
  () => Home,
);
Navigation.registerComponent(
  'Detail',
  () => ReducerComponent(Detail),
  () => Detail,
);
Navigation.registerComponent(
  'Library',
  () => ReducerComponent(Library),
  () => Library,
);
Navigation.registerComponent(
  'Notification',
  () => ReducerComponent(Notification),
  () => Notification,
);
Navigation.registerComponent(
  'Order',
  () => ReducerComponent(Order),
  () => Order,
);
Navigation.registerComponent(
  'Profile',
  () => ReducerComponent(Profile),
  () => Profile,
);
Navigation.registerComponent(
  'Slide',
  () => ReducerComponent(Slide),
  () => Slide,
);

Navigation.registerComponent(
  'SeeAll',
  () => ReducerComponent(SeeAll),
  () => SeeAll,
);

Navigation.registerComponent(
  'SideBar',
  () => ReducerComponent(SideBar),
  () => SideBar,
);

Navigation.registerComponent(
  'Auth',
  () => ReducerComponent(Auth),
  () => Auth,
);

Navigation.registerComponent(
  'Cart',
  () => ReducerComponent(Cart),
  () => Cart,
);

Navigation.registerComponent(
  'FilterScreen',
  () => ReducerComponent(FilterScreen),
  () => FilterScreen,
);

Navigation.registerComponent(
  'SortBook',
  () => ReducerComponent(SortBook),
  () => SortBook,
);

Navigation.registerComponent(
  'SearchBook',
  () => ReducerComponent(SearchBook),
  () => SearchBook,
)

Navigation.registerComponent(
  'SettingInfo',
  () => ReducerComponent(SettingInfo),
  () => SettingInfo,
);

Navigation.registerComponent(
  'PersonalInfo',
  () => ReducerComponent(PersonalInfo),
  () => PersonalInfo,
);

Navigation.registerComponent(
  'ChangePass',
  () => ReducerComponent(ChangePass),
  () => ChangePass,
);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Slide',
      },
    },
  });
});

function ReducerComponent(Component) {
  return props => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}
