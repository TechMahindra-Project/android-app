import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyPG = ({navigation}) => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={80}
          color={theme.colors.text}
          style={{opacity: 0.5}}
        />
        <Text style={[styles.emptyTitle, {color: theme.colors.text}]}>
          No PG Booked Yet
        </Text>
        <Text style={[styles.emptySubtitle, {color: theme.colors.text}]}>
          You haven't added any PG yet
        </Text>
        <TouchableOpacity
          style={[styles.addButton, {backgroundColor: theme.colors.card}]}
          onPress={() => navigation.navigate('Home')}>
          <Ionicons name="add" size={24} color="#4CAF50" />
          <Text style={styles.addButtonText}>Book Your PG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
    width: '80%',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 30,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  addButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});

export default MyPG;
