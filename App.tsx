/**
 * LibrarianK - AI-powered unified digital library
 * Demo MVP App
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
