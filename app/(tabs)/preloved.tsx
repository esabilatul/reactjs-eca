import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;

const prelovedProducts = [
  {
    id: '1',
    title: 'loreal elseve hair serum',
    brand: 'Lavica',
    description: 'Serum perawatan rambut intensif memebrikan hasil rambut yang halus.',
    price: ' only Rp 65.000',
    rating: 4.9,
    reviews: [
      { id: 'r1', user: 'Anna', comment: 'biarpun preloved isinya masih banyak huhuhu.' },
      { id: 'r2', user: 'Elsa', comment: 'sering - sering stok produk prelovednya dong.' },
    ],
    image: require('@/assets/images/elseve.jpg'),
  },
  {
    id: '2',
    title: 'Grace and Glow Hair Mist',
    brand: 'Lavica',
    description: 'membantu tampilan rambut tampak sehat dan berkilau dengan sensasi wangi parfum mewah.',
    price: ' only Rp 35.000',
    rating: 4.9,
    reviews: [
      { id: 'r3', user: 'Citra', comment: 'rambut aku jadi wangi banget pake produk ini.' },
      { id: 'r4', user: 'Dian', comment: 'cuman disini dapet harga murah tapi ga murahan.' },
    ],
    image: require('@/assets/images/grace.jpg'),
  },
  {
    id: '3',
    title: 'Grace and Glow Nourish Shampoo',
    brand: 'Lavica',
    description: 'Bedak padat yang ringan dengan hasil matte natural.',
    price: ' only Rp 40.000',
    rating: 4.9,
    reviews: [
      { id: 'r5', user: 'Eka', comment: 'aku cocok banget pake shampoo ini kebetulan ada prelovednya di lavica.' },
    ],
    image: require('@/assets/images/glow.jpg'),
  },
  {
    id: '4',
    title: 'Bellagio',
    brand: 'Lavica',
    description: 'parfum dengan wangi maskulin dan tahan lama.',
    price: ' only Rp 30.000',
    rating: 4.9,
    reviews: [
      { id: 'r6', user: 'Fajar', comment: 'aku dapet masih banyak banget isinya, makasih lavica prelovednya.' },
    ],
    image: require('@/assets/images/belagio.jpg'),
  },
  {
    id: '5',
    title: 'Nivea bodyserum',
    brand: 'Lavica',
    description: 'mengandung niacinamide untuk mencerahkan kulit.',
    price: ' only Rp 25.000',
    rating: 4.9,
    reviews: [
      { id: 'r7', user: 'Gina', comment: 'aku cocok banget pake produk ini, dapet harga murah lagi makasih lavica.' },
    ],
    image: require('@/assets/images/nivea.jpg'),
  },
  {
    id: '6',
    title: 'ciara',
    brand: 'Lavica',
    description: 'membantu mengurangi stretchmark.',
    price: ' only Rp 45.000',
    rating: 4.9,
    reviews: [
      { id: 'r8', user: 'Hani', comment: 'stretchmark aku berkurang dapet harga murah dan isinya masih banyak, makasih lavica.' },
    ],
    image: require('@/assets/images/ciara.jpg'),
  },
];

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

  return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{stars}</View>;
}

export default function PrelovedScreen() {
  const [products] = useState(prelovedProducts);
  const [cartItems, setCartItems] = useState<typeof prelovedProducts>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const router = useRouter();

  const addToCart = (product: typeof prelovedProducts[0]) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const handleBuyNow = (product: typeof prelovedProducts[0]) => {
    const updatedCart = cartItems.find((item) => item.id === product.id)
      ? cartItems
      : [...cartItems, product];

    router.push({
      pathname: '/checkout',
      params: { cart: JSON.stringify(updatedCart) },
    });
  };

  const goToCheckout = () => {
    router.push({
      pathname: '/checkout',
      params: { cart: JSON.stringify(cartItems) },
    });
  };

  const renderReview = (review: { id: string; user: string; comment: string }) => (
    <View key={review.id} style={styles.reviewContainer}>
      <Text style={styles.reviewUser}>{review.user}</Text>
      <Text style={styles.reviewComment}>"{review.comment}"</Text>
    </View>
  );

  const renderProduct = ({ item }: { item: typeof prelovedProducts[0] }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: '/productdetail',
          params: {
            product: JSON.stringify(item),
            from: 'preloved', // info asalnya dari preloved
          },
        })
      }
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>

        <View style={styles.ratingContainer}>
          <StarRating rating={item.rating} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>

        <View style={styles.buyCartContainer}>
          <TouchableOpacity
            style={styles.buyButton}
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation(); // cegah onPress parent
              handleBuyNow(item);
            }}
          >
            <Text style={styles.buyButtonText}>Beli Sekarang</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartButton}
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation(); // cegah onPress parent
              addToCart(item);
            }}
          >
            <Ionicons name="cart" size={24} color="#D6336C" />
          </TouchableOpacity>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>Ulasan Pembeli</Text>
          {item.reviews.map(renderReview)}
        </View>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={{ flex: 1, backgroundColor: '#ffe6f0' }}>
      {/* Header Image with Cart Icon */}
      <View style={{ position: 'relative' }}>
        <Image
          source={require('@/assets/images/makeup3.jpg')}
          style={styles.headerImage}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: '#fff',
            borderRadius: 24,
            padding: 8,
            elevation: 6,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => setCartVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="cart" size={28} color="#D6336C" />
          {cartItems.length > 0 && (
            <View
              style={{
                backgroundColor: '#D6336C',
                borderRadius: 10,
                paddingHorizontal: 6,
                marginLeft: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <Text style={styles.headerTitle}>Preloved by Lavica</Text>
            <Text style={styles.headerDescription}>
              🌸 Pengen rambut wangi, tubuh fresh, tapi tetap hemat?{'\n'}
              Di sini tempatnya! ✨ Koleksi hair care & body care preloved Lavica masih super bagus & terawat.{'\n'}
              Ada hair serum biar rambut lembut, parfum biar makin pede, sampai shampoo andalan buat hari-hari kamu.{'\n'}
              Buruan cek, siapa cepat dia dapat! 🤍
            </Text>
          </View>
        }
        ListFooterComponent={
  <View style={styles.footerButtons}>
    <TouchableOpacity onPress={() => router.push('/explore')} style={styles.backButton}>
      <Text style={styles.backButtonText}>⬅️ 🎀 Kembali</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => router.push('/wishlist')} style={styles.nextButton}>
      <Text style={styles.nextButtonText}>💖 Selanjutnya ➡️</Text>
    </TouchableOpacity>
  </View>

        }
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal Keranjang */}
      <Modal visible={cartVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Keranjang Belanja</Text>
            {cartItems.length === 0 ? (
              <Text style={{ textAlign: 'center', marginVertical: 20, color: '#B0003A' }}>
                Keranjang kosong
              </Text>
            ) : (
              <ScrollView style={{ maxHeight: 300 }}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image source={item.image} style={styles.cartItemImage} />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.productTitle}>{item.title}</Text>
                      <Text style={styles.productPrice}>{item.price}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              onPress={() => setCartVisible(false)}
              style={styles.closeModalButton}
              activeOpacity={0.7}
            >
              <Text style={styles.closeModalButtonText}>Tutup</Text>
            </TouchableOpacity>

            {cartItems.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setCartVisible(false);
                  goToCheckout();
                }}
                style={[styles.closeModalButton, { backgroundColor: '#B0003A', marginTop: 8 }]}
                activeOpacity={0.7}
              >
                <Text style={styles.closeModalButtonText}>Checkout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#B0003A',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#B0003A',
    textAlign: 'center',
    fontFamily: 'serif',
    marginBottom: 12,
  },
  headerDescription: {
    fontSize: 15,
    color: '#B0003A',
    textAlign: 'center',
    lineHeight: 22,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#B0003A',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    padding: 12,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#B0003A',
    marginBottom: 2,
  },
  productBrand: {
    fontSize: 14,
    fontWeight: '700',
    color: '#D6336C',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    marginLeft: 6,
    fontWeight: '700',
    color: '#B0003A',
  },
  productDescription: {
    fontSize: 14,
    color: '#B0003A',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#B0003A',
  },
  buyCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  },
  cartButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 4,
    shadowColor: '#B0003A',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  reviewsSection: {
    marginTop: 12,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#B0003A',
    marginBottom: 6,
  },
  reviewContainer: {
    backgroundColor: '#FFE6F0',
    padding: 8,
    borderRadius: 12,
    marginBottom: 6,
  },
  reviewUser: {
    fontWeight: '700',
    color: '#B0003A',
  },
  reviewComment: {
    fontStyle: 'italic',
    color: '#B0003A',
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
    backgroundColor: '#B0003A',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
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
  backButtonText: {
    color: '#fff',
    fontWeight: '900',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(176, 0, 58, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#B0003A',
    marginBottom: 12,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  closeModalButton: {
    marginTop: 16,
    backgroundColor: '#B0003A',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
});
