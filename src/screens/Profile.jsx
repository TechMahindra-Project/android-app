import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Profile = ({navigation}) => {
  const theme = useContext(ThemeContext);

  // Dynamic colors
  const iconBackground = theme.isDarkMode
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.05)';

  const cardShadow = theme.isDarkMode
    ? {}
    : {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      };

  const handleReferFriend = () => {
    Alert.alert(
      'Refer a Friend',
      'Share your referral code with friends and earn rewards!',
      [
        {
          text: 'Copy',
          onPress: () => {
            // Implement copy to clipboard functionality
            Alert.alert('Copied', 'Your referral code has been copied!');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View style={styles.container}>
        {/* Profile Header */}
        <View
          style={[
            styles.cardContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <View style={styles.profileSection}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}>A</Text>
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={[styles.profileName, {color: theme.colors.text}]}>
                Ayush Singla
              </Text>
              <Text style={[styles.profileEmail, {color: theme.colors.text}]}>
                vchu6419@gmail.com
              </Text>
            </View>
          </View>
        </View>

        {/* Premium Banner */}
        <TouchableOpacity
          style={[
            styles.premiumBanner,
            cardShadow,
            {backgroundColor: theme.isDarkMode ? 'rgba(255, 215, 0, 0.7)' : '#FFD700'},
          ]}
          onPress={() => Alert.alert('Premium', 'Unlock exclusive features!')}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumIconContainer}>
              <Ionicons
                name="diamond"
                size={24}
                color={theme.isDarkMode ? '#000' : '#8B4513'}
              />
            </View>
            <View style={styles.premiumTextContainer}>
              <Text
                style={[
                  styles.premiumTitle,
                  {color: theme.isDarkMode ? '#000' : '#8B4513'},
                ]}>
                Upgrade to Premium
              </Text>
              <Text
                style={[
                  styles.premiumSubtitle,
                  {color: theme.isDarkMode ? '#333' : '#5D3A00'},
                ]}>
                Unlock all exclusive features
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color={theme.isDarkMode ? '#000' : '#8B4513'}
            />
          </View>
        </TouchableOpacity>

        {/* Theme Toggle */}
        <View
          style={[
            styles.cardContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <View style={styles.rowContainer}>
            <View style={styles.iconTextContainer}>
              <View
                style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
                {theme.isDarkMode ? (
                  <MaterialCommunityIcons
                    name="weather-night"
                    size={20}
                    color={theme.colors.text}
                  />
                ) : (
                  <Ionicons name="sunny" size={20} color={theme.colors.text} />
                )}
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                {theme.isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Switch
              value={theme.isDarkMode}
              onValueChange={theme.toggleTheme}
              thumbColor={theme.isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              trackColor={{false: '#767577', true: '#81b0ff'}}
            />
          </View>
        </View>

        {/* Money Section */}
        <View
          style={[
            styles.cardContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <View style={styles.iconTextContainer}>
            <View
              style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
              <FontAwesome name="rupee" size={20} color={theme.colors.text} />
            </View>
            <Text style={[styles.cardText, {color: theme.colors.text}]}>
              Balance
            </Text>
          </View>
          <Text style={[styles.amountText, {color: theme.colors.text}]}>
            ₹0
          </Text>
        </View>

        {/* Saved Section */}
        <View
          style={[
            styles.cardContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <View style={styles.iconTextContainer}>
            <View
              style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
              <FontAwesome
                name="bookmark"
                size={20}
                color={theme.colors.text}
              />
            </View>
            <Text style={[styles.cardText, {color: theme.colors.text}]}>
              Saved Items
            </Text>
          </View>
          <Text style={[styles.countText, {color: theme.colors.text}]}>
            No Items
          </Text>
        </View>

        {/* Refer a Friend Section */}
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}
          onPress={handleReferFriend}>
          <View style={styles.iconTextContainer}>
            <View
              style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
              <MaterialIcons
                name="person-add"
                size={20}
                color={theme.colors.text}
              />
            </View>
            <Text style={[styles.cardText, {color: theme.colors.text}]}>
              Refer a Friend
            </Text>
          </View>
          <View style={styles.referralBadge}>
            <Text style={styles.referralBadgeText}>Earn upto ₹100</Text>
          </View>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <View style={styles.iconTextContainer}>
            <View
              style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
              <FontAwesome name="gear" size={20} color={theme.colors.text} />
            </View>
            <Text style={[styles.cardText, {color: theme.colors.text}]}>
              Settings
            </Text>
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.actionButton, {borderColor: '#e53935'}]}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure?', [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Logout', onPress: () => Alert.alert('Logged out')},
            ])
          }>
          <Ionicons name="log-out-outline" size={24} color="#e53935" />
          <Text style={[styles.actionText, {color: '#e53935'}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '600',
  },
  countText: {
    fontSize: 16,
    opacity: 0.6,
  },
  premiumBanner: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  premiumSubtitle: {
    fontSize: 12,
    opacity: 0.9,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  referralBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  referralBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Profile;
