import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {dva} from '../../assets/images';
import {renderFirstRow} from './firstRow';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {firstRowItems} from './const';
import {renderCricketRow} from './cricketRow';

import {setMatch} from '../../redux/action';

const matchImages = {
  cricket: {
    label: 'Fantasy Cricket',
    key: 'cricket',
    image: require('../../assets/media/cricket.png'),
  },
  football: {
    label: 'Fantasy Football',
    key: 'football',
    image: require('../../assets/media/football.jpg'),
  },
};

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
  const dispatch = useDispatch();
  const {loading, matchData} = useSelector(state => state.allMatch);

  useEffect(() => {
    dispatch(setMatch());
  }, []);

  return (
    <ScrollView style={styles.backgroundStyle}>
      {header()}

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" style={{margin:200}}/>
      ) : (
        <View>
          <FlatList
            data={firstRowItems}
            renderItem={renderFirstRow}
            keyExtractor={item => item.name}
            nestedScrollEnabled={true}
            horizontal={true}
          />
          {matchData.order.map((item, index) => (
            <View key={index}>
              {index < 2 ? (
                <View>
                  <View style={styles.matchViews}>
                    <Image
                      style={styles.matchImageStyle}
                      source={matchImages[item].image}
                    />
                    <Text style={styles.userName}>
                      {matchImages[item].label}
                    </Text>
                  </View>
                  <FlatList
                    data={matchData.matches[item]}
                    renderItem={renderCricketRow}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={true}
                    horizontal={true}
                  />
                </View>
              ) : null}
            </View>
          ))}
        </View>
      )}
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
