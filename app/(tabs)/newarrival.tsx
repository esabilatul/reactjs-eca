import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

type Product = {
  id: string;
  title: string;
  brand: string;
  launchDate: string;
  image: any;
};

const newArrivals: Product[] = [
  {
    id: 'new1',
    title: 'Rhode Skincare',
    brand: 'Rhode',
    launchDate: '6 Agustus 2025',
    image: require('@/assets/images/rode.jpg'),
  },
  {
    id: 'new2',
    title: 'Soft Pinch Liquid Blush',
    brand: 'Rare Beauty',
    launchDate: '6 Agustus 2025',
    image: require('@/assets/images/rarebeauty.jpg'),
  },
  {
    id: 'new3',
    title: 'NARS Reflecting Foundation',
    brand: 'NARS',
    launchDate: '6 Agustus 2025',
    image: require('@/assets/images/nars.jpg'),
  },
  {
    id: 'new4',
    title: 'Dior Backstage Eyeshadow',
    brand: 'DIOR',
    launchDate: '6 Agustus 2025',
    image: require('@/assets/images/dior.jpg'),
  },
];

const { width } = Dimensions.get('window');

const NewArrivalsScreen = () => {
  const router = useRouter();

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.textWrapper}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productLaunchDate}>New launching {item.launchDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✨ New Arrivals ✨</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💄 Temukan produk baru favoritmu sekarang juga! {'\n'}
          💕 Stay tuned di website Lavica
        </Text>
      </View>

      <FlatList
        data={newArrivals}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={[styles.footerButtons, { marginTop: 20, marginBottom: 30 }]}>
            <TouchableOpacity
              onPress={() => router.push('/wishlist')}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>⬅️ 🎀 Kembali</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/promo')}
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
    backgroundColor: '#FFE6F0', // Background pink muda
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
  infoBox: {
    backgroundColor: '#FFD3DD', // Pink lebih terang
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F8BBD0',
  },
  infoText: {
    fontSize: 16,
    color: '#AD1457',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#8B2F57',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    alignItems: 'center',
  },
  productImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 16,
    resizeMode: 'cover',
    marginRight: 20,
  },
  textWrapper: {
    flex: 1,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B1D3F',
    marginBottom: 6,
  },
  productBrand: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D6336C',
    marginBottom: 4,
  },
  productLaunchDate: {
    fontSize: 14,
    color: '#7A4B65',
    fontStyle: 'italic',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE6F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
    gap: 16,
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
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B0003A',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 24,
    shadowColor: '#8B2F57',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default NewArrivalsScreen;
