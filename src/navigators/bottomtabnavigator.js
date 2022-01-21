import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconButton} from 'react-native-paper';
import {Home as HomeScreen, History as HistoryScreen} from '../screens';
import {StyleSheet} from 'react-native';

import { play, history, chat, wallet, others } from "../assets/images";

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: 'Play',
    screen: HomeScreen,
    label: 'Play',
    icon: play,
  },
  {
    name: 'History',
    screen: HistoryScreen,
    label: 'History',
    icon: history,
  },
  {
    name: 'Chat',
    screen: HistoryScreen,
    label: 'Chat',
    icon: chat,
  },
  {
    name: 'Wallet',
    screen: HistoryScreen,
    label: 'Wallet',
    icon: wallet,
  },
  {
    name: 'Others',
    screen: HistoryScreen,
    label: 'Others',
    icon: others,
  },
];

export default function () {
  return (
    <Tab.Navigator
      initialRouteName="Play"
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
