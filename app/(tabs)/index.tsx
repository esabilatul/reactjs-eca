import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Alert, View, ImageBackground, Image, Platform, TouchableOpacity, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // Tarik data awal (tanpa login) jika mau
    fetchProfile("23040011", "12"); // optional pre-load
  }, []);

  const fetchProfile = async (nim: string, kelas: string) => {
    try {
      const response = await fetch(
        `https://cloud-jalurlangitv2.ikraf.or.id/api/applms/tarik_data?kelas=${kelas}&nim=${nim}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Basic ' + btoa('adminx:adminx123'),
          },
        }
      );

      const json = await response.json();
      console.log('API Response:', json);

      if (json.status && json.foto) {
        setAvatarUrl(json.foto);
      } else {
        console.warn('Tidak ada foto ditemukan');
      }
    } catch (error) {
      console.error('Gagal ambil foto:', error);
    }
  };

  const handleLogin = () => {
    if (!nama || !password) {
      Platform.OS === 'web'
        ? window.alert('Login Gagal - Nama dan password wajib diisi.')
        : Alert.alert('Login Gagal', 'Nama dan password wajib diisi.');
      return;
    }

    if (nama === 'eca' && password === '12345') {
      Platform.OS === 'web'
        ? window.alert('Login Berhasil - Selamat datang!')
        : Alert.alert('Login Berhasil', 'Selamat datang!');
      router.replace('/(tabs)/home');
    } else {
      Platform.OS === 'web'
        ? window.alert('Login Gagal - Nama atau password salah.')
        : Alert.alert('Login Gagal', 'Nama atau password salah.');
    }
  };

  return (
    <ImageBackground
      source={
        avatarUrl
          ? { uri: avatarUrl }
          : require('@/assets/images/lavica.jpg')
      }
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.centerWrapper}>
        <ThemedView style={styles.container}>
          {/* Avatar / Fallback */}
         <Image
  source={
    avatarUrl
      ? { uri: avatarUrl }
      : require('@/assets/images/logo1.jpg')
  }
  style={[styles.logo, { alignSelf: 'center' }]} // ✅ Logo di tengah
  resizeMode="cover"
    />
          <ThemedText type="title" style={styles.title}>
            Welcome to Lavica
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={nama}
            onChangeText={setNama}
            placeholderTextColor="#555"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#555"
          />

          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>❤️ Login ❤️</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B23A48',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  buttonWrapper: {
    marginTop: 8,
  },
  button: {
    backgroundColor: '#B23A48',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
