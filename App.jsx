// App.js
import {StyleSheet, Text, View} from 'react-native';
import React, { useContext } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import {NavigationContainer} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import Loan from './src/screens/Loan';
import LoanIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyPG from './src/screens/MyPG';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Loan" component={Loan} />
      <Stack.Screen name="MyPG" component={MyPG} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarStyle: {
          height: 55,
          backgroundColor: theme.colors.tabBar,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.text,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <AntDesign name="home" size={22} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Loan"
        component={Loan}
        options={{
          tabBarIcon: ({color}) => (
            <LoanIcon name="hand-coin" size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <Octicons name="search" size={22} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="My PG"
        component={MyPG}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="hotel" size={22} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="user" size={22} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});