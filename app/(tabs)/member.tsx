import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MemberScreen() {
  const router = useRouter();

  const handleJoinWhatsApp = () => {
    Linking.openURL('https://wa.me/62895412993211?text=Halo%20saya%20tertarik%20jadi%20member%20Lavica');
  };

  const handleLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            router.push('/'); // pindah ke halaman home
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>🎀 Yuk Jadi Member Lavica! 🎀</Text>

        <View style={styles.card}>
          <Text style={styles.description}>
            ✨ Gabung sekarang dan rasakan berbagai keuntungan menarik buat kamu yang suka tampil cantik & happy:
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#D6336C" />
            <Text style={styles.benefitText}>💸 Diskon spesial member hingga 20%</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#D6336C" />
            <Text style={styles.benefitText}>🎉 Akses ke promo & event eksklusif</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#D6336C" />
            <Text style={styles.benefitText}>📚 Tips bisnis & dukungan reseller</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#D6336C" />
            <Text style={styles.benefitText}>📱 Konsultasi langsung via WhatsApp</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.joinButton} onPress={handleJoinWhatsApp}>
          <Ionicons name="logo-whatsapp" size={20} color="#fff" />
          <Text style={styles.joinButtonText}>Gabung Sekarang 💕</Text>
        </TouchableOpacity>

        {/* Tombol di bawah, tetap bersebelahan */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/about')}>
            <Text style={styles.backButtonText}>❤️ ⬅️ Kembali</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <View style={styles.logoutContent}>
              <Text style={styles.logoutEmoji}>❤️</Text>
              <Ionicons name="log-out-outline" size={18} color="#fff" style={{ marginHorizontal: 6 }} />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6F0',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    // Biar tombol di bawah nempel di bawah konten, kasih marginTop auto di tombol nanti
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D6336C',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#D6336C',
    textAlign: 'center',
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#D6336C',
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D6336C',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center', // tombol di tengah horizontal
    width: '100%',
    marginTop: 'auto',   // ini supaya tombol berada paling bawah
    paddingBottom: 30,   // kasih jarak bawah agar gak nempel banget
    paddingHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#B0003A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 12, // jarak antar tombol
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#B0003A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutEmoji: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
