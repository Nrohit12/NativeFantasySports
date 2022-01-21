import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Header from './header';

function Leagues({route, navigation}) {
  const pickSquadButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Squads')}
      style={styles.button}>
      <Text style={styles.sectionTitle}>Pick Squad</Text>
    </TouchableOpacity>
  );
  const Section = ({children, title}) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{children}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <Header match={route.params} />
      <View>
        <Section title="Development in progress.">
          App screen development{' '}
          <Text style={styles.highlight}>in progress.</Text>
        </Section>

        <Section title="Check other screens">Check back later.</Section>
      </View>
      {pickSquadButton()}
    </SafeAreaView>
  );
}

export default Leagues;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1B2234',
    height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F8FCFF'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#F8FCFF'
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#0541FF',
    width: '100%',
    padding: 15,
    marginTop: 50,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
});
