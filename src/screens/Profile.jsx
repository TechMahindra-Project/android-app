import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [loanStatus, setLoanStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedItemsCount, setSavedItemsCount] = useState(0);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: 'Ayush Singla',
    email: 'vchu6419@gmail.com',
    phone: '+91 9876543210',
  });

  const navigations = useNavigation();

  const handleGamificationPress = () => {
    navigations.navigate('RewardsScreen');
  };

  const handleAboutPress = () => {
    navigations.navigate('AboutUsScreen');
  };

  const handlePremiumPress = () => {
    navigations.navigate('PremiumScreen');
  };

  const handlePrivacyPress = () => {
    navigations.navigate('PrivacyPolicyScreen');
  };

  const handleTermsPress = () => {
    navigations.navigate('TermsScreen');
  };

  const handleContactSupportPress = () => {
    navigations.navigate('ContactSupportScreen');
  };

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

  const profilePictures = [
    'https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg',
  ];

  const handleReferFriend = () => {
    Alert.alert(
      'Refer a Friend',
      'Share your referral code: PG2025AYUSH\n\nEarn ₹100 for each successful referral!',
      [
        {
          text: 'Copy',
          onPress: () =>
            Alert.alert('Copied', 'Referral code copied to clipboard!'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        onPress: () => {
          setIsLoggingOut(true);
          setTimeout(() => {
            setIsLoggedIn(false);
            setIsLoggingOut(false);
          }, 2000);
        },
      },
    ]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    Alert.alert('Welcome back!', 'You have successfully logged in.');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(prev => !prev);
    Alert.alert(
      'Notifications',
      notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled',
    );
  };

  const openEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const saveProfileChanges = () => {
    // Here you would typically send the updated data to your backend
    closeEditModal();
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoggingOut) {
    return (
      <View
        style={[
          styles.loadingContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, {color: theme.colors.text}]}>
          Logging out...
        </Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View
        style={[
          styles.loginContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <View style={styles.loginContent}>
          <View style={styles.loginIconContainer}>
            <Ionicons
              name="person-circle-outline"
              size={80}
              color={theme.colors.primary}
            />
          </View>
          <Text style={[styles.loginTitle, {color: theme.colors.text}]}>
            Welcome to Find MyPG
          </Text>
          <Text style={[styles.loginSubtitle, {color: theme.colors.text}]}>
            Login to access your bookings, preferences and more
          </Text>
          <TouchableOpacity
            style={[
              styles.loginButton,
              {backgroundColor: theme.colors.primary},
            ]}
            onPress={handleLogin}>
            <Ionicons name="log-in-outline" size={24} color="white" />
            <Text style={styles.loginButtonText}>Login / Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View style={styles.container}>
        {/* Profile Header with Edit Button */}
        <View
          style={[
            styles.cardContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <View style={styles.profileSection}>
            <View
              style={[
                styles.profileCircle,
                {backgroundColor: theme.colors.primary},
              ]}>
              <Image
                source={{
                  uri: 'https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg',
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIcon} onPress={openEditModal}>
                <Ionicons name="create-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileTextContainer}>
              <View style={styles.nameVerificationRow}>
                <Text style={[styles.profileName, {color: theme.colors.text}]}>
                  {editedProfile.name}
                </Text>
              </View>
              <Text style={[styles.profileEmail, {color: theme.colors.text}]}>
                {editedProfile.email}
              </Text>
              <Text style={[styles.profilePhone, {color: theme.colors.text}]}>
                {editedProfile.phone}
              </Text>
            </View>
          </View>
        </View>

        {/* Edit Profile Modal */}
        <Modal
          visible={isEditModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeEditModal}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContainer,
                {backgroundColor: theme.colors.card},
              ]}>
              <Text style={[styles.modalTitle, {color: theme.colors.text}]}>
                Edit Profile
              </Text>

              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, {color: theme.colors.text}]}>
                  Full Name
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  value={editedProfile.name}
                  onChangeText={text => handleInputChange('name', text)}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, {color: theme.colors.text}]}>
                  Email
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  value={editedProfile.email}
                  onChangeText={text => handleInputChange('email', text)}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, {color: theme.colors.text}]}>
                  Phone Number
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                      borderColor: theme.colors.border,
                    },
                  ]}
                  value={editedProfile.phone}
                  onChangeText={text => handleInputChange('phone', text)}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    {borderColor: theme.colors.border},
                  ]}
                  onPress={closeEditModal}>
                  <Text style={[styles.buttonText, {color: theme.colors.text}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.saveButton,
                    {backgroundColor: theme.colors.primary},
                  ]}
                  onPress={saveProfileChanges}>
                  <Text style={[styles.buttonText, {color: 'white'}]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Premium Banner */}
        <TouchableOpacity
          style={[
            styles.premiumBanner,
            cardShadow,
            {
              backgroundColor: theme.isDarkMode
                ? 'rgba(255, 215, 0, 0.7)'
                : '#FFD700',
            },
          ]}
          onPress={handlePremiumPress}>
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
                Upgrade to premium
              </Text>
              <Text
                style={[
                  styles.premiumSubtitle,
                  {color: theme.isDarkMode ? '#333' : '#5D3A00'},
                ]}>
                Priority bookings, discounts & more
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={18}
              color={theme.isDarkMode ? '#000' : '#8B4513'}
            />
          </View>
        </TouchableOpacity>

        {/* Account Settings Section */}
        <View
          style={[
            styles.sectionContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Account Settings
          </Text>

          {/* Theme Toggle */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={theme.toggleTheme}>
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
          </TouchableOpacity>

          {/* Notifications Toggle */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={toggleNotifications}>
            <View style={styles.iconTextContainer}>
              <View
                style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                Notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
              trackColor={{false: '#767577', true: '#81b0ff'}}
            />
          </TouchableOpacity>

          {/* Change Password */}
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.iconTextContainer}>
              <View
                style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
                <MaterialCommunityIcons
                  name="lock-reset"
                  size={20}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                Change Password
              </Text>
            </View>
            <Entypo name="chevron-right" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Gamification Section */}
        <TouchableOpacity
          style={[
            styles.sectionContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}
          onPress={handleGamificationPress}>
          <View style={styles.gamificationHeader}>
            <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
              Gamification
            </Text>
            <View style={styles.pointsBadge}>
              <MaterialIcons name="stars" size={16} color="#FFD700" />
              <Text style={styles.pointsBadgeText}>500 pts</Text>
            </View>
          </View>

          <View style={styles.gamificationContent}>
            <View style={styles.rewardProgressContainer}>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, {width: '5%'}]} />
              </View>
              <Text style={[styles.progressText, {color: theme.colors.text}]}>
                95% to next reward
              </Text>
            </View>

            <View style={styles.rewardPreviewContainer}>
              <View style={styles.rewardPreview}>
                <View style={[styles.rewardIcon, {backgroundColor: '#4CAF50'}]}>
                  <MaterialIcons name="local-offer" size={20} color="white" />
                </View>
                <Text
                  style={[
                    styles.rewardPreviewText,
                    {color: theme.colors.text},
                  ]}>
                  5% Discount
                </Text>
              </View>

              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={theme.colors.text}
                style={{opacity: 0.6}}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* PG Services Section */}
        <View
          style={[
            styles.sectionContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            PG Services
          </Text>

          {/* Loan Status */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              const nextStatus =
                loanStatus === 'not taken yet'
                  ? 'pending'
                  : loanStatus === 'pending'
                  ? 'completed'
                  : 'not taken yet';
              setLoanStatus(nextStatus);
            }}>
            <View style={styles.iconTextContainer}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor:
                      loanStatus === 'pending'
                        ? 'rgba(255, 193, 7, 0.2)'
                        : loanStatus === 'completed'
                        ? 'rgba(40, 167, 69, 0.2)'
                        : 'rgba(108, 117, 125, 0.2)',
                  },
                ]}>
                <FontAwesome
                  name={
                    loanStatus === 'pending'
                      ? 'hourglass-half'
                      : loanStatus === 'completed'
                      ? 'check-circle'
                      : 'info-circle'
                  }
                  size={20}
                  color={
                    loanStatus === 'pending'
                      ? '#FFC107'
                      : loanStatus === 'completed'
                      ? '#28A745'
                      : '#6C757D'
                  }
                />
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                Loan Status
              </Text>
            </View>
            <View style={styles.statusBadge}>
              <Text
                style={[
                  styles.statusBadgeText,
                  {
                    color:
                      loanStatus === 'pending'
                        ? '#856404'
                        : loanStatus === 'completed'
                        ? '#155724'
                        : '#383D41',
                    backgroundColor:
                      loanStatus === 'pending'
                        ? 'rgba(255, 193, 7, 0.9)'
                        : loanStatus === 'completed'
                        ? 'rgba(40, 167, 69, 0.9)'
                        : 'rgba(206, 212, 218, 0.9)',
                  },
                ]}>
                {loanStatus === 'pending'
                  ? 'Pending'
                  : loanStatus === 'completed'
                  ? 'Completed'
                  : 'Not Taken'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Saved PGs */}
          <TouchableOpacity style={styles.settingItem}>
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
                Saved PGs
              </Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{savedItemsCount}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View
          style={[
            styles.sectionContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Support
          </Text>

          {/* Refer a Friend */}
          <TouchableOpacity
            style={styles.settingItem}
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
              <Text style={styles.referralBadgeText}>Earn ₹100</Text>
            </View>
          </TouchableOpacity>

          {/* Contact Support */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleContactSupportPress}>
            <View style={styles.iconTextContainer}>
              <View
                style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
                <MaterialCommunityIcons
                  name="headset"
                  size={20}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                Contact Support
              </Text>
            </View>
            <Entypo name="chevron-right" size={20} color={theme.colors.text} />
          </TouchableOpacity>

          {/* About App */}
          <TouchableOpacity style={styles.settingItem} onPress={handleAboutPress}>
            <View style={styles.iconTextContainer}>
              <View
                style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
                <AntDesign
                  name="infocirlceo"
                  size={20}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                About Us
              </Text>
            </View>
            <Entypo name="chevron-right" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Legal Section */}
        <View
          style={[
            styles.sectionContainer,
            {backgroundColor: theme.colors.card},
            cardShadow,
          ]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
            Legal
          </Text>

          {/* Terms & Conditions */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleTermsPress}>
            <View style={styles.iconTextContainer}>
              <View
                style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
                <MaterialIcons
                  name="description"
                  size={20}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                Terms & Conditions
              </Text>
            </View>
            <Entypo name="chevron-right" size={20} color={theme.colors.text} />
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handlePrivacyPress}>
            <View style={styles.iconTextContainer}>
              <View
                style={[styles.iconCircle, {backgroundColor: iconBackground}]}>
                <MaterialCommunityIcons
                  name="shield-account"
                  size={20}
                  color={theme.colors.text}
                />
              </View>
              <Text style={[styles.cardText, {color: theme.colors.text}]}>
                Privacy Policy
              </Text>
            </View>
            <Entypo name="chevron-right" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <Text style={[styles.versionText, {color: theme.colors.text}]}>
          Find MyPG v1.2.0
        </Text>

        {/* Logout Button */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: theme.isDarkMode
                ? 'rgba(239, 83, 80, 0.2)'
                : 'rgba(239, 83, 80, 0.1)',
              borderColor: theme.isDarkMode
                ? 'rgba(239, 83, 80, 0.5)'
                : 'rgba(239, 83, 80, 0.3)',
            },
          ]}
          onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#EF5350" />
          <Text style={[styles.logoutText, {color: '#EF5350'}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginContent: {
    alignItems: 'center',
    width: '100%',
  },
  loginIconContainer: {
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  loginSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    gap: 12,
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
    width: '100%',
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4a6bff',
    borderRadius: 12,
    padding: 4,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 8,
  },
  profileEmail: {
    fontWeight: '500',
    marginBottom: 4,
    fontSize: 12,
    opacity: 0.7,
  },
  profilePhone: {
    fontWeight: '500',
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  cardContainer: {
    padding: 16,
    borderRadius: 12,
  },
  sectionContainer: {
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
  premiumBanner: {
    padding: 16,
    borderRadius: 12,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumIconContainer: {
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
  statusBadge: {
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadge: {
    backgroundColor: '#4a6bff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  countBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.6,
    marginTop: 8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  gamificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsBadgeText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  gamificationContent: {
    gap: 16,
  },
  rewardProgressContainer: {
    gap: 8,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.8,
  },
  rewardPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rewardPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rewardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardPreviewText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Profile;
