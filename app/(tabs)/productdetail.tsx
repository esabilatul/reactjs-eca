import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { product, from } = useLocalSearchParams() as { product?: string; from?: string };

  let productData: {
    id: string;
    title: string;
    image?: any;
    description: string;
    price: number | string;
    brand: string;
    emoji?: string;
    rating?: number;
    reviewCount?: number;
    reviewSnippet?: string;
    reviewer?: string;
    related?: any[];
  } | null = null;

  try {
    if (product) {
      productData = JSON.parse(product);
    }
  } catch (e) {
    console.warn('Failed to parse product JSON', e);
  }

  if (!productData) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Produk tidak ditemukan</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.productContainer}>
        {productData.image ? (
          <Image
            source={productData.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={{ color: '#999' }}>No Image Available</Text>
          </View>
        )}

        <Text style={styles.productTitle}>{productData.title}</Text>
        <Text style={styles.productBrand}>
          {productData.emoji ? productData.emoji + ' ' : ''}
          {productData.brand}
        </Text>
        <Text style={styles.productDescription}>{productData.description}</Text>
        <Text style={styles.productPrice}>
          {typeof productData.price === 'number'
            ? productData.price.toLocaleString('id-ID')
            : productData.price}
        </Text>

        {(productData.rating !== undefined || productData.reviewCount !== undefined) && (
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Ulasan Pengguna</Text>
            <Text style={styles.reviewRating}>
              ⭐ {productData.rating ?? '-'} ({productData.reviewCount ?? 0} ulasan)
            </Text>
            {productData.reviewSnippet && productData.reviewer ? (
              <Text style={styles.reviewSnippet}>
                "{productData.reviewSnippet}" – {productData.reviewer}
              </Text>
            ) : (
              <Text style={styles.reviewSnippet}>Belum ada review</Text>
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            if (from === 'preloved') {
              router.push('/preloved');
            } else if (from === 'explore') {
              router.push('/explore');
            } else {
              router.back();
            }
          }}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: '#FFF0F5',
    flexGrow: 1,
    alignItems: 'center',
  },
  productContainer: {
    backgroundColor: '#FFDDEE',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#E52C63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  noImageContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#eee',
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#B0003A',
    textAlign: 'center',
  },
  productBrand: {
    fontSize: 16,
    color: '#7C2A3A',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D6336C',
    marginBottom: 24,
  },
  reviewContainer: {
    backgroundColor: '#FFF5FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    width: '100%',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#B0003A',
  },
  reviewRating: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewSnippet: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#FFC1DA',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 14,
    color: '#B0003A',
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
