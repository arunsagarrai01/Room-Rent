import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function BookingsScreen({ navigation }) {
  const bookings = [
    {
      id: 1,
      title: 'Modern Room in Downtown',
      location: 'New York, United States',
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      price: 85,
      status: 'Upcoming',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return '#4CAF50';
      case 'completed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Bookings</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <TouchableOpacity 
              key={booking.id}
              style={styles.bookingCard}
              onPress={() => navigation.navigate('BookingDetail', { booking })}
            >
              <Image 
                source={{ uri: booking.image }}
                style={styles.bookingImage}
                resizeMode="cover"
              />
              <View style={styles.bookingDetails}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.bookingTitle}>{booking.title}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
                </View>
                <Text style={styles.bookingLocation}>
                  <Ionicons name="location-outline" size={16} color="#666" /> {booking.location}
                </Text>
                <View style={styles.dateContainer}>
                  <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>Check In</Text>
                    <Text style={styles.dateValue}>{booking.checkIn}</Text>
                  </View>
                  <View style={styles.dateSeparator} />
                  <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>Check Out</Text>
                    <Text style={styles.dateValue}>{booking.checkOut}</Text>
                  </View>
                </View>
                <View style={styles.bookingFooter}>
                  <Text style={[styles.bookingPrice, { color: '#2E8B57', fontWeight: '800', fontSize: 18 }]}>रु{booking.price}</Text>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                    <Ionicons name="chevron-forward" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={width * 0.2} color="#666" />
            <Text style={styles.emptyText}>No bookings yet</Text>
            <Text style={styles.emptySubtext}>Your bookings will appear here</Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreButtonText}>Find Rooms</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Total Amount Section */}
      {bookings.length > 0 && (
        <View style={{ paddingHorizontal: width * 0.04, paddingBottom: width * 0.02 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: '#2E8B57', textAlign: 'right' }}>
            Total: रु{bookings.reduce((sum, b) => sum + b.price, 0)}
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
  bookingCard: {
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
  bookingImage: {
    width: '100%',
    height: width * 0.4,
  },
  bookingDetails: {
    padding: width * 0.04,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: width * 0.02,
  },
  bookingTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: width * 0.02,
  },
  statusBadge: {
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.01,
    borderRadius: width * 0.02,
  },
  statusText: {
    color: '#fff',
    fontSize: width * 0.03,
    fontWeight: '600',
  },
  bookingLocation: {
    fontSize: width * 0.035,
    color: '#666',
    marginBottom: width * 0.03,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: width * 0.03,
    borderRadius: width * 0.02,
    marginBottom: width * 0.03,
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: width * 0.03,
    color: '#666',
    marginBottom: width * 0.01,
  },
  dateValue: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#000',
  },
  dateSeparator: {
    width: 1,
    height: '80%',
    backgroundColor: '#ddd',
    marginHorizontal: width * 0.02,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: width * 0.02,
  },
  bookingPrice: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  perNight: {
    fontSize: width * 0.035,
    color: '#66A182',
    fontWeight: 'normal',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.02,
    borderRadius: width * 0.02,
  },
  detailsButtonText: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#000',
    marginRight: width * 0.01,
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