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
          <Text style={styles.teamText}>
            Pick Squad
          </Text>
          <Text style={[styles.text, {backgroundColor: 'green'}]}>
            {Math.floor(dateDiff(match.match_date) / 60)} h{' '}
            {Math.floor(dateDiff(match.match_date) % 60)} m
          </Text>
        </View>
        
     
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  team: {
    alignItems: 'center',
    marginHorizontal: 80,
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
