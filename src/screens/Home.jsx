import React, {useContext, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../context/ThemeContext';
import {pgData} from '../data/pgData';

const Home = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter PGs based on search query (name/location)
  const filteredData = useMemo(() => {
    return pgData.filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  // Service icons mapping (cleaner than switch-case)
  const serviceIcons = {
    AC: 'ac-unit',
    WiFi: 'wifi',
    Laundry: 'local-laundry-service',
    Food: 'restaurant',
    'Light Backup': 'flash-on',
    Gym: 'fitness-center',
    default: 'check-circle',
  };

  const renderServiceIcon = service => (
    <MaterialIcons
      name={serviceIcons[service] || serviceIcons.default}
      size={20}
      color="#4CAF50"
      style={styles.serviceIcon}
    />
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.pgCard, {backgroundColor: theme.colors.card, opacity: item.isAvailable ? 1 : 0.5}]} 
      disabled={!item.isAvailable}>
        {!item.isAvailable && (
      <View style={styles.unavailableOverlay}>
        <Text style={styles.unavailableText}> Room Unavailable</Text>
      </View>
    )}
      <Image source={item.image} style={[styles.pgImage, !item.isAvailable && styles.pgImage]} />
      <View style={styles.pgInfo}>
        <View style={styles.pgHeader}>
          <View style={styles.nameLocationContainer}>
            <Text style={[styles.pgName, {color: theme.colors.text}]}>
              {item.name}
            </Text>
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={14} color="#FF6B6B" />
              <Text style={styles.pgLocation}>{item.location}</Text>
            </View>
          </View>
          <Text style={styles.pgPrice}>{item.rent.toLocaleString()}/mo</Text>
        </View>

        <View style={styles.servicesContainer}>
          {item.services.slice(0, 4).map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              {renderServiceIcon(service)}
              <Text style={[styles.serviceText, {color: theme.colors.text}]}>
                {service}
              </Text>
            </View>
          ))}
          {item.services.length > 4 && (
            <Text style={[styles.moreText, {color: theme.colors.text}]}>
              +{item.services.length - 4} more
            </Text>
          )}
        </View>

        {item.noAdvance && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Advance Required</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {/* Search Bar */}
      <View
        style={[styles.searchContainer, {backgroundColor: theme.colors.card}]}>
        <MaterialIcons name="search" size={20} color="#6B7280" />
        <TextInput
          style={[styles.searchInput, {color: theme.colors.text}]}
          placeholder="Search by PG name or location..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialIcons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* PG List */}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={50} color="#9CA3AF" />
            <Text style={[styles.emptyText, {color: theme.colors.text}]}>
              No PGs found matching your search
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 16 : 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 0,
  },
  pgCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  pgImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  pgInfo: {
    padding: 16,
  },
  pgHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  nameLocationContainer: {
    flex: 1,
    marginRight: 8,
  },
  pgName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  pgLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  pgPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    alignItems: 'center',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  serviceIcon: {
    marginRight: 6,
  },
  serviceText: {
    fontSize: 14,
  },
  moreText: {
    fontSize: 13,
    fontStyle: 'italic',
    marginLeft: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF9800',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9CA3AF',
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 2,
    elevation: 3,
  },
  unavailableText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Home