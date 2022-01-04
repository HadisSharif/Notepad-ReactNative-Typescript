import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';
import {navigationRef} from './navigation/Navigate';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
