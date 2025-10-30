import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

// Dummy data wishlist
const initialWishlist = [
  {
    id: 'lip 3',
    category: 'Lip',
    emoji: '💄',
    title: 'TIME PHORIA velvet lip cream',
    brand: 'TIME PHORIA',
    description: 'Lip tint dengan tekstur ringan dan natural.',
    price: 'Rp 118.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/timephoria.jpg'),
  },
  {
    id: 'blush 2',
    category: 'Blush',
    emoji: '🌸',
    title: 'judydoll blush powder',
    brand: 'judydoll',
    description: 'Blush on dengan warna natural.',
    price: 'Rp 85.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/judydoll.jpg'),
  },
  {
    id: 'mascara 2',
    category: 'Mascara',
    emoji: '👁',
    title: 'O.TWOO.0 ultimate 5D mascara',
    brand: 'O.TWOO.O',
    description: 'Mascara tahan air dan tidak menggumpal.',
    price: 'Rp 90.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/otwo.jpg'),
  },
  {
    id: 'powder 2',
    category: 'Powder',
    emoji: '💨',
    title: 'sea makeup loose powder',
    brand: 'Sea Makeup',
    description: 'Bedak tabur untuk hasil halus dan ringan.',
    price: 'Rp 75.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/seamakeup.jpg'),
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [wishlistProducts, setWishlistProducts] = useState(initialWishlist);

  const removeFromWishlist = (id: string) => {
    Alert.alert('Hapus Wishlist', 'Yakin ingin menghapus produk ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          setWishlistProducts(wishlistProducts.filter(product => product.id !== id));
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: typeof initialWishlist[0] }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productBrand}>✨ {item.brand}</Text>
        <Text style={styles.productPrice}>💰 {item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFromWishlist(item.id)}
        style={styles.removeButton}
        activeOpacity={0.7}
      >
        <Ionicons name="trash" size={26} color="#FF5C8A" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💖 Wishlist Kamu</Text>

      {wishlistProducts.length === 0 ? (
        <Text style={styles.emptyText}>😢 Wishlist kamu masih kosong.</Text>
      ) : (
        <FlatList
          data={wishlistProducts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
  <View style={[styles.footerButtons, { marginTop: 20, marginBottom: 30 }]}>
    <TouchableOpacity onPress={() => router.push('/preloved')} style={styles.backButton}>
      <Text style={styles.buttonText}>⬅️ 🎀 Kembali</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push('/newarrival')} style={styles.nextButton}>
      <Text style={styles.buttonText}>💖 Selanjutnya ➡️</Text>
    </TouchableOpacity>
  </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6F0',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FF5C8A',
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: '#FF5C8A88',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 18,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#FF5C8A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 6,
    color: '#D6336C',
  },
  productBrand: {
    fontStyle: 'italic',
    color: '#FF7FA6',
    marginBottom: 6,
    fontSize: 14,
  },
  productPrice: {
    fontWeight: '700',
    color: '#D6336C',
    fontSize: 18,
  },
  removeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFE6F0',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 80,
    color: '#D6336C',
    fontSize: 20,
    fontStyle: 'italic',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6f0',
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
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#FF5C8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 6,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B0003A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#FF85A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
    marginHorizontal: 8,
  },
});
