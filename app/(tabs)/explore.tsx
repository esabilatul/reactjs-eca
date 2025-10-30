import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;

const headerImage = require('@/assets/images/makeup3.jpg');

const exploreProducts = [
  // Foundation
  {
    id: 'foundation1',
    category: 'Foundation',
    emoji: '🧴',
    title: 'Bare Perfection: Make Over',
    brand: 'Make Over',
    description: 'Powerstay Foundation, coverage tinggi, cocok untuk kulit tropis.',
    price: 'Rp 150.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/makeover.jpg'),
  },
  {
    id: 'foundation 2',
    category: 'Foundation',
    emoji: '🧴',
    title: 'luxcrime radiant foundation',
    brand: 'Luxcrime',
    description: 'Foundation ringan untuk tampilan matte natural.',
    price: 'Rp 90.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/lux.jpg'),
  },
  {
    id: 'foundation 3',
    category: 'Foundation',
    emoji: '🧴',
    title: 'loreal paris infallible',
    brand: 'Loreal',
    description: 'Foundation ringan untuk hasil flawless.',
    price: 'Rp 145.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/loreal.jpg'),
  },

  // Powder
  {
    id: 'powder 1',
    category: 'Powder',
    emoji: '💨',
    title: 'Flawless Finish: Somethinc',
    brand: 'Somethinc',
    description: 'Loose Powder ringan dan tahan lama.',
    price: 'Rp 85.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/hooman.jpg'),
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
  {
    id: 'powder 3',
    category: 'Powder',
    emoji: '💨',
    title: 'YOU Noutiwear loose powder',
    brand: 'YOU',
    description: 'Bedak halus dengan hasil natural.',
    price: 'Rp 80.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/you.jpg'),
  },

  // Concealer
  {
    id: 'concealer 1',
    category: 'Concealer',
    emoji: '🎨',
    title: 'Head & Heal: Dear Me Beauty',
    brand: 'Dear Me Beauty',
    description: 'Concealer serum dengan skincare aktif.',
    price: 'Rp 75.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/dmb.jpg'),
  },
  {
    id: 'concealer 2',
    category: 'Concealer',
    emoji: '🎨',
    title: 'true to skin skinlike',
    brand: 'true to skin',
    description: 'Concealer dengan coverage medium buildable.',
    price: 'Rp 85.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/tts.jpg'),
  },
  {
    id: 'concealer 3',
    category: 'Concealer',
    emoji: '🎨',
    title: 'skintific dual tip concealer',
    brand: 'skintific',
    description: 'Concealer praktis untuk sehari-hari.',
    price: 'Rp 72.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/skintific.jpg'),
  },

  // Mascara
  {
    id: 'mascara 1',
    category: 'Mascara',
    emoji: '👁',
    title: 'Velvet Lash: Mad For Makeup',
    brand: 'Mad For Makeup',
    description: 'Brow & Lash serum + Mascara 2 in 1.',
    price: 'Rp 75.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/mfm.jpg'),
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
    id: 'mascara 3',
    category: 'Mascara',
    emoji: '👁',
    title: 'Somethinc tipsy lash mascara',
    brand: 'Somethinc',
    description: 'Mascara dengan efek volume maksimal.',
    price: 'Rp 95.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/tipsy.jpg'),
  },

  // Lip
  {
    id: 'lip1',
    category: 'Lip',
    emoji: '💄',
    title: 'Bloom Lips: ESQA',
    brand: 'ESQA Cosmetics',
    description: 'Satin lip crayon & lip liquid warna elegan.',
    price: 'Rp 130.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/esqa.jpg'),
  },
  {
    id: 'lip 2',
    category: 'Lip',
    emoji: '💄',
    title: 'MAKE OVER powerstay lip pigment',
    brand: 'MAKE OVER',
    description: 'Lipstick matte ringan dan tahan lama.',
    price: 'Rp 115.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/lip.jpg'),
  },
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

  // Blush
  {
    id: 'blush 1',
    category: 'Blush',
    emoji: '🌸',
    title: 'Rosy Gleam: Luxcrime',
    brand: 'Luxcrime',
    description: 'Second skin cream blush, tekstur lembut.',
    price: 'Rp 90.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/luxcrime.jpg'),
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
    id: 'blush 3',
    category: 'Blush',
    emoji: '🌸',
    title: 'Tavi cream blush',
    brand: 'Tavi',
    description: 'Cream blush dengan warna buildable.',
    price: 'Rp 65.000',
    rating: 4.9,
    reviews: [],
    image: require('@/assets/images/tavi.jpg'),
  },
];

// StarRating komponen tetap sama
function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" />);
  }
  if (halfStar) {
    stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
  }
  while (stars.length < 5) {
    stars.push(<Ionicons key={`empty-${stars.length}`} name="star-outline" size={16} color="#FFD700" />);
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<typeof exploreProducts>([]);

  const router = useRouter();

  const categories = Array.from(new Set(exploreProducts.map(p => p.category)));
  const filteredProducts = selectedCategory
    ? exploreProducts.filter(p => p.category === selectedCategory)
    : exploreProducts;

  const addToCart = (product: typeof exploreProducts[0]) => {
    setCartItems(prev => [...prev, product]);
  };

  const renderProduct = ({ item }: { item: typeof exploreProducts[0] }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => {
      router.push({
        pathname: '/productdetail',
        params: {
          product: JSON.stringify(item),
          from: 'explore',  // kirim info halaman asal
        },
      });
    }}
    style={styles.productCard}
  >
    <Image source={item.image} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productTitle}>
        <Text style={{ fontSize: 20 }}>{item.emoji} </Text>
        {item.title}
      </Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>

      <View style={styles.buyCartContainer}>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={(e) => {
            // Jangan biarkan event onPress dari parent (TouchableOpacity) ikut ter-trigger saat klik tombol ini
            e.stopPropagation?.();

            const newCart = [...cartItems, item];
            setCartItems(newCart);
            router.push({
              pathname: '/checkout',
              params: {
                cart: encodeURIComponent(JSON.stringify(newCart)),
              },
            });
          }}
        >
          <Text style={styles.buyButtonText}>Beli Sekarang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={(e) => {
            e.stopPropagation?.();
            addToCart(item);
          }}
        >
          <Ionicons name="cart" size={24} color="#D6336C" />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFE6F0' }}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={[styles.container, { paddingBottom: 20 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.headerContainer}>
              <Image source={headerImage} style={styles.headerImage} resizeMode="cover" />

              <TouchableOpacity
                style={styles.cartIconContainer}
                onPress={() => {
                  router.push({
                    pathname: '/checkout',
                    params: {
                      cart: encodeURIComponent(JSON.stringify(cartItems)),
                    },
                  });
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="cart" size={28} color="#D6336C" />
                {cartItems.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  selectedCategory === null && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text style={styles.categoryText}>Semua</Text>
              </TouchableOpacity>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        }
        ListFooterComponent={
  <View style={[styles.footerButtons, { marginTop: 20, marginBottom: 30 }]}>
    <TouchableOpacity onPress={() => router.push('/home')} style={styles.backButton}>
      <Text style={styles.backButtonText}>⬅️ 🎀 Kembali</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push('/preloved')} style={styles.nextButton}>
      <Text style={styles.nextButtonText}>💖 Selanjutnya ➡️</Text>
    </TouchableOpacity>
  </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    width: windowWidth - 32,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 16,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  cartIconContainer: {
  position: 'absolute',
  top: 20,
  right: 20,
  backgroundColor: '#fff',
  padding: 8,
  borderRadius: 20,
  elevation: 3,
  },
  cartBadge: {
    position: 'absolute',
    right: 4,
    top: 4,
    backgroundColor: '#D6336C',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  categoryScroll: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderColor: '#D6336C',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#D6336C',
  },
  categoryText: {
    color: '#B0003A',
    fontWeight: '700',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#B0003A',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    padding: 12,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
  },
  productInfo: { flex: 1 },
  productTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B0003A',
  },
  productBrand: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D6336C',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 6,
    fontWeight: '700',
    color: '#B0003A',
  },
  productDescription: {
    fontSize: 14,
    color: '#B0003A',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#B0003A',
  },
  buyCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  buyButton: {
    backgroundColor: '#D6336C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  cartButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D6336C',
    padding: 8,
    borderRadius: 20,
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
    borderRadius: 24,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
  nextButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#B0003A',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 24,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
  loveButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: '#fff',
  padding: 6,
  borderRadius: 20,
  elevation: 3,
  shadowColor: '#FF5C8A',
  shadowOpacity: 0.3,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},
}); 