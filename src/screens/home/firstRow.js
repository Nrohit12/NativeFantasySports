import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {trophy} from '../../assets/images';

const FirstRow = ({item, index}) => (
  <View style={[styles.container, {backgroundColor: item.color}]}>
    <View>
      <Text style={[styles.league, styles.text]}> {item.league}</Text>
      <Text style={styles.name}> {item.name}</Text>
      <Text style={styles.text}> {item.rivals}</Text>
      <Text style={styles.text}>
        Today <Text style={{fontSize: 18}}>{item.time}</Text>
      </Text>
    </View>
    <Image style={styles.trophyStyle} source={trophy} />
  </View>
);

export const renderFirstRow = ({item, index}) => (
  <FirstRow item={item} key={index} />
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
  },
  text: {
    color: '#F8FCFF',
    padding: 2,
    marginVertical: 2,
    fontWeight: '400',
  },
  league: {
    backgroundColor: '#00000050',
    fontSize: 16,
  },
  name: {
    fontSize: 20,
    color: '#FFEEAD',
    marginVertical: 5,
    fontWeight: '600',
  },
  trophyStyle: {
    height: 100,
    width: 60,
  },
});
