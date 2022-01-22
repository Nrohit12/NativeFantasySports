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
import {useDispatch, useSelector} from 'react-redux';
import {setNewSquad} from '../../redux/action';

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

const routeName = name => {
  switch (name) {
    case 'BAT':
      return '3-7 Batsman';
    case 'BOWL':
      return '3-7 Bowler';
    case 'WK':
      return '1-5 Wicket Keeper';
    case 'AR':
      return '0-4 All Rounder';
    default:
      return;
  }
};

const checkTeamPlayers = (data, t1_name, t2_name, selection) => {
  let count1 = 0,
    count2 = 0;
  data.map(item => {
    item.team_short_name == t1_name ? count1++ : count2++;
  });
  return (
    (selection.team_short_name === t1_name && count1 >= 7) ||
    (selection.team_short_name === t2_name && count2 >= 7)
  );
};
const checkCredit = (data, item) => {
  let count = item.event_player_credit;
  data.map(item => {
    count += item.event_player_credit;
  });
  return count >= 100;
};
const countNumberPlayer = (name, data) => {
  let count = 0;
  data.map(item => {
    if (item.role === name) count++;
  });
  return count;
};

const checkNumber = (routeName, data) => {
  switch (routeName) {
    case 'BAT': {
      if (data.length >= 11) return true;
      if (countNumberPlayer('Batsman', data) >= 7) return true;
    }
    case 'BOWL': {
      if (data.length >= 11) return true;
      if (countNumberPlayer('Bowler', data) >= 7) return true;
    }
    case 'WK': {
      if (data.length >= 11) return true;
      if (countNumberPlayer('Wicket-Keeper', data) >= 5) return true;
    }
    case 'AR': {
      if (data.length >= 11) return true;
      if (countNumberPlayer('All-Rounder', data) > 4) return true;
    }
    default:
      return;
  }
};

function PlayerList({route, navigation}) {
  const {match, players} = route.params;
  const {squadsData} = useSelector(state => state.squad);
  
  const newSquadNumber = squadsData.length + 1;
  const dispatch = useDispatch();
  const {newSquadData} = useSelector(state => state.newSquad);

  const changeColor = item => {
    if (newSquadData['squad'] === undefined) return false;
    else return newSquadData['squad'].includes(item);
  };
  const handleClick = item => {
    if (newSquadData['squad'].includes(item)) {
      newSquadData['squad'].splice(newSquadData['squad'].indexOf(item), 1);
    } else if (
      checkTeamPlayers(
        newSquadData.squad,
        match.t1_short_name,
        match.t2_short_name,
        item,
      )
    )
      Alert.alert(
        'Can not add to Squad',
        'Please select only 7 players from one team',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    else if (checkNumber(route.name, newSquadData.squad))
      Alert.alert(
        'Can not add to Squad',
        'Add 3-7 Batsman, 0-4 All-Rounder, 3-7 Bowler and 1-5 Wicket keeper and not more than 11 players',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    else if (checkCredit(newSquadData.squad, item))
      Alert.alert(
        'Can not add to Squad',
        'Choose another player with low credit or select other combination',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    else {
      newSquadData['squad'].push(item);
    }
    dispatch(setNewSquad(newSquadData));
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '15%'}}>
          <Text style={styles.tableHead}>Team</Text>
        </View>
        <View style={{width: '59%'}}>
          <Text style={[styles.tableHead]}>Player</Text>
        </View>
        <View style={{width: '15%'}}>
          <Text style={[styles.tableHead]}>Points</Text>
        </View>
        <View style={{width: '11%'}}>
          <Text style={[styles.tableHead]}>Cr</Text>
        </View>
      </View>
    );
  };
  const renderPlayers = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.playerItem,
          changeColor(item)
            ? {backgroundColor: 'rgba(0,206,35,0.8)'}
            : {backgroundColor: 'rgba(15,29,41,0.8)'},
        ]}
        onPress={() => handleClick(item)}>
        <View style={{width: '15%', marginLeft: 5}}>
          <Image style={styles.trophyStyle} source={{uri: item.team_logo}} />
        </View>
        <View style={{width: '59%'}}>
          <Text style={[styles.tableBody]}>{item.short_name}</Text>
        </View>
        <View style={{width: '15%'}}>
          <Text style={[styles.tableBody]}>{item.event_total_points}</Text>
        </View>
        <View style={{width: '11%'}}>
          <Text style={[styles.tableBody]}>{item.event_player_credit}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={{padding: 15}}>
        <Text style={{color: '#F8FCFF', fontWeight: '900', fontSize: 20}}>
          Pick {routeName(route.name)}
        </Text>
      </View>
      {renderHeader()}

      <FlatList
        data={players}
        renderItem={renderPlayers}
        keyExtractor={item => item.id}
        nestedScrollEnabled={true}
      />
    </SafeAreaView>
  );
}

export default PlayerList;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1B2234',
    height: '100%',
  },
  playerItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
    marginVertical: 3,
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
});
