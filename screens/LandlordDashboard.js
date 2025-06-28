import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const initialRooms = [
  {
    id: '1',
    title: 'Cozy Studio Apartment',
    location: 'Downtown',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    status: 'Available',
  },
  {
    id: '2',
    title: 'Spacious Loft',
    location: 'City Center',
    price: 3600,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    status: 'Available',
  },
];

const landlordProfile = {
  name: 'Arun Sagar Rai',
  email: 'arun@gmail.com',
  avatar: 'https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/351327101_644370280466950_303073702021352860_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFm3z22YultWCV2o9Be5FDcznLDmM7trFLOcsOYzu2sUvVwTCt_Kx8Evp_IQ5HCLZ8V6RMpCb6bzqLeeM-cTqGq&_nc_ohc=qvuwSFBTPOAQ7kNvwHu4R4G&_nc_oc=AdlqHHXr86kel0-lWZLtxckwHnRFo80BeHx2A8oBQG8LiwfVRO56t9W4m6oFYMbzlBlYnXEyNkPYUT3DKm2KzOAK&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=WHtkk-c9V37UA_zrP0qniA&oh=00_AfNGa6Thtkt0EYYFFf2YKKqGjsVp71qwqld6n48uFsPUhQ&oe=68646DEF',
};

function DashboardTab({ rooms, onViewRoom, onDeleteRoom }) {
  const available = rooms.filter(r => r.status === 'Available').length;
  return (
    <View style={styles.dashboardTabBg}>
      <View style={styles.dashboardTab}>
        <Text style={styles.dashboardWelcome}>Welcome, {landlordProfile.name}!</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="home" size={28} color="#2E8B57" />
            <Text style={styles.statNumber}>{rooms.length}</Text>
            <Text style={styles.statLabel}>Total Rooms</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={28} color="#2E8B57" />
            <Text style={styles.statNumber}>{available}</Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
        </View>
        <View style={styles.dashboardStatsSpacer} />
        <Text style={styles.dashboardRoomsTitle}>Your Rooms</Text>
        {rooms.length === 0 ? (
          <Text style={styles.emptyText}>No rooms listed yet.</Text>
        ) : (
          <FlatList
            data={rooms}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.dashboardRoomsListVertical}
            renderItem={({ item }) => (
              <View style={styles.roomCardVertical}>
                <Image source={{ uri: item.image }} style={styles.roomImageVertical} />
                <View style={styles.roomDetailsVertical}>
                  <Text style={styles.roomTitleVertical} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.roomLocationVertical}><Ionicons name="location-outline" size={16} color="#666" /> {item.location}</Text>
                  <Text style={styles.roomPriceVertical}>रु{item.price}</Text>
                  <View style={styles.statusBadgeVertical}>
                    <Ionicons name="checkmark-circle" size={16} color="#2E8B57" />
                    <Text style={styles.statusTextVertical}>{item.status}</Text>
                  </View>
                </View>
                <View style={styles.roomActionsVertical}>
                  <TouchableOpacity style={styles.roomViewBtnVertical} onPress={() => onViewRoom(item)}>
                    <Ionicons name="eye" size={20} color="#2E8B57" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.roomDeleteBtnVertical} onPress={() => onDeleteRoom(item.id)}>
                    <Ionicons name="trash" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

function RoomsTab({ rooms, onAddRoom, onViewRoom, onDeleteRoom }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = () => {
    if (!title || !location || !price || !image) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    onAddRoom({
      id: Date.now().toString(),
      title,
      location,
      price: parseFloat(price),
      image,
      status,
    });
    setTitle('');
    setLocation('');
    setPrice('');
    setImage('');
    setStatus('Available');
    setModalVisible(false);
  };

  const renderRoom = ({ item }) => (
    <View style={styles.roomCardVertical}>
      <Image source={{ uri: item.image }} style={styles.roomImageVertical} />
      <View style={styles.roomDetailsVertical}>
        <Text style={styles.roomTitleVertical} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.roomLocationVertical}><Ionicons name="location-outline" size={16} color="#666" /> {item.location}</Text>
        <Text style={styles.roomPriceVertical}>रु{item.price}</Text>
        <View style={styles.statusBadgeVertical}>
          <Ionicons name="checkmark-circle" size={16} color="#2E8B57" />
          <Text style={styles.statusTextVertical}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.roomActionsVertical}>
        <TouchableOpacity style={styles.roomViewBtnVertical} onPress={() => onViewRoom(item)}>
          <Ionicons name="eye" size={20} color="#2E8B57" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.roomDeleteBtnVertical} onPress={() => onDeleteRoom(item.id)}>
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No rooms listed yet.</Text>}
      />
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Room</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Image URL"
              value={image}
              onChangeText={setImage}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSubmit}>
              <Text style={styles.modalButtonText}>Add Room</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function ProfileTab({ navigation }) {
  const [profile, setProfile] = useState({
    name: landlordProfile.name,
    email: landlordProfile.email,
    avatar: landlordProfile.avatar,
  });
  const [stories, setStories] = useState([
    { id: '1', text: 'Just listed a new room in Downtown!' },
    { id: '2', text: 'All rooms sanitized and ready for guests.' },
  ]);
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newStory, setNewStory] = useState('');
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);

  const handlePostStory = () => {
    if (newStory.trim() === '') return;
    setStories(prev => [{ id: Date.now().toString(), text: newStory }, ...prev]);
    setNewStory('');
    setStoryModalVisible(false);
  };

  const handleEditProfile = () => {
    setProfile(prev => ({ ...prev, name: editName, email: editEmail }));
    setEditModalVisible(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') },
      ]
    );
  };

  return (
    <View style={styles.profileTab}>
      <View style={styles.profileCard}>
        <Image source={{ uri: profile.avatar }} style={styles.avatarLarge} />
        <Text style={styles.profileNameLarge}>{profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>
      <TouchableOpacity style={styles.profileEditLarge} onPress={() => {
        setEditName(profile.name);
        setEditEmail(profile.email);
        setEditModalVisible(true);
      }}>
        <Ionicons name="create-outline" size={22} color="#2E8B57" />
        <Text style={styles.profileEditText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.storyButton} onPress={() => setStoryModalVisible(true)}>
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.storyButtonText}>Post Story</Text>
      </TouchableOpacity>
      <Text style={styles.storiesTitle}>Stories</Text>
      <FlatList
        data={stories}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
        contentContainerStyle={styles.storiesList}
        renderItem={({ item }) => (
          <View style={styles.storyCardNew}>
            <Ionicons name="chatbubble-ellipses" size={18} color="#2E8B57" style={{ marginRight: 8 }} />
            <Text style={styles.storyText}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No stories yet.</Text>}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Modal
        visible={storyModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Post a Story</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="What's new?"
              value={newStory}
              onChangeText={setNewStory}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handlePostStory}>
              <Text style={styles.modalButtonText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setStoryModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Name"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleEditProfile}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setEditModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function RoomDetailsModal({ visible, room, onClose, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [editedRoom, setEditedRoom] = useState(room);

  useEffect(() => {
    setEditedRoom(room);
    setEditMode(false);
  }, [room, visible]);

  if (!room) return null;

  const handleSave = () => {
    onSave(editedRoom);
    setEditMode(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 18, margin: 16, overflow: 'hidden', maxHeight: '90%' }}>
          <ScrollView>
            <Image source={{ uri: editedRoom.image }} style={{ width: '100%', height: 200 }} />
            <View style={{ padding: 18 }}>
              {editMode ? (
                <TextInput
                  style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8, borderBottomWidth: 1, borderColor: '#eee' }}
                  value={editedRoom.title}
                  onChangeText={t => setEditedRoom({ ...editedRoom, title: t })}
                />
              ) : (
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>{editedRoom.title}</Text>
              )}
              {editMode ? (
                <TextInput
                  style={{ fontSize: 16, color: '#666', marginBottom: 8, borderBottomWidth: 1, borderColor: '#eee' }}
                  value={editedRoom.location}
                  onChangeText={l => setEditedRoom({ ...editedRoom, location: l })}
                />
              ) : (
                <Text style={{ fontSize: 16, color: '#666', marginBottom: 8 }}><Ionicons name="location-outline" size={16} color="#666" /> {editedRoom.location}</Text>
              )}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 4 }}>4.8</Text>
                <Text style={{ color: '#666', marginLeft: 4 }}>(128 reviews)</Text>
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 4 }}>Description</Text>
              {editMode ? (
                <TextInput
                  style={{ fontSize: 15, color: '#444', marginBottom: 8, borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 8, minHeight: 60 }}
                  value={editedRoom.description || ''}
                  onChangeText={d => setEditedRoom({ ...editedRoom, description: d })}
                  multiline
                />
              ) : (
                <Text style={{ fontSize: 15, color: '#444', marginBottom: 8 }}>{editedRoom.description || 'No description.'}</Text>
              )}
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 4 }}>Amenities</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
                {(editedRoom.amenities || ['Free WiFi', 'Smart TV', 'AC', 'Parking', 'Kitchen', 'Hot Water']).map((a, i) => (
                  editMode ? (
                    <TextInput
                      key={i}
                      style={{ backgroundColor: '#f4f7f9', borderRadius: 8, padding: 6, margin: 4, minWidth: 80 }}
                      value={a}
                      onChangeText={t => {
                        const newAmenities = [...editedRoom.amenities];
                        newAmenities[i] = t;
                        setEditedRoom({ ...editedRoom, amenities: newAmenities });
                      }}
                    />
                  ) : (
                    <View key={i} style={{ backgroundColor: '#f4f7f9', borderRadius: 8, padding: 6, margin: 4, minWidth: 80 }}>
                      <Text>{a}</Text>
                    </View>
                  )
                ))}
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, marginBottom: 4 }}>Price</Text>
              {editMode ? (
                <TextInput
                  style={{ fontSize: 18, color: '#2E8B57', fontWeight: 'bold', borderBottomWidth: 1, borderColor: '#eee' }}
                  value={String(editedRoom.price)}
                  onChangeText={p => setEditedRoom({ ...editedRoom, price: p.replace(/[^0-9]/g, '') })}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={{ fontSize: 18, color: '#2E8B57', fontWeight: 'bold' }}>रु{editedRoom.price}</Text>
              )}
              <View style={{ flexDirection: 'row', marginTop: 18, justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={onClose} style={{ padding: 12, borderRadius: 8, backgroundColor: '#eee', flex: 1, marginRight: 8 }}>
                  <Text style={{ textAlign: 'center', color: '#222', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
                {editMode ? (
                  <TouchableOpacity onPress={handleSave} style={{ padding: 12, borderRadius: 8, backgroundColor: '#2E8B57', flex: 1, marginLeft: 8 }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Save</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setEditMode(true)} style={{ padding: 12, borderRadius: 8, backgroundColor: '#2E8B57', flex: 1, marginLeft: 8 }}>
                    <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>Edit</Text>
                  </TouchableOpacity>
                )}
              </View>
              {!editMode && (
                <TouchableOpacity style={{ marginTop: 18, backgroundColor: '#000', borderRadius: 8, padding: 16 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>Book Now</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const Tab = createBottomTabNavigator();

export default function LandlordDashboard() {
  const [rooms, setRooms] = useState(initialRooms);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleAddRoom = (room) => {
    setRooms(prev => [room, ...prev]);
  };

  const handleViewRoom = (room) => {
    setSelectedRoom(room);
    setDetailsModalVisible(true);
  };

  const handleDeleteRoom = (id) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const handleSaveRoomDetails = (updatedRoom) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? { ...r, ...updatedRoom } : r));
    setDetailsModalVisible(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name="home" size={size} color={color} />;
            } else if (route.name === 'Rooms') {
              return <Ionicons name="bed" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <Ionicons name="person" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#2E8B57',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home">
          {() => <DashboardTab rooms={rooms} onViewRoom={handleViewRoom} onDeleteRoom={handleDeleteRoom} />}
        </Tab.Screen>
        <Tab.Screen name="Rooms">
          {() => <RoomsTab rooms={rooms} onAddRoom={handleAddRoom} onViewRoom={handleViewRoom} onDeleteRoom={handleDeleteRoom} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {props => <ProfileTab {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
      <RoomDetailsModal
        visible={detailsModalVisible}
        room={selectedRoom}
        onClose={() => setDetailsModalVisible(false)}
        onSave={handleSaveRoomDetails}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    alignSelf: 'center',
    width: '90%',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#2E8B57',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  profileEmail: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
  },
  profileEdit: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E6F4EA',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  roomCardVertical: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginTop: 16,
    marginBottom: 22,
    marginHorizontal: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  roomImageVertical: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  roomDetailsVertical: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  roomTitleVertical: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    maxWidth: '90%',
  },
  roomLocationVertical: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  roomPriceVertical: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 4,
  },
  perNightVertical: {
    fontSize: 13,
    color: '#66A182',
    fontWeight: 'normal',
  },
  statusBadgeVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 2,
  },
  statusTextVertical: {
    color: '#2E8B57',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 13,
  },
  roomActionsVertical: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: 2,
  },
  roomViewBtnVertical: {
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    padding: 9,
    marginRight: 10,
  },
  roomDeleteBtnVertical: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 9,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    backgroundColor: '#2E8B57',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
  dashboardTabBg: {
    flex: 1,
    backgroundColor: '#f4f7f9',
  },
  dashboardTab: {
    flex: 1,
    padding: 20,
  },
  dashboardStatsSpacer: {
    height: 18,
  },
  dashboardWelcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 30,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginRight: 0,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  dashboardRoomsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 6,
    marginBottom: 8,
  },
  dashboardRoomsList: {
    paddingBottom: 10,
    paddingLeft: 2,
  },
  dashboardRoomCard: {
    width: 170,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 18,
    padding: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    alignItems: 'center',
    marginBottom: 4,
    overflow: 'hidden',
    flexDirection: 'column',
    position: 'relative',
  },
  dashboardRoomImage: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 0,
  },
  dashboardRoomTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    maxWidth: 120,
  },
  dashboardRoomPrice: {
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dashboardRoomActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: 2,
  },
  dashboardRoomViewBtn: {
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    padding: 7,
    marginRight: 8,
  },
  dashboardRoomDeleteBtn: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    padding: 7,
  },
  dashboardRoomActionText: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
  dashboardRoomActionTextDelete: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 36,
    backgroundColor: '#2E8B57',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    alignItems: 'center',
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  modalButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalCancel: {
    marginTop: 4,
  },
  modalCancelText: {
    color: '#888',
    fontSize: 16,
  },
  profileTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    width: '90%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    marginBottom: 24,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#2E8B57',
  },
  profileNameLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  profileEditLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
    width: '90%',
    justifyContent: 'center',
  },
  profileEditText: {
    color: '#2E8B57',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  storyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 10,
    width: '90%',
    justifyContent: 'center',
  },
  storyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  storiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 18,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  storiesList: {
    paddingBottom: 20,
    width: '100%',
    paddingHorizontal: 8,
  },
  storyCardNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: '96%',
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  storyText: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 28,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
}); 