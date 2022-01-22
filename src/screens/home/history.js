import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const Section = ({children, title}) => 
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      <Text style={styles.sectionDescription}>
        {children}
      </Text>
    </View>
  

const History= () => 
    <SafeAreaView style={{backgroundColor: '#1B2234', flex:1}}>
        <View>
          <Section title="Development in progress.">
            App screen development <Text style={styles.highlight}>in progress.</Text> 
          </Section>
          
          <Section title="Check other screens">
            Check back later.
          </Section>
        </View>
    </SafeAreaView>
  


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default History;
