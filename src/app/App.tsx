import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Index} from './navigation';
import {navigationRef} from './navigation/Navigate';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Index />
    </NavigationContainer>
  );
};

export default App;
