import React from 'react';
import type {Node} from 'react';
import {SafeAreaView} from 'react-native';
import {RootNavigator} from './navigators';
import {Provider} from 'react-redux';
import store from './redux/store';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
