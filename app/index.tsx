import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContentCardsScreen from './ContentCardsScreen';

export default function Index() {
  // ContentCardsScreen now handles platform-specific surface selection internally
  return (
    <SafeAreaView style={styles.container}>
      <ContentCardsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
