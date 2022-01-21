import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dateDiff from '../../functions/dateDiff'

const CricketRow = ({item, index}) => {
  const navigation = useNavigation();

  const handleClick = () =>
    navigation.navigate('Match', {
      match: item,
    });
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleClick()}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Image style={styles.trophyStyle} source={{uri: item.t1_image}} />
          <Text style={styles.rivals}>{item.t1_short_name}</Text>
        </View>
        <Text style={styles.text}> vs</Text>
        <View style={styles.headerItem}>
          <Image style={styles.trophyStyle} source={{uri: item.t2_image}} />
          <Text style={styles.rivals}>{item.t2_short_name}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.text,
          {
            marginTop: 20,
            marginHorizontal: 2,
          },
        ]}>
        {item.event_name}
      </Text>
      <Text style={styles.league}>
        {Math.floor(dateDiff(item.match_date) / 60)} h {Math.floor(dateDiff(item.match_date) % 60)} m
      </Text>
    </TouchableOpacity>
  );
};

export const renderCricketRow = ({item, index}) => (
  <CricketRow item={item} key={index} />
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#263560',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  headerItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  text: {
    color: '#94a2c5',
    padding: 2,
    marginHorizontal: 15,
    fontWeight: '400',
  },
  league: {
    backgroundColor: '#00000050',
    fontSize: 16,
    position: 'absolute',
    right: 0,
    bottom: 5,
    borderRadius: 5,
    color: '#F8FCFF',
    padding: 5,
  },
  rivals: {
    fontSize: 20,
    color: '#F8FCFF',
    fontWeight: '600',
  },
  trophyStyle: {
    height: 60,
    width: 50,
    position: 'absolute',
    top: -30,
  },
});
