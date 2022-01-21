import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Header from './header';
import {createsquads} from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';

function Squads({route, navigation}) {
  const {squadsData} = useSelector(state => state.squad);
  const numColumns = 2;

  const getName = (name, item) => {
    let temp = item['squad'].filter(squad => item[name] === squad.player_id);
    return temp[0].short_name;
  };

  const getImage = (name, item) => {
    let temp = item['squad'].filter(squad => item[name] === squad.player_id);
    return temp[0].team_logo;
  };

  const renderSquads = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.squadView}>
        <View style={{borderBottomWidth: 1, padding: 5}}>
          <Text style={{fontWeight: '600', fontSize: 18}}>
            {item.team_name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Image
            source={{uri: getImage('captain', item)}}
            style={{height: 15, width: 15}}
          />
          <Text style={{fontWeight: '600', fontSize: 14, paddingHorizontal: 4}}>
            {getName('captain', item)}
          </Text>
          <Text style={{backgroundColor: 'blue'}}>C</Text>
        </View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <Image
            source={{uri: getImage('vice_captain', item)}}
            style={{height: 15, width: 15}}
          />
          <Text style={{fontWeight: '600', fontSize: 14, paddingHorizontal: 4}}>
            {getName('vice_captain', item)}
          </Text>
          <Text style={{backgroundColor: 'green'}}>VC</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleClick = () => {
    if (squadsData.length >= 10)
      Alert.alert('Can not create', 'You can not add more than 10 squad', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    else
      navigation.navigate('Picksquads', {
        match: route.params,
      });
  };
  const createSquadButton = () => (
    <TouchableOpacity onPress={() => handleClick()} style={styles.button}>
      <Text style={styles.sectionTitle}>Create Squad</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Header match={route.params} />
      {squadsData.length === 0 ? (
        <View style={styles.noSquadView}>
          <Image source={createsquads} style={styles.createsquadimageStyle} />
          <Text style={styles.createsquadtextStyle}>
            You haven't created any squad yet, create one to continue
          </Text>
        </View>
      ) : (
        <View style={{flex: 1, alignItems:'center'}}>
          <View style={{marginTop: 10, padding: 10, alignItems: 'center'}}>
            <Text style={{color: 'white'}}>
              <Text style={{color: 'red', fontWeight: '800', fontSize: 20}}>
                {squadsData.length}
              </Text>
              /10 Squads added
            </Text>
          </View>
          <FlatList
            numColumns={numColumns}
            data={squadsData}
            renderItem={renderSquads}
          />
        </View>
      )}
      {createSquadButton()}
    </SafeAreaView>
  );
}

export default Squads;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1B2234',
    height: '100%',
  },
  noSquadView: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 60,
  },
  createsquadimageStyle: {
    height: 150,
    width: 300,
  },
  createsquadtextStyle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#F8FCFF',
    marginTop: 20,
    width: 300,
  },
  squadView: {
    borderWidth: 1,
    borderColor: 'blue',
    alignSelf: 'center',
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FCFF',
  },
  button: {
    backgroundColor: '#0041FF',
    width: '60%',
    padding: 8,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
