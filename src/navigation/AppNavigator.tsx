import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import DetailScreen from '../screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{
        title: '홈',
        headerStyle: {backgroundColor: '#2C3E50'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        title: '작품 상세',
        headerStyle: {backgroundColor: '#2C3E50'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchMain"
      component={SearchScreen}
      options={{
        title: '검색',
        headerStyle: {backgroundColor: '#2C3E50'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        title: '작품 상세',
        headerStyle: {backgroundColor: '#2C3E50'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
    />
  </Stack.Navigator>
);

const BookmarksStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BookmarksMain"
      component={BookmarksScreen}
      options={{
        title: '북마크',
        headerStyle: {backgroundColor: '#2C3E50'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
    />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        title: '작품 상세',
        headerStyle: {backgroundColor: '#2C3E50'},
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3498DB',
          tabBarInactiveTintColor: '#95A5A6',
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: '홈',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarLabel: '검색',
          }}
        />
        <Tab.Screen
          name="Bookmarks"
          component={BookmarksStack}
          options={{
            tabBarLabel: '북마크',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;