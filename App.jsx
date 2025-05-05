import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoanIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Loan from './src/screens/Loan';
import MyPG from './src/screens/MyPG';
import RewardsScreen from './src/screens/RewardsScreen';
import ContactSupportScreen from './src/screens/ContactSupportScreen';
import PremiumScreen from './src/screens/PremiumScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsScreen from './src/screens/TermsScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Reusable stack builder
const createStack = screens => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      {screens.map(({name, component, title}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{title}}
        />
      ))}
    </Stack.Navigator>
  );
};

// Stack screens
const HomeStack = () =>
  createStack([{name: 'HomeMain', component: Home, title: 'Home'}]);
const LoanStack = () =>
  createStack([{name: 'Loan', component: Loan, title: 'Loan'}]);
const SearchStack = () =>
  createStack([{name: 'Search', component: Search, title: 'Search'}]);
const MyPGStack = () =>
  createStack([{name: 'MyPG', component: MyPG, title: 'My PG'}]);
const ProfileStack = () =>
  createStack([
    {name: 'ProfileMain', component: Profile, title: 'Profile'},
    {name: 'RewardsScreen', component: RewardsScreen, title: 'My Rewards'},
    {name: 'PremiumScreen', component: PremiumScreen, title: 'Premium User'},
    {name: 'AboutUsScreen', component: AboutUsScreen, title: 'About Us'},
    {
      name: 'PrivacyPolicyScreen',
      component: PrivacyPolicyScreen,
      title: 'Privacy Policy',
    },
    {name: 'TermsScreen', component: TermsScreen, title: 'Terms & Conditions'},
    {
      name: 'ContactSupportScreen',
      component: ContactSupportScreen,
      title: 'Contact Support',
    },
  ]);

const TabNavigator = () => {
  const theme = useContext(ThemeContext);
  const icons = {
    Home: <AntDesign name="home" size={22} />,
    Loan: <LoanIcon name="hand-coin" size={26} />,
    Search: <Octicons name="search" size={22} />,
    'My PG': <MaterialIcons name="hotel" size={22} />,
    Profile: <Feather name="user" size={22} />,
  };

  const tabs = [
    {name: 'Home', component: HomeStack},
    {name: 'Loan', component: LoanStack},
    {name: 'Search', component: SearchStack},
    {name: 'My PG', component: MyPGStack},
    {name: 'Profile', component: ProfileStack},
  ];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 10},
        tabBarStyle: {height: 55, backgroundColor: theme.colors.tabBar},
        headerShown: false,
      }}>
      {tabs.map(({name, component}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({color}) => React.cloneElement(icons[name], {color}),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const App = () => (
  <ThemeProvider>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </ThemeProvider>
);

export default App;
