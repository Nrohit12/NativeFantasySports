import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {left} from '../../assets/images';
import dateDiff from '../../functions/dateDiff';

function Header({match}) {
  return (
    <View style={styles.container}>
      <IconButton icon={left} color="#F8FCFF" />
      <View style={styles.team}>
        <Image source={{uri: match.t1_image}} style={styles.flagStyle} />
        <View>
          <Text style={styles.teamText}>
            {match.t1_short_name} <Text style={styles.text}>vs</Text>{' '}
            {match.t2_short_name}
          </Text>
          <Text style={[styles.text, {backgroundColor: 'green'}]}>
            {Math.floor(dateDiff(match.match_date) / 60)} h{' '}
            {Math.floor(dateDiff(match.match_date) % 60)} m
          </Text>
        </View>
        <Image source={{uri: match.t2_image}} style={styles.flagStyle} />
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  flagStyle: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  team: {
    alignItems: 'center',
    marginHorizontal: 50,
    flexDirection: 'row',
  },
  teamText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F8FCFF'
  },
  text: {
    fontSize: 15,
    color: '#F8FCFF'
  },
});
