import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function BlogScreen() {
  const router = useRouter();

  const articles = [
    {
      id: '1',
      title: '🧴 Tips Penggunaan Skincare dan Makeup yang Efektif Menurut Dokter Kulit',
      summary: 'Pelajari cara menggunakan skincare dan makeup dengan benar agar hasilnya maksimal, menurut anjuran dokter kulit.',
      image: 'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/ilustrasi-skincare.jpg',
      link: 'https://amp.kompas.com/tren/read/2025/05/15/063000165/tips-penggunaan-skincare-dan-makeup-yang-efektif-menurut-dokter-kulit',
    },
    {
      id: '2',
      title: '💄 Tips Membeli Makeup Preloved',
      summary: 'Yuk, cari tahu cara aman membeli makeup preloved agar tetap aman dan berkualitas.',
      image: 'https://cdn-2.tstatic.net/beautynesia/foto/bank/images/ilustrasi-makeup-preloved.jpg',
      link: 'https://www.beautynesia.id/beauty/tips-membeli-makeup-preloved/b-103249/amp',
    },
  ];

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.88;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>📝 Artikel & Tips Kecantikan</Text>

      {articles.map(article => (
        <View key={article.id} style={[styles.card, { width: cardWidth, alignSelf: 'center' }]}>
          <Image source={{ uri: article.image }} style={styles.image} />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.summary}>{article.summary}</Text>
          <TouchableOpacity style={styles.readMoreButton} onPress={() => Linking.openURL(article.link)}>
            <Text style={styles.readMoreText}>🌟 Baca Selengkapnya</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#B0003A', marginRight: 12 }]}
          onPress={() => router.push('/tips2')}
        >
          <Text style={styles.navButtonText}>🎀⬅️ Kembali</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#B0003A', marginLeft: 12 }]}
          onPress={() => router.push('/about')}
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
    paddingVertical: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    color: '#D6336C',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#FF5C8A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#B0003A',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#7A004C',
    marginBottom: 12,
  },
  readMoreButton: {
    backgroundColor: '#B0003A',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  readMoreText: {
    color: 'white',
    fontWeight: '700',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 130,
  },
  navButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
