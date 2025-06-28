import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';
import BookingsScreen from './screens/BookingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RoomDetailScreen from './screens/RoomDetailScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import LandlordDashboard from './screens/LandlordDashboard';
import LandlordRegisterScreen from './screens/LandlordRegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'search' : 'search-outline';
            color = focused ? '#000' : '#000';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'heart' : 'heart-outline';
            color = focused ? '#FF0000' : '#000';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'bookmarks' : 'bookmarks-outline';
            color = focused ? '#000' : '#000';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            color = focused ? '#000' : '#000';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#000',
          backgroundColor: '#fff',
        },
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '800',
          color: '#000',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('./assets/logo.jpg')}
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: '#000',
                  backgroundColor: '#fff',
                  marginLeft: 10,
                  resizeMode: 'cover'
                }}
              />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                const newShowSearch = !showSearch;
                setShowSearch(newShowSearch);
                navigation.setParams({ showSearch: newShowSearch });
              }}
            >
              <Ionicons name={showSearch ? "close" : "search"} size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'left',
        })}
        initialParams={{ showSearch: false }}
      />
      <Tab.Screen 
        name="Saved" 
        component={SavedScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingsScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LandlordDashboard" 
          component={LandlordDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LandlordRegister" 
          component={LandlordRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RoomDetail" 
          component={RoomDetailScreen}
          options={{ 
            headerShown: false,
            presentation: 'modal'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
