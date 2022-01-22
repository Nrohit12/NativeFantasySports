import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Playerlist from './tabDetails';
import {useDispatch, useSelector} from 'react-redux';

// function Details (props) {

//   useEffect(() => {

//     if(props.route.name =="Bat")
//     console.log(props.route.params)

//   }, [])

//   return <View><Text>{JSON.stringify(props.route.players)}</Text></View>
// }

const Tab = createMaterialTopTabNavigator();

export default function TopTabnavigator({match}) {

  const {playerData, loading} = useSelector(state => state.allPlayers);
  const batsman = playerData.filter(player => player.role === 'Batsman');
  const wicket_keeper = playerData.filter(
    player => player.role === 'Wicket-Keeper',
  );
  const bowler = playerData.filter(player => player.role === 'Bowler');
  const all_rounder = playerData.filter(player => player.role === 'All-Rounder');

  return (
    <Tab.Navigator
      initialRouteName="BAT"
      screenOptions={{
        tabBarActiveTintColor: '#F8FCFF',
        tabBarLabelStyle: {fontSize: 15},
        tabBarStyle: {backgroundColor: '#263560'},
        pressOpacity: 1,
      }}>
      <Tab.Screen
        name="BAT"
        component={Playerlist}
        options={{tabBarLabel: 'BAT'}}
        initialParams={{players: batsman, match: match}}
      />
      <Tab.Screen
        name="WK"
        component={Playerlist}
        options={{tabBarLabel: 'WK'}}
        initialParams={{players: wicket_keeper, match: match}}
      />
      <Tab.Screen
        name="AR"
        component={Playerlist}
        options={{tabBarLabel: 'AR'}}
        initialParams={{players: all_rounder, match: match}}
      />
      <Tab.Screen
        name="BOWL"
        component={Playerlist}
        options={{tabBarLabel: 'BOWL'}}
        initialParams={{players: bowler, match: match}}
      />
    </Tab.Navigator>
  );
}
