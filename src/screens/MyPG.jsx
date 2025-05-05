import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyPG = ({navigation}) => {
  const theme = useContext(ThemeContext);

  const recommendedPGs = [
    {
      id: '1',
      name: 'Shanti PG',
      location: 'Sector 15, Noida',
      price: '₹8,000/month',
      rating: 4.8,
      image: 'https://images.nobroker.in/images/8a9fcc82810f457601810faa8428521b/8a9fcc82810f457601810faa8428521b_17558_515298_medium.jpg',
    },
    {
      id: '2',
      name: 'Royal Boys PG',
      location: 'Sector 62, Noida',
      price: '₹7,500/month',
      rating: 4.8,
      image: 'https://images.nobroker.in/images/8a9fbc83955ff87101956069abf22e71/8a9fbc83955ff87101956069abf22e71_90942_427523_medium.jpg',
    },
    {
      id: '3',
      name: 'Premium PG',
      location: 'Sector 18, Noida',
      price: '₹10,000/month',
      rating: 4.8,
      image: 'https://images.nobroker.in/images/8a9faa838bf50fb7018bf59828234765/8a9faa838bf50fb7018bf59828234765_80303_786270_medium.jpg',
    },
    {
      id: '4',
      name: 'Foodie PG',
      location: 'Sector 16, Noida',
      price: '₹9,000/month',
      rating: 4.7,
      image: 'https://images.nobroker.in/images/8a9f85c48fa074fe018fa0a638f11634/8a9f85c48fa074fe018fa0a638f11634_39588_563756_medium.jpg',
    },
  ];

  const renderPGItem = ({item}) => (
    <TouchableOpacity
      style={[styles.pgCard, {backgroundColor: theme.colors.card}]}
      >
      <Image source={{uri: item.image}} style={styles.pgImage} />
      <View style={styles.pgInfo}>
        <Text style={[styles.pgName, {color: theme.colors.text}]}>
          {item.name}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={14}
            color={theme.colors.text}
            style={{opacity: 0.7}}
          />
          <Text style={[styles.pgLocation, {color: theme.colors.text}]}>
            {item.location}
          </Text>
        </View>
        <Text style={[styles.pgPrice, {color: '#4CAF50'}]}>
          {item.price}
        </Text>
        {item.rating && (
          <View style={styles.ratingRow}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={[styles.pgRating, {color: theme.colors.text}]}>
              {item.rating}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      contentContainerStyle={styles.scrollContainer}>
      {/* Empty State (shown when no PG booked) */}
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
          onPress={() => navigation.navigate('Home')}
          >
          <Ionicons name="add" size={24} color="#4CAF50" />
          <Text style={styles.addButtonText}>Book Your PG</Text>
        </TouchableOpacity>
      </View>

      {/* Recommended PGs Section */}
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>
          Recommended For You
        </Text>
        <FlatList
          horizontal
          data={recommendedPGs}
          renderItem={renderPGItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
    marginTop: 40,
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
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  listContainer: {
    paddingRight: 16,
  },
  pgCard: {
    width: 220,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  pgImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  pgInfo: {
    padding: 12,
  },
  pgName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pgLocation: {
    fontSize: 12,
    opacity: 0.7,
    marginLeft: 4,
  },
  pgPrice: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pgRating: {
    fontSize: 12,
    marginLeft: 4,
  },
});

export default MyPG;