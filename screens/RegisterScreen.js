import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleRegister = () => {
    // TODO: Implement registration logic
    // When sending registration data to backend, include gender and contactNumber:
    // Example:
    // const registrationData = { name, email, password, gender, contactNumber };
    // await api.register(registrationData);
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={[styles.scrollContainer, { padding: width < 400 ? 10 : 20 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.jpg')}
            style={[styles.logo, { width: width * 0.3, height: width * 0.3, borderRadius: (width * 0.3) / 2 }]}
            resizeMode="cover"
          />
          <Text style={[styles.welcomeText, { fontSize: width < 400 ? 22 : 28 }]}>Create Account</Text>
          <Text style={[styles.subtitleText, { fontSize: width < 400 ? 13 : 16 }]}>Sign up to get started</Text>
        </View>

        <View style={[styles.inputContainer, { width: '100%' }]}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              placeholderTextColor="#666"
              value={contactNumber}
              onChangeText={setContactNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginBottom: 15, paddingLeft: 10, backgroundColor: '#f3f3f3', borderRadius: 10, paddingVertical: 10 }}>
            <Text style={{ fontSize: 16, color: '#666', marginBottom: 8 }}>Gender</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 24 }}
                onPress={() => setGender('male')}
              >
                <View style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: gender === 'male' ? '#000' : '#aaa',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                  backgroundColor: '#fff',
                }}>
                  {gender === 'male' && <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#000' }} />}
                </View>
                <Text style={{ color: '#222', fontSize: 15 }}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 24 }}
                onPress={() => setGender('female')}
              >
                <View style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: gender === 'female' ? '#000' : '#aaa',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                  backgroundColor: '#fff',
                }}>
                  {gender === 'female' && <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#000' }} />}
                </View>
                <Text style={{ color: '#222', fontSize: 15 }}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => setGender('other')}
              >
                <View style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: gender === 'other' ? '#000' : '#aaa',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                  backgroundColor: '#fff',
                }}>
                  {gender === 'other' && <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: '#000' }} />}
                </View>
                <Text style={{ color: '#222', fontSize: 15 }}>Other</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#666"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // padding is now dynamic in component
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    // width, height, borderRadius are now dynamic in component
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    resizeMode: 'cover'
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitleText: {
    color: '#666',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    color: '#000',
    fontSize: 14,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    color: '#666',
    paddingHorizontal: 8,
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 13,
  },
  loginLink: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'bold',
  },
}); 