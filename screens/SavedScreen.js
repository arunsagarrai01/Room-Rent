import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SavedScreen({ navigation }) {
  const savedRooms = [
    {
      id: 1,
      title: 'Modern Room in Downtown',
      location: 'New York, United States',
      price: 85,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'
    },
    {
      id: 2,
      title: 'Cozy Studio Apartment',
      location: 'London, United Kingdom',
      price: 95,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Saved Rooms</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {savedRooms.length > 0 ? (
          savedRooms.map(room => (
            <TouchableOpacity 
              key={room.id}
              style={styles.listingCard}
              onPress={() => navigation.navigate('RoomDetail', { room })}
            >
              <Image 
                source={{ uri: room.image }}
                style={styles.listingImage}
                resizeMode="cover"
              />
              <View style={styles.listingDetails}>
                <View style={styles.listingHeader}>
                  <Text style={styles.listingTitle}>{room.title}</Text>
                  <TouchableOpacity style={styles.heartButton}>
                    <Ionicons name="heart" size={24} color="#FF0000" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.listingLocation}>
                  <Ionicons name="location-outline" size={16} color="#666" /> {room.location}
                </Text>
                <View style={styles.listingFooter}>
                  <Text style={[styles.listingPrice, { color: '#2E8B57', fontWeight: '800', fontSize: 18 }]}>रु{room.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{room.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={width * 0.2} color="#666" />
            <Text style={styles.emptyText}>No saved rooms yet</Text>
            <Text style={styles.emptySubtext}>Your favorite rooms will appear here</Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreButtonText}>Explore Rooms</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Total Amount Section */}
      {savedRooms.length > 0 && (
        <View style={{ paddingHorizontal: width * 0.04, paddingBottom: width * 0.02 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#2E8B57', textAlign: 'right' }}>
            Total: रु{savedRooms.reduce((sum, r) => sum + r.price, 0)}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: width * 0.03,
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingTop: width * 0.02,
    paddingBottom: width * 0.03,
    paddingHorizontal: width * 0.05,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: width * 0.02,
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: width * 0.04,
  },
  listingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  listingImage: {
    width: '100%',
    height: width * 0.5,
  },
  listingDetails: {
    padding: width * 0.04,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: width * 0.02,
  },
  listingTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: width * 0.02,
  },
  heartButton: {
    padding: width * 0.01,
  },
  listingLocation: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: width * 0.03,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingPrice: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  perNight: {
    fontSize: width * 0.035,
    color: '#66A182',
    fontWeight: 'normal',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.015,
    borderRadius: width * 0.02,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: width * 0.2,
  },
  emptyText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginTop: width * 0.04,
    marginBottom: width * 0.02,
  },
  emptySubtext: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: width * 0.06,
  },
  exploreButton: {
    backgroundColor: '#000',
    paddingHorizontal: width * 0.08,
    paddingVertical: width * 0.04,
    borderRadius: width * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
}); 