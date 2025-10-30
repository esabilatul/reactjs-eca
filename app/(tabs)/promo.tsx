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
import Ionicons from '@expo/vector-icons/Ionicons';

type Promo = {
  id: string;
  title: string;
  description: string;
  validUntil: string;
  image: any;
};

const promos: Promo[] = [
  {
    id: 'promo1',
    title: 'Promo 8.8 Super Sale',
    description: 'Diskon hingga 50% untuk foundation favorit kalian MAKEOVER, STAY TUNED!',
    validUntil: '8 Agustus 2025',
    image: require('@/assets/images/makeover.jpg'),
  },
  {
    id: 'promo2',
    title: '9.9 Beauty Festival',
    description: 'Beli 2 gratis 1 untuk produk makeup pilihan,CATAT TANGGALNYA!.',
    validUntil: '9 September 2025',
    image: require('@/assets/images/luxcrime.jpg'),
  },
  {
    id: 'promo3',
    title: 'Promo Rp 0 untuk semua produk lavica spesial ulang tahun owner',
    description: ' CATAT TANGGALNYA!',
    validUntil: '6 november 2025',
    image: require('@/assets/images/lavica.jpg'),
  },
];

const { width } = Dimensions.get('window');

const PromoScreen = () => {
  const router = useRouter();

  const renderPromo = ({ item }: { item: Promo }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.promoImage} />
      <View style={styles.textWrapper}>
        <Text style={styles.promoTitle}>{item.title}</Text>
        <Text style={styles.promoDescription}>{item.description}</Text>
        <Text style={styles.promoValid}>Berlaku tanggal {item.validUntil}</Text>
      </View>
    </View>
  );

 return (
    <View style={styles.container}>
      <Text style={styles.header}>🎉 Promo & Event Khusus 🎉</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Jangan lewatkan promo dan spesial day dari Lavica! 💖
        </Text>
      </View>

      <FlatList
        data={promos}
        keyExtractor={(item) => item.id}
        renderItem={renderPromo}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footerButtons}>
            <TouchableOpacity
              onPress={() => router.push('/newarrival')}
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>⬅️ 🎀 Kembali</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/tips')}
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
  infoBox: {
    backgroundColor: '#FFD3DD',
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
  promoImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 16,
    resizeMode: 'cover',
    marginRight: 20,
  },
  textWrapper: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B1D3F',
    marginBottom: 6,
  },
  promoDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D6336C',
    marginBottom: 4,
  },
  promoValid: {
    fontSize: 14,
    color: '#7A4B65',
    fontStyle: 'italic',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
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
    marginLeft: 8,
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
    marginRight: 8,
    fontSize: 16,
  },
});

export default PromoScreen;
