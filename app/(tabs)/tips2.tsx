import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

type Tip = {
  id: string;
  title: string;
  description: string;
};

const prelovedTips: Tip[] = [
  {
    id: 'tip1',
    title: '✨ Pilih Parfum yang Masih Segar',
    description:
      'Pastikan parfum preloved masih memiliki aroma yang kuat dan tidak pudar 🕵️‍♀️💨.',
  },
  {
    id: 'tip2',
    title: '🧴 Cek Kondisi Kemasan',
    description:
      'Periksa botol parfum atau kemasan handbody agar tidak bocor atau rusak 🚫💧.',
  },
  {
    id: 'tip3',
    title: '🧼 Bersihkan Sebelum Pakai',
    description:
      'Cuci botol dan aplikator dengan lembut agar bebas kuman dan tetap higienis 🧽✨.',
  },
  {
    id: 'tip4',
    title: '📅 Cek Tanggal Kadaluarsa',
    description:
      'Pastikan produk belum melewati tanggal kadaluarsa agar aman digunakan ⏳✅.',
  },
  {
    id: 'tip5',
    title: '👃 Tes Aroma Sebelum Membeli',
    description:
      'Coba semprotkan sedikit parfum untuk memastikan wanginya cocok dengan kamu 💖🌸.',
  },
  {
    id: 'tip6',
    title: '🛍️ Beli dari Penjual Terpercaya',
    description:
      'Pilih penjual dengan rating baik agar mendapatkan produk yang asli dan berkualitas 🌟👍.',
  },
  {
    id: 'tip7',
    title: '🚫 Hindari Produk yang Terlalu Murah',
    description:
      'Harga sangat murah bisa jadi tanda produk palsu, hati-hati ya! ⚠️💸.',
  },
  {
    id: 'tip8',
    title: '💧 Simpan di Tempat Sejuk',
    description:
      'Untuk menjaga kualitas parfum, simpan di tempat yang tidak terkena sinar matahari langsung 🌥️❄️.',
  },
  {
    id: 'tip9',
    title: '📦 Periksa Kemasan saat Pengiriman',
    description:
      'Kalau beli online, pastikan kemasan produk tidak rusak saat sampai di tanganmu 📬📦.',
  },
  {
    id: 'tip10',
    title: '🤗 Jangan Lupa Share Tips Ini ke Temanmu!',
    description:
      'Biar semua bisa dapat barang preloved yang keren dan aman digunakan 🎉👭.',
  },
];


const TipsPrelovedScreen = () => {
  const router = useRouter();

  const renderTip = ({ item }: { item: Tip }) => (
    <View style={styles.card}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✨ Tips Preloved by Lavica ✨</Text>
      <FlatList
        data={prelovedTips}
        keyExtractor={(item) => item.id}
        renderItem={renderTip}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}

        ListFooterComponent={
 <View style={styles.footerButtons}>
    <TouchableOpacity
      onPress={() => router.push('/tips')}
      style={styles.backButton}
    >
      <Text style={styles.backButtonText}>⬅️ 🎀 Kembali</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => router.push('/artikel')} // nanti ganti rute sesuai kebutuhan
      style={styles.nextButton}
    >
      <Text style={styles.nextButtonText}>💖 Selanjutnya ➡️</Text>
    </TouchableOpacity>
  </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6F0',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#8B2F57',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#8B2F57',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B1D3F',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 16,
    color: '#7A4B65',
    lineHeight: 24,
  },
 footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
    gap: 16
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B0003A',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
    shadowColor: '#D6336C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B0003A',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
    shadowColor: '#D6336C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default TipsPrelovedScreen;
