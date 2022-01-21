import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';
import {Leagues as LeaguesScreen, History as HistoryScreen, Squads as SquadsScreen} from '../screens';
import {StyleSheet} from 'react-native';
// import SquadsScreen from "./matchstacknavigator";

import { leagues, lobby, add, joined, squads } from "../assets/images";

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: 'Leagues',
    screen: LeaguesScreen,
    label: 'Leagues',
    icon: leagues,
  },
  {
    name: 'Lobby',
    screen: HistoryScreen,
    label: 'Lobby',
    icon: lobby,
  },
  {
    name: 'Add',
    screen: HistoryScreen,
    label: 'Add',
    icon: add,
  },
  {
    name: 'Joined',
    screen: HistoryScreen,
    label: 'Joined',
    icon: joined,
  },
  {
    name: 'Squads',
    screen: SquadsScreen,
    label: 'My Squads',
    icon: squads,
  },
];

export default function (props) {
  return (
    <Tab.Navigator
      initialRouteName="Leagues"
      screenOptions={{
        tabBarInactiveTintColor: '#91A1BB',
        tabBarActiveTintColor: '#F8FCFF',
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: {fontSize: 15},
      }}
      shifting="false">
      {tabs.map(tab => (
        <Tab.Screen
          name={tab.name}
          component={tab.screen}
          initialParams={props.route.params.match}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({color, size}) => 
              <IconButton color={color} icon={tab.icon} size={size} />
            
          }}
          key={tab.name}
        />
      ))}   
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#263560',
    padding: 5,
    height: 60,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
