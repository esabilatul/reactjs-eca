import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CheckoutScreen() {
  const { cart, sourceScreen } = useLocalSearchParams<{ cart?: string; sourceScreen?: string }>();
  const router = useRouter();

  const initialCartItems = cart ? JSON.parse(decodeURIComponent(cart)) : [];
  const [cartItems, setCartItems] = useState<
    { item: typeof initialCartItems[0]; quantity: number }[]
  >([]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');

  useEffect(() => {
    const countMap: Record<
      string,
      { item: typeof initialCartItems[0]; quantity: number }
    > = {};
    initialCartItems.forEach((product: typeof initialCartItems[0]) => {
      if (countMap[product.id]) {
        countMap[product.id].quantity += 1;
      } else {
        countMap[product.id] = { item: product, quantity: 1 };
      }
    });
    setCartItems(Object.values(countMap));
  }, []);

  const incrementQty = (productId: string) => {
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.item.id === productId ? { ...ci, quantity: ci.quantity + 1 } : ci
      )
    );
  };

  const decrementQty = (productId: string) => {
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.item.id === productId
          ? { ...ci, quantity: ci.quantity > 1 ? ci.quantity - 1 : 1 }
          : ci
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== productId));
  };

  const priceToNumber = (price: string) => Number(price.replace(/[^0-9]/g, ''));

  const formatPrice = (num: number) => {
    return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const totalPrice = cartItems.reduce(
    (total, ci) => total + priceToNumber(ci.item.price) * ci.quantity,
    0
  );

  const handleConfirmOrder = () => {
  if (!name.trim() || !address.trim() || !phone.trim()) {
    Alert.alert('Data kurang lengkap', 'Mohon isi nama, alamat, dan nomor telepon dengan lengkap 😅');
    return;
  }

  Alert.alert(
    'Checkout berhasil! 💖',
    `Nama: ${name}\nAlamat: ${address}\nTelepon: ${phone}\nMetode Pembayaran: ${paymentMethod}`
  );

  const newOrder = {
    id: Date.now().toString(),
    date: new Date().toLocaleString(),
    total: formatPrice(totalPrice),
    status: 'Berhasil',
    items: cartItems.map(ci => ({
      id: ci.item.id,
      title: ci.item.title,
      qty: ci.quantity,
      price: ci.item.price,
    })),
    customer: {
      name,
      address,
      phone,
      paymentMethod,
    }
  };

  const encodedOrder = encodeURIComponent(JSON.stringify([newOrder]));

  // Clear form dan cart dulu
  setCartItems([]);
  setName('');
  setAddress('');
  setPhone('');
  setPaymentMethod('Transfer Bank');

  // Langsung navigasi ke halaman history dengan order baru
  router.replace(`/history?orders=${encodedOrder}`);
};


  const paymentOptions = [
    { label: 'Transfer Bank 🏦', value: 'Transfer Bank' },
    { label: 'COD 💰', value: 'COD' },
    { label: 'Kartu Kredit/Debit 💳', value: 'Kartu Kredit/Debit' },
    { label: 'E-Wallet 📱', value: 'E-Wallet' },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFE6F0', padding: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>🛒 Keranjang Belanja</Text>
      {cartItems.length === 0 ? (
        <Text
          style={{ textAlign: 'center', marginTop: 20, color: '#B0003A' }}
        >
          Keranjang kosong 😢
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.item.id}
            renderItem={({ item }) => {
              const subtotal = priceToNumber(item.item.price) * item.quantity;
              return (
                <View style={styles.cartItem}>
                  <Image source={item.item.image} style={styles.image} />
                  <View style={styles.info}>
                    <Text style={styles.name}>{item.item.title}</Text>
                    <Text style={styles.price}>{item.item.price}</Text>
                    <Text style={styles.subtotalText}>
                      Subtotal: {formatPrice(subtotal)}
                    </Text>

                    <View style={styles.qtyContainer}>
                      <TouchableOpacity
                        onPress={() => decrementQty(item.item.id)}
                        style={styles.qtyButton}
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={24}
                          color="#D6336C"
                        />
                      </TouchableOpacity>

                      <Text style={styles.qtyText}>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() => incrementQty(item.item.id)}
                        style={styles.qtyButton}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={24}
                          color="#D6336C"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => removeItem(item.item.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="trash-outline" size={24} color="#D6336C" />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>👤 Nama Penerima</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan nama lengkap"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>✉️ Alamat Pengiriman</Text>
            <TextInput
              style={[styles.textInput, { height: 80 }]}
              placeholder="Masukkan alamat lengkap"
              multiline
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.inputLabel}>📞 Nomor Telepon</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan nomor telepon"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Text style={styles.inputLabel}>Metode Pembayaran</Text>
            {paymentOptions.map(({ label, value }) => (
              <TouchableOpacity
                key={value}
                style={styles.paymentOption}
                onPress={() => setPaymentMethod(value)}
              >
                <Ionicons
                  name={
                    paymentMethod === value
                      ? 'radio-button-on'
                      : 'radio-button-off'
                  }
                  size={20}
                  color="#D6336C"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.paymentOptionText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: {formatPrice(totalPrice)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleConfirmOrder}
            >
              <Text style={styles.checkoutButtonText}>
                ✅ Konfirmasi Pesanan 🎉
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#B0003A',
    marginBottom: 16,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#B0003A',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '900',
    fontSize: 16,
    color: '#B0003A',
  },
  price: {
    color: '#D6336C',
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 4,
  },
  subtotalText: {
    color: '#B0003A',
    fontWeight: '600',
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    paddingHorizontal: 8,
  },
  qtyText: {
    fontWeight: '700',
    fontSize: 16,
    marginHorizontal: 8,
    color: '#B0003A',
  },
  removeButton: {
    padding: 8,
  },
  formContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: '#B0003A',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D6336C',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    color: '#000',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#B0003A',
  },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#D6336C',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#B0003A',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: '#D6336C',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
});
