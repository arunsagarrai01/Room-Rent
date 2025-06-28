import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function RoomDetailScreen({ route, navigation }) {
  const { room } = route.params;

  const amenities = [
    { icon: 'wifi', label: 'Free WiFi' },
    { icon: 'tv', label: 'Smart TV' },
    { icon: 'thermometer', label: 'AC' },
    { icon: 'car', label: 'Parking' },
    { icon: 'restaurant', label: 'Kitchen' },
    { icon: 'water', label: 'Hot Water' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: room.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart" size={24} color="#FF0000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{room.title}</Text>
          <Text style={styles.location}>
            <Ionicons name="location-outline" size={18} color="#666" /> {room.location}
          </Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{room.rating}</Text>
            <Text style={styles.reviews}>(128 reviews)</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Experience luxury and comfort in this beautifully designed room. Perfect for both business travelers and tourists, 
            offering a peaceful retreat in the heart of the city.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <View style={styles.amenityIcon}>
                  <Ionicons name={amenity.icon} size={24} color="#000" />
                </View>
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${room.price}<Text style={styles.perNight}>/night</Text></Text>
              <Text style={styles.taxText}>Including taxes & fees</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: width * 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: width * 0.05,
    left: width * 0.05,
    width: width * 0.11,
    height: width * 0.11,
    backgroundColor: '#fff',
    borderRadius: width * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heartButton: {
    position: 'absolute',
    top: width * 0.05,
    right: width * 0.05,
    width: width * 0.11,
    height: width * 0.11,
    backgroundColor: '#fff',
    borderRadius: width * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: width * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: width * 0.02,
  },
  location: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: width * 0.03,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.04,
  },
  rating: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
    marginLeft: width * 0.02,
  },
  reviews: {
    fontSize: width * 0.035,
    color: '#666',
    marginLeft: width * 0.02,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: width * 0.04,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: width * 0.03,
  },
  description: {
    fontSize: width * 0.038,
    color: '#666',
    lineHeight: width * 0.06,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -width * 0.02,
  },
  amenityItem: {
    width: '33.33%',
    padding: width * 0.02,
    alignItems: 'center',
    marginBottom: width * 0.03,
  },
  amenityIcon: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.02,
  },
  amenityLabel: {
    fontSize: width * 0.035,
    color: '#000',
    textAlign: 'center',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: width * 0.02,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  perNight: {
    fontSize: width * 0.035,
    color: '#66A182',
    fontWeight: 'normal',
  },
  taxText: {
    fontSize: width * 0.03,
    color: '#666',
    marginTop: width * 0.01,
  },
  bookButton: {
    backgroundColor: '#000',
    paddingHorizontal: width * 0.08,
    paddingVertical: width * 0.04,
    borderRadius: width * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
}); 