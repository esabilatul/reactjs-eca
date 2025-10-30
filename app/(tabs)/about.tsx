import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.imageBox}>
        <Image
          source={require('@/assets/images/lavica.jpg')}
          style={styles.founderPhoto}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.paragraph}>
          💖 Lavica didirikan pada tahun 2025 oleh pecinta kecantikan yang ingin menghadirkan solusi praktis bagi para pengguna skincare dan makeup.
        </Text>
        <Text style={styles.paragraph}>
          ✨ Kami percaya bahwa setiap orang berhak mendapatkan produk dan tips kecantikan yang terpercaya, mudah diakses, dan sesuai kebutuhan.
        </Text>
        <Text style={styles.paragraph}>
          🌸 Dengan Lavica, kami berharap bisa membantu kamu tampil lebih percaya diri setiap hari.
        </Text>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#B0003A', marginRight: 12 }]}
          onPress={() => router.push('/artikel')}
        >
          <Text style={styles.navButtonText}>🎀⬅️ Kembali</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#B0003A', marginLeft: 12 }]}
          onPress={() => router.push('/member')}
        >
          <Text style={styles.navButtonText}>Selanjutnya ➡️❤️</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6F0',
    padding: 20,
  },
  imageBox: {
    backgroundColor: '#FFC1D9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  founderPhoto: {
    width: 260,
    height: 260,
    borderRadius: 20,
  },
  textBox: {
    backgroundColor: '#FFD9E3',
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  paragraph: {
    fontSize: 16,
    color: '#FF4D8B',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'justify',
  },
  navigationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center', // pusatkan tombol
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 130,
    marginHorizontal: 8,// Lebar minimum tombol
  },
  navButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
