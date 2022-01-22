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
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Header from './header';
import {players} from './const';
import Toptabnavigator from './playertoptabnavigator';
import {useDispatch, useSelector} from 'react-redux';
import {setNewSquad, setPlayers} from '../../redux/action';

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

function Picksquad({route, navigation}) {
  const match = route.params.params.match;
  const {squadsData} = useSelector(state => state.squad);
  const newSquadNumber = squadsData.length + 1;
  const dispatch = useDispatch();
  const {newSquadData} = useSelector(state => state.newSquad);
  const {loading} = useSelector(state => state.allPlayers);
  useEffect(() => {
    Object.assign(newSquadData, {
      event_id: 56,
      captain_id: 0,
      vice_captain_id: 0,
      match_id: match.id,
      event_id: 1,
      squad:[]
    });
    dispatch(setPlayers(match.id));
  }, []);

  const countCredit = () => {
    let count = 0;
    newSquadData.squad.map(item => {
      count += item.event_player_credit;
    });
    return 100 - count;
  };

  const countTeamPlayers = name => {
    let count = 0;
    newSquadData.squad.map(item => {
      if (item.team_short_name === name) count++;
    });
    return count;
  };

  const checkSquad = () => {
    if (countNumberPlayer('Batsman', newSquadData.squad) < 3)
      Alert.alert('Can not proceed', 'Please select minimun 3 Batsman', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else if (countNumberPlayer('Bowler', newSquadData.squad) < 3)
      Alert.alert('Can not proceed', 'Please select minimun 3 Bowler', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else if (countNumberPlayer('Wicket-Keeper', newSquadData.squad) < 1)
      Alert.alert('Can not proceed', 'Please select minimun 1 Wicket Keeper', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else if (newSquadData['squad'].length < 11)
      Alert.alert('Can not proceed', 'Please select minimun 11 Players', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else navigation.navigate('Pickcaptain');
  };

  const renderBottom = () => {
    return (
      <View style={styles.bottomView}>
        <View style={styles.singleViews}>
          <Text style={styles.tableHead}>
            {newSquadData['squad'] === undefined
              ? '0'
              : newSquadData['squad'].length}
            /11
          </Text>
          <Text style={{color: 'white'}}>Players</Text>
          <View style={styles.redBar}></View>
        </View>
        <View style={styles.singleViews}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.trophyStyle} source={{uri: match.t1_image}} />
            <Text style={styles.tableHead}>
              {newSquadData['squad'] === undefined
                ? '0'
                : countTeamPlayers(match.t1_short_name)}
            </Text>
          </View>
          <Text style={{color: 'white'}}>{match.t1_short_name}</Text>
          <View style={styles.redBar}></View>
        </View>
        <View style={styles.singleViews}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.trophyStyle} source={{uri: match.t2_image}} />
            <Text style={styles.tableHead}>
              {newSquadData['squad'] === undefined
                ? '0'
                : countTeamPlayers(match.t2_short_name)}
            </Text>
          </View>
          <Text style={{color: 'white'}}>{match.t2_short_name}</Text>
          <View style={styles.redBar}></View>
        </View>
        <View style={styles.singleViews}>
          <Text style={styles.tableHead}>
            {newSquadData['squad'] === undefined ? '100' : countCredit()}
          </Text>
          <Text style={{color: 'white'}}>Cr Left</Text>
          <View style={styles.redBar}></View>
        </View>
        <TouchableOpacity
          style={styles.squadPreview}
          onPress={() => checkSquad()}>
          <Text style={styles.tableHead}>Squad</Text>
          <Text style={{color: 'white'}}>Preview</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Header match={route.params.params.match} />
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" style={{margin: 200}} />
      ) : (
        <Toptabnavigator match={match} />
      )}
      {renderBottom()}
    </SafeAreaView>
  );
}

export default Picksquad;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1B2234',
    height: '100%',
  },
  tableHead: {
    color: '#F8FCFF',
    fontWeight: '800',
    fontSize: 18,
    padding: 2,
  },
  tableBody: {
    color: '#F8FCFF',
    fontWeight: '500',
    fontSize: 16,
    padding: 2,
  },
  trophyStyle: {
    width: 25,
    height: 25,
  },
  bottomView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#263560',
    height: 70,
    width: '100%',
  },
  singleViews: {
    justifyContent: 'center',
    width: '20%',
    alignItems: 'center',
  },
  redBar: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    width: '90%',
    position: 'absolute',
    bottom: 0,
  },
  squadPreview: {
    backgroundColor: 'rgba(0,206,35,0.8)',
    justifyContent: 'center',
    width: '20%',
    alignItems: 'center',
  },
});
