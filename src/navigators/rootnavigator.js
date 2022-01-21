import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Stacknavigator from './stacknavigator';
import Bottomnavigator from './bottomtabnavigator'

export default function() {
  return (
    <NavigationContainer>
        <Stacknavigator />
    </NavigationContainer>
  );
}