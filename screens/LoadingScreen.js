import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoadingScreen() {
  const roomAnim = useRef(new Animated.Value(-width / 2)).current;
  const rentAnim = useRef(new Animated.Value(width / 2)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(roomAnim, {
          toValue: -10,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(rentAnim, {
          toValue: 10,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scaleAnim, {
        toValue: 1.1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [roomAnim, rentAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Animated.Text
          style={[
            styles.roomText,
            { transform: [{ translateX: roomAnim }, { scale: scaleAnim }] },
          ]}
        >
          Room
        </Animated.Text>
        <Animated.Text
          style={[
            styles.rentText,
            { transform: [{ translateX: rentAnim }, { scale: scaleAnim }] },
          ]}
        >
          Rent
        </Animated.Text>
      </View>
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  roomText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginRight: 10,
    letterSpacing: 2,
  },
  rentText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
    letterSpacing: 2,
  },
}); 