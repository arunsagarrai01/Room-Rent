import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBoxHeight] = useState(new Animated.Value(0));
  const [isSearchVisible, setIsSearchVisible] = useState(route.params?.showSearch || false);

  useEffect(() => {
    if (route.params?.showSearch !== undefined) {
      setIsSearchVisible(route.params.showSearch);
    }
  }, [route.params?.showSearch]);

  useEffect(() => {
    Animated.timing(searchBoxHeight, {
      toValue: isSearchVisible ? 60 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSearchVisible]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, { height: searchBoxHeight }]}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput 
            placeholder="Where to?"
            placeholderTextColor="#666"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Animated.View>

      {/* Categories */}
      <View style={[styles.categoriesContainer, isSearchVisible && styles.categoriesWithSearch]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('CategoryList', { 
              category: 'Rooms',
              title: 'Available Rooms'
            })}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="home" size={30} color="#fff" />
            </View>
            <Text style={styles.categoryText}>Rooms</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('CategoryList', { 
              category: 'Apartments',
              title: 'Available Apartments'
            })}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="bed" size={30} color="#fff" />
            </View>
            <Text style={styles.categoryText}>Apartments</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('CategoryList', { 
              category: 'Hotels',
              title: 'Available Hotels'
            })}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="business" size={30} color="#fff" />
            </View>
            <Text style={styles.categoryText}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => {
              // You might want to request location permission here
              navigation.navigate('NearMe', {
                title: 'Places Near Me'
              });
            }}
          >
            <View style={styles.categoryIcon}>
              <Ionicons name="map" size={30} color="#fff" />
            </View>
            <Text style={styles.categoryText}>Near me</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Featured Listings */}
      <ScrollView style={styles.listings}>
        <Text style={styles.sectionTitle}>Featured Rooms</Text>
        
        <TouchableOpacity 
          style={styles.listingCard}
          onPress={() => navigation.navigate('RoomDetail', { 
            room: {
              id: 1,
              title: 'Modern Room in Downtown',
              location: 'New York, United States',
              price: 1500,
              rating: 4.8,
              image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'
            }
          })}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af' }}
            style={styles.listingImage}
          />
          <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>Modern Room in Downtown</Text>
            <Text style={styles.listingLocation}>New York, United States</Text>
            <View style={styles.listingFooter}>
              <Text style={[styles.listingPrice, { color: '#2E8B57' }]}>रु1500</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.listingCard}
          onPress={() => navigation.navigate('RoomDetail', {
            room: {
              id: 2,
              title: 'Cozy Studio Apartment',
              location: 'London, United Kingdom',
              price: 2600,
              rating: 4.6,
              image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
            }
          })}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' }}
            style={styles.listingImage}
          />
          <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>Cozy Studio Apartment</Text>
            <Text style={styles.listingLocation}>London, United Kingdom</Text>
            <View style={styles.listingFooter}>
              <Text style={[styles.listingPrice, { color: '#2E8B57' }]}>रु2600</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.listingCard}
          onPress={() => navigation.navigate('RoomDetail', {
            room: {
              id: 3,
              title: 'Luxury Penthouse',
              location: 'Kathmandu, Nepal',
              price: 5000,
              rating: 5.0,
              image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd'
            }
          })}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd' }}
            style={styles.listingImage}
          />
          <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>Luxury Penthouse</Text>
            <Text style={styles.listingLocation}>Kathmandu, Nepal</Text>
            <View style={styles.listingFooter}>
              <Text style={[styles.listingPrice, { color: '#2E8B57' }]}>रु5000</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>5.0</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    margin: 10,
    padding: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    height: 40,
  },
  categoriesWithSearch: {
    marginTop: 0,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 25,
    marginTop: 15,
  },
  categories: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 32,
  },
  categoryIcon: {
    width: 65,
    height: 65,
    backgroundColor: '#000',
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  listings: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 20,
    color: '#000',
    letterSpacing: 0.3,
  },
  listingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  listingImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  listingDetails: {
    padding: 16,
  },
  listingTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    color: '#000',
    letterSpacing: 0.2,
  },
  listingLocation: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  listingPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#fff',
    fontSize: 13,
  },
}); 