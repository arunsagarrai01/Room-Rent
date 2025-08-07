import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header with User Profile */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.profilePicture}>
            <Image
              source={require('../assets/icon.png')}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>Morning, Arun Sagar Rai</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search for rooms, apartments..."
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>What are you looking for?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => navigation.navigate('CategoryList', { 
              category: 'Rooms',
              title: 'Available Rooms'
            })}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#4A90E2' }]}>
              <Ionicons name="home" size={28} color="#fff" />
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
            <View style={[styles.categoryIcon, { backgroundColor: '#50C878' }]}>
              <Ionicons name="bed" size={28} color="#fff" />
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
            <View style={[styles.categoryIcon, { backgroundColor: '#FF6B35' }]}>
              <Ionicons name="business" size={28} color="#fff" />
            </View>
            <Text style={styles.categoryText}>Hotels</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => {
              navigation.navigate('NearMe', {
                title: 'Places Near Me'
              });
            }}
          >
            <View style={[styles.categoryIcon, { backgroundColor: '#9B59B6' }]}>
              <Ionicons name="location" size={28} color="#fff" />
            </View>
            <Text style={styles.categoryText}>Near me</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Featured Listings */}
      <ScrollView style={styles.listings} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Rooms</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
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
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af' }}
              style={styles.listingImage}
            />
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>₹1,500</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>Modern Room in Downtown</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#8E8E93" />
              <Text style={styles.listingLocation}>New York, United States</Text>
            </View>
            <View style={styles.listingFooter}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
                <Text style={styles.reviewCount}>(24 reviews)</Text>
              </View>
              <View style={styles.amenitiesContainer}>
                <View style={styles.amenityItem}>
                  <Ionicons name="wifi" size={12} color="#8E8E93" />
                  <Text style={styles.amenityText}>WiFi</Text>
                </View>
                <View style={styles.amenityItem}>
                  <Ionicons name="car" size={12} color="#8E8E93" />
                  <Text style={styles.amenityText}>Parking</Text>
                </View>
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
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267' }}
              style={styles.listingImage}
            />
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>₹2,600</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>Cozy Studio Apartment</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#8E8E93" />
              <Text style={styles.listingLocation}>London, United Kingdom</Text>
            </View>
            <View style={styles.listingFooter}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.6</Text>
                <Text style={styles.reviewCount}>(18 reviews)</Text>
              </View>
              <View style={styles.amenitiesContainer}>
                <View style={styles.amenityItem}>
                  <Ionicons name="wifi" size={12} color="#8E8E93" />
                  <Text style={styles.amenityText}>WiFi</Text>
                </View>
                <View style={styles.amenityItem}>
                  <Ionicons name="restaurant" size={12} color="#8E8E93" />
                  <Text style={styles.amenityText}>Kitchen</Text>
                </View>
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
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd' }}
              style={styles.listingImage}
            />
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>₹5,000</Text>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.listingDetails}>
            <Text style={styles.listingTitle}>Luxury Penthouse</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="#8E8E93" />
              <Text style={styles.listingLocation}>Kathmandu, Nepal</Text>
            </View>
            <View style={styles.listingFooter}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>5.0</Text>
                <Text style={styles.reviewCount}>(32 reviews)</Text>
              </View>
              <View style={styles.amenitiesContainer}>
                <View style={styles.amenityItem}>
                  <Ionicons name="wifi" size={12} color="#8E8E93" />
                  <Text style={styles.amenityText}>WiFi</Text>
                </View>
                <View style={styles.amenityItem}>
                  <Ionicons name="fitness" size={12} color="#8E8E93" />
                  <Text style={styles.amenityText}>Gym</Text>
                </View>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    height: 40,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    marginTop: 8,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  categories: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  listings: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  listingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  listingImage: {
    width: '100%',
    height: 200,
  },
  priceTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingDetails: {
    padding: 16,
  },
  listingTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  listingLocation: {
    color: '#8E8E93',
    fontSize: 14,
    marginLeft: 4,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#1A1A1A',
    fontSize: 14,
  },
  reviewCount: {
    marginLeft: 4,
    color: '#8E8E93',
    fontSize: 12,
  },
  amenitiesContainer: {
    flexDirection: 'row',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  amenityText: {
    marginLeft: 4,
    color: '#8E8E93',
    fontSize: 12,
  },
}); 