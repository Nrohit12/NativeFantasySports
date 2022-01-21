import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Header from './header';
import {players} from './const';
import Toptabnavigator from './playertoptabnavigator';
import {useDispatch, useSelector} from 'react-redux';
import {setSquads, setNewSquad} from '../../redux/action';

// const squad = {
// 	"id": ,
// 	"user_id": 185542,
// 	"team_name": "Squad 1",
// 	"captain": 5910,
// 	"vice_captain": 12547,
// 	"match_id": ,
// 	"total_points": null,
// 	"squad": [],
// 	"createdAt": "2021-02-02T13:40:58.000Z",
// 	"updatedAt": "2022-01-13T14:26:12.979Z"
// }
const countNumberPlayer = (name, data) => {
  let count = 0;
  data.map(item => {
    if (item.role === name) count++;
  });
  return count;
};

function Pickcaptain({route, navigation}) {
  const match = route.params.params.match;
  const {squadsData} = useSelector(state => state.squad);
  const newSquadNumber = squadsData.length + 1;
  const dispatch = useDispatch();
  const {newSquadData} = useSelector(state => state.newSquad);

  const changeColor = (item, name) => {
    if (newSquadData[name] === item.player_id) return true;
  };
  const changeCaptain = item => {
    if (newSquadData['vice_captain'] === item.player_id) return;
    else {
      newSquadData['captain'] = item.player_id;
      dispatch(setNewSquad(newSquadData));
    }
  };
  const changeViceCaptain = item => {
    if (newSquadData['captain'] === item.player_id) return;
    else {
      newSquadData['vice_captain'] = item.player_id;
      dispatch(setNewSquad(newSquadData));
    }
  };
  const handleClick = () => {
    if (newSquadData.captain === 0)
      Alert.alert('Can not proceed', 'Please select Captain', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else if (newSquadData.vice_captain === 0)
      Alert.alert('Can not proceed', 'Please select Vice Captain', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else if(squadsData.length>=10)
      Alert.alert('Can not proceed', 'Can not add more than 10 Squad', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else {
      dispatch(setSquads(newSquadData))
      navigation.navigate('Home');
    };
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '12%'}}>
          <Text style={styles.tableHead}>Team</Text>
        </View>
        <View style={{width: '53%'}}>
          <Text style={[styles.tableHead]}>Player</Text>
        </View>
        <View style={{width: '15%'}}>
          <Text style={[styles.tableHead]}>Points</Text>
        </View>
        <View style={{width: '10%'}}>
          <Text style={[styles.tableHead]}>2x</Text>
        </View>
        <View style={{width: '10%'}}>
          <Text style={[styles.tableHead]}>1.5x</Text>
        </View>
      </View>
    );
  };

  const renderPlayers = ({item, index}) => {
    return (
      <View key={index} style={styles.playerItem}>
        <View style={{width: '12%', marginLeft: 5}}>
          <Image style={styles.trophyStyle} source={{uri: item.team_logo}} />
        </View>
        <View style={{width: '53%'}}>
          <Text style={[styles.tableBody]}>{item.short_name}</Text>
        </View>
        <View style={{width: '15%'}}>
          <Text style={[styles.tableBody]}>{item.event_total_points}</Text>
        </View>
        <View style={{width: '10%'}}>
          <TouchableOpacity
            style={[
              changeColor(item, 'captain')
                ? {backgroundColor: 'green'}
                : {backgroundColor: '#92A9BD'},
              {width: '80%', alignItems: 'center'},
            ]}
            onPress={() => changeCaptain(item)}>
            <Text style={[styles.tableBody]}>{item.event_player_credit}</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '10%'}}>
          <TouchableOpacity
            style={[
              changeColor(item, 'vice_captain')
                ? {backgroundColor: 'green'}
                : {backgroundColor: '#92A9BD'},
              {width: '80%', alignItems: 'center'},
            ]}
            onPress={() => changeViceCaptain(item)}>
            <Text style={[styles.tableBody]}>{item.event_player_credit}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const createSquadButton = () => (
    <TouchableOpacity onPress={() => handleClick()} style={styles.button}>
      <Text style={styles.tableHead}>Create Squad</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Header match={route.params.params.match} />
      <View style={{padding: 8, alignItems: 'center'}}>
        <Text style={{color: '#F8FCFF', fontWeight: '500', fontSize: 12}}>
          Select Captain = 2x Bonus and Vice-Captain = 1.5x Bonus
        </Text>
      </View>
      {renderHeader()}
      <FlatList
        data={newSquadData['squad']}
        renderItem={renderPlayers}
        keyExtractor={item => item.id}
        nestedScrollEnabled={true}
      />
      {createSquadButton()}
    </SafeAreaView>
  );
}

export default Pickcaptain;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1B2234',
    height: '100%',
  },
  tableHead: {
    color: '#F8FCFF',
    fontWeight: '800',
    fontSize: 16,
    padding: 2,
  },
  tableBody: {
    color: '#F8FCFF',
    fontWeight: '500',
    fontSize: 14,
    padding: 2,
  },
  trophyStyle: {
    width: 25,
    height: 25,
  },
  playerItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
    marginVertical: 3,
  },

  button: {
    backgroundColor: '#0041FF',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});
