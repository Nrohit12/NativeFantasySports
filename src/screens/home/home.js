import React, {useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, Image} from 'react-native';
import {dva} from '../../assets/images';
import {renderFirstRow} from './firstRow';
import {FlatList} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux";
import {firstRowItems, getMatches} from './const';
import {renderCricketRow} from './cricketRow';

import {setMatch} from '../../redux/action'

const matchImages = [
  {
    label: 'Fantasy Cricket',
    key: 'cricket',
    image: require('../../assets/media/cricket.png'),
  },
  {
    label: 'Fantasy Football',
    key: 'football',
    image: require('../../assets/media/football.jpg'),
  },
];

const header = () => (
  <View style={styles.header}>
    <Image style={styles.avatarStyle} source={dva} />
    <View style={styles.textView}>
      <Text style={styles.userName}>dva203</Text>
      <Text style={styles.belowUserName}>
        you need 20 <Text style={styles.xp}>XP</Text> to get{' '}
        <Text style={styles.rupees}> ₹10</Text>
      </Text>
    </View>
    <View style={styles.help}>
      <Text style={styles.ask}>? Help</Text>
    </View>
  </View>
);

export default function () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setMatch())
  }, []);
  

  return (
    <ScrollView style={styles.backgroundStyle}>
      {header()}
      <View>
        <FlatList
          data={firstRowItems}
          renderItem={renderFirstRow}
          keyExtractor={item => item.name}
          nestedScrollEnabled={true}
          horizontal={true}
        />
      </View>

      {matchImages.map(item => (
        <View key={item.key}>
          <View style={styles.matchViews}>
            <Image style={styles.matchImageStyle} source={item.image} />
            <Text style={styles.userName}>{item.label}</Text>
          </View>
          
          <FlatList
            data={getMatches.matches['cricket']}
            renderItem={renderCricketRow}
            keyExtractor={item => item.id}
            nestedScrollEnabled={true}
            horizontal={true}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1B2234',
  },
  header: {
    marginVertical: 20,
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
  },
  avatarStyle: {
    borderRadius: 55,
    height: 55,
    width: 55,
  },
  textView: {
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  userName: {
    color: '#F8FCFF',
    fontSize: 20,
    fontWeight: '500',
  },
  belowUserName: {
    color: '#F8FCFF',
    fontSize: 15,
    marginVertical: 5,
  },
  xp: {
    color: 'red',
  },
  rupees: {
    color: 'yellow',
  },
  help: {
    position: 'absolute',
    right: 5,
    top: 18,
  },
  ask: {
    color: 'yellow',
    fontSize: 15,
  },
  matchViews: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 30,
    alignItems: 'center',
  },
  matchImageStyle: {
    borderRadius: 40,
    height: 40,
    width: 40,
    marginRight: 15,
  },
});
