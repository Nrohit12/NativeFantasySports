import React, {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import { Picksquad as PicksquadScreen, Pickcaptain as PickcaptainScreen} from '../screens';

const Stack = createStackNavigator();

export default function(props) {
   
  return (
    <Stack.Navigator  
      initialRouteName="Picksquad"
      screenOptions={{
        headerMode: 'none',
      }}  
    >
      <Stack.Screen name="Picksquad" component={PicksquadScreen} initialParams={props.route}/>
      <Stack.Screen name="Pickcaptain" component={PickcaptainScreen} initialParams={props.route}/>
    </Stack.Navigator>
  );
}