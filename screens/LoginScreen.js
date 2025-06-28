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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);                        
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login logic
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>Sign in to continue</Text>
        </View>

        <View style={styles.inputContainer}>
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

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
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

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={showRegisterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRegisterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register as</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowRegisterModal(false);
                navigation.navigate('Register');
              }}
            >
              <Ionicons name="person" size={24} color="#2E8B57" style={{ marginRight: 10 }} />
              <Text style={styles.modalButtonText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowRegisterModal(false);
                navigation.navigate('LandlordRegister');
              }}
            >
              <Ionicons name="business" size={24} color="#000" style={{ marginRight: 10 }} />
              <Text style={styles.modalButtonText}>Landlord</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowRegisterModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    resizeMode: 'cover'
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#000',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
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
    paddingHorizontal: 10,
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#666',
    fontSize: 16,
  },
  registerLink: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
    padding: 28,
    alignItems: 'center',
    width: 300,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 14,
    width: 220,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  modalCancel: {
    marginTop: 8,
  },
  modalCancelText: {
    color: '#888',
    fontSize: 16,
  },
}); 