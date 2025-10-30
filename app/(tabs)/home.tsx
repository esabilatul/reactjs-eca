import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const goToExplore = () => {
    router.push('/(tabs)/explore');
  };

  const headerImages = [
    require('@/assets/images/makeup3.jpg'),
    require('@/assets/images/makeup4.jpg'),
    require('@/assets/images/makeup5.jpg'),
  ];

  const [headerIndex, setHeaderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [headerImages.length]);

  const changeHeaderImage = () => {
    setHeaderIndex((prevIndex) => (prevIndex + 1) % headerImages.length);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#FFE6F0' }} // pink muda background utama
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image Card */}
        <View style={[styles.card, styles.cardHeader]}>
          <TouchableOpacity onPress={changeHeaderImage}>
            <Image source={headerImages[headerIndex]} style={styles.headerImage} resizeMode="cover" />
          </TouchableOpacity>
        </View>

        {/* Welcome Card */}
        <View style={[styles.card, styles.cardWelcome]}>
          <ThemedView style={styles.titleContainer}>
            <View style={styles.welcomeBackgroundWrapper}>
              <Image source={require('@/assets/images/bg2.jpg')} style={styles.welcomeBackgroundImage} blurRadius={1} />
              <View style={styles.welcomeContent}>
                <ThemedText type="title" style={styles.mainTitle}>Welcome!</ThemedText>
                <ThemedText type="title" style={styles.subTitle}>Lavica Makeup — Toko Kecantikan</ThemedText>
                <HelloWave />
              </View>
            </View>
          </ThemedView>
        </View>

        {/* Sections Cards */}
        <View style={[styles.card, styles.cardSection]}>
          <View style={styles.sectionCard}>
            <Text style={styles.emoji}>💄</Text>
            <View style={styles.sectionContent}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Luxe Lips</ThemedText>
              <ThemedText style={styles.sectionText}>Percantik senyumanmu dengan koleksi lipstik mewah dalam berbagai tekstur dan warna.</ThemedText>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.emoji}>👁️</Text>
            <View style={styles.sectionContent}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Lash Muse</ThemedText>
              <ThemedText style={styles.sectionText}>Tegaskan pesonamu dengan bulu mata yang lentik dan dramatis.</ThemedText>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.emoji}>✨</Text>
            <View style={styles.sectionContent}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Flawless Base</ThemedText>
              <ThemedText style={styles.sectionText}>
                Ciptakan tampilan kulit yang mulus dan sempurna dengan rangkaian makeup pilihan — dari foundation, BB cream, hingga cushion.
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Bestseller Card */}
        <View style={[styles.card, styles.cardBestSeller]}>
          <Text style={[styles.bestSellerTitleSection, { textAlign: 'center' }]}>🔥 Produk Bestseller</Text>

          <View style={styles.bestSellerListWrapper}>
            <FlatList
              data={[
                {
                  id: 'foundation',
                  title: 'Bare Perfection: Make Over',
                  brand: 'Make Over',
                  emoji: '🧴',
                  description: 'Powerstay Foundation dengan coverage tinggi, awet, cocok untuk kulit tropis.',
                  price: 150000,
                  rating: 4.9,
                  reviewCount: 215,
                  reviewSnippet: 'Coverage-nya bagus banget, awet dipakai seharian!',
                  reviewer: 'Nadia',
                  image: require('@/assets/images/makeover.jpg'),
                },
                {
                  id: 'loose_powder',
                  title: 'Flawless Finish: Somethinc',
                  brand: 'Somethinc',
                  emoji: '✨',
                  description: 'Loose Powder ringan dan tahan lama untuk hasil akhir sempurna.',
                  price: 85000,
                  rating: 4.9,
                  reviewCount: 182,
                  reviewSnippet: 'Ringan banget, bikin makeup lebih halus!',
                  reviewer: 'Dina',
                  image: require('@/assets/images/hooman.jpg'),
                },
              ]}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 16,
                alignItems: 'center',
              }}
              ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
              renderItem={({ item }) => (
                <View style={styles.bestSellerCard}>
                  <Image source={item.image} style={styles.bestSellerImage} resizeMode="cover" />
                  <Text style={styles.bestSellerTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.bestSellerPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
                </View>
              )}
            />
          </View>
        </View>

        {/* Promo Card */}
        <View style={[styles.card, styles.cardPromo]}>
          <Text style={styles.promoEmoji}>🎉🛍️</Text>
          <Text style={styles.promoTitle}>🎯 PROMO SPESIAL BULAN INI 🎯</Text>
          <Text style={styles.promoText}>
            🌟 Dapatkan diskon hingga 60% untuk pembelian produk bibir 💄 dan wajah ✨!{'\n'}
            📅 Berlaku sampai 30 Juli 2025.{'\n'}
            🚨 Jangan sampai ketinggalan 💕
          </Text>
        </View>

        {/* Testimoni Card */}
        <View style={[styles.card, styles.cardTestimoni]}>
          <Text style={styles.testimoniTitle}>💬 Apa Kata Pelanggan?</Text>
          <View style={styles.testiItem}>
            <Text style={styles.testiQuote}>
              💖 "Produk Lavica bikin aku tampil percaya diri tiap hari. Warna lipstick-nya tahan lama dan cantik banget!" 💋
            </Text>
            <Text style={styles.testiAuthor}>— Rina, 24</Text>
          </View>
          <View style={styles.testiItem}>
            <Text style={styles.testiQuote}>
              🌸 "Suka banget foundationnya, ringan tapi nutup banget! Paket datang cepat dan aman." ⭐⭐⭐⭐⭐
            </Text>
            <Text style={styles.testiAuthor}>— Yunita, 29</Text>
          </View>
        </View>

        {/* Button Card */}
        <View style={[styles.card, styles.cardButton]}>
          <TouchableOpacity style={styles.customButton} onPress={goToExplore}>
            <Text style={styles.customButtonText}>💖 Lihat Produk di Explore</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6F0', // pink muda background utama
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },

  // Variasi warna untuk tiap card
  cardHeader: {
    backgroundColor: '#FFD6E8', // pink muda agak cerah
  },
  cardWelcome: {
    backgroundColor: '#FFD3DD', // pink sangat lembut
  },
  cardSection: {
    backgroundColor: '#FFD3DD', // pink soft
  },
  cardBestSeller: {
    backgroundColor: '#FFD3DD', // pink pastel cerah
  },
  cardPromo: {
    backgroundColor: '#FFCCD9', // pink agak gelap tapi lembut
  },
  cardTestimoni: {
    backgroundColor: '#FFD3DD', // pink pastel lembut
  },
  cardButton: {
    backgroundColor: '#FFB6C1', // pink agak terang
    alignItems: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerImage: {
    height: 250,
    width: '100%',
    borderRadius: 16,
  },
  welcomeBackgroundWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 0,
    height: 160,
  },
  welcomeBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.3,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#B23A48',
  },
  subTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#5E3C58',
  },
  sectionCard: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'flex-start',
    gap: 12,
  },
  emoji: {
    fontSize: 28,
    marginTop: 4,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#5E3C58',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2D1A26',
  },
  bestSellerTitleSection: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B23A48',
    marginBottom: 12,
  },
  bestSellerListWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  bestSellerCard: {
    backgroundColor: '#FFE8EC',
    borderRadius: 12,
    marginVertical: 8,
    paddingBottom: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    width: 160,
  },
  bestSellerImage: {
    width: 140,
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 8,
  },
  bestSellerTitle: {
    marginTop: 12,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#2D1A26',
  },
  bestSellerPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#B23A48',
    marginBottom: 16,
  },
  promoEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 8,
  },
  promoTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#B23A48',
    textAlign: 'center',
    marginBottom: 8,
  },
  promoText: {
    fontSize: 16,
    color: '#2D1A26',
    textAlign: 'center',
  },
  testimoniTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#B23A48',
    marginBottom: 12,
  },
  testiItem: {
    marginBottom: 12,
  },
  testiQuote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2D1A26',
  },
  testiAuthor: {
    fontSize: 14,
    textAlign: 'right',
    fontWeight: '600',
    marginTop: 4,
    color: '#5E3C58',
  },
  customButton: {
    backgroundColor: '#B23A48',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  customButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
