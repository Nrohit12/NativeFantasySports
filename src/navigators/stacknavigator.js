import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Home} from '../screens'
import Bottomtabs  from "./bottomtabnavigator";
import Match from './matchbottomtabnavigator'
import Picksquad from './picksquadnavigator'

const Stack = createStackNavigator();

export default function() {
  return (
    <Stack.Navigator  
      screenOptions={{
        headerMode: 'none',
      }}  
    >
      <Stack.Screen name="Tabs" component={Bottomtabs} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Match" component={Match} />
      <Stack.Screen name="Picksquads" component={Picksquad} />
    </Stack.Navigator>
  );
}