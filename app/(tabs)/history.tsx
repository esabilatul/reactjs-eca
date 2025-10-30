import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

type OrderItem = {
  id: string;
  title: string;
  qty: number;
  price: string;
};

type Order = {
  id: string;
  date: string;
  total: string;
  status: string;
  items: OrderItem[];
  customer: {
    name: string;
    address: string;
    phone: string;
    paymentMethod: string;
  };
};

export default function HistoryScreen() {
  const router = useRouter();
  const { orders, sourceScreen } = useLocalSearchParams<{ orders?: string; sourceScreen?: string }>();
  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    if (orders) {
      const newOrders: Order[] = JSON.parse(decodeURIComponent(orders));
      setOrderList(newOrders);
    }
  }, [orders]);

  const handleOkPress = () => {
    // LANGSUNG navigasi tanpa delay
    if (sourceScreen === 'preloved') {
      router.replace('/preloved?reset=true');
    } else if (sourceScreen === 'explore') {
      router.replace('/explore?reset=true');
    } else {
      router.replace('/explore?reset=true');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>📜✨ Riwayat Pesananmu ✨📜</Text>

      {orderList.length === 0 ? (
        <Text style={styles.emptyText}>😢 Kamu belum punya riwayat pesanan nih.</Text>
      ) : (
        orderList.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderDate}>🗓️ {order.date}</Text>
            <Text style={[styles.orderStatus, order.status === 'Berhasil' ? styles.statusSuccess : styles.statusPending]}>
              📌 Status: {order.status}
            </Text>
            <Text style={styles.orderTotal}>💰 Total: {order.total}</Text>

            <Text style={styles.customerInfo}>👤 Nama: {order.customer.name}</Text>
            <Text style={styles.customerInfo}>🏠 Alamat: {order.customer.address}</Text>
            <Text style={styles.customerInfo}>📞 Telepon: {order.customer.phone}</Text>
            <Text style={styles.customerInfo}>💳 Metode Pembayaran: {order.customer.paymentMethod}</Text>

            <Text style={styles.itemsTitle}>🛍️ Daftar Produk:</Text>
            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text>✨ {item.title} x {item.qty}</Text>
                <Text>💵 {item.price}</Text>
              </View>
            ))}
          </View>
        ))
      )}

      <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
        <Text style={styles.okButtonText}>👍 OK, Kembali</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFE6F0' },
  title: { fontSize: 26, fontWeight: '900', marginBottom: 20, color: '#B0003A', textAlign: 'center' },
  emptyText: { fontSize: 18, textAlign: 'center', marginTop: 60, color: '#999' },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#B0003A',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  orderDate: { fontWeight: 'bold', fontSize: 16, marginBottom: 6, color: '#D6336C' },
  orderStatus: { fontStyle: 'italic', marginBottom: 6, fontWeight: '600' },
  statusSuccess: { color: '#28a745' },
  statusPending: { color: '#ffc107' },
  orderTotal: { marginBottom: 10, fontWeight: '700', fontSize: 16, color: '#B0003A' },
  customerInfo: { marginBottom: 4, fontSize: 14 },
  itemsTitle: { fontWeight: '700', marginTop: 10, marginBottom: 6, fontSize: 16, color: '#B0003A' },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 14,
  },
  okButton: {
    backgroundColor: '#B0003A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: 160,
    marginTop: 30,
    shadowColor: '#B0003A',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
});
