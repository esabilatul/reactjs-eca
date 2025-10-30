import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

type Tip = {
  id: string;
  title: string;
  description: string;
};

const makeupTips: Tip[] = [
  {
    id: 'tip1',
    title: '✨ Gunakan Primer',
    description:
      'Primer membantu makeup menempel lebih baik dan tahan lama, serta menyamarkan pori-pori.',
  },
  {
    id: 'tip2',
    title: '🎨 Pilih Foundation Sesuai Warna Kulit',
    description:
      'Cocokkan warna foundation dengan lehermu agar hasilnya terlihat natural dan merata.',
  },
  {
    id: 'tip3',
    title: '💦 Gunakan Setting Spray',
    description:
      'Setting spray menjaga makeup tetap segar dan tidak luntur sepanjang hari.',
  },
  {
    id: 'tip4',
    title: '👁️ Blend Eyeshadow dengan Baik',
    description:
      'Gunakan brush yang lembut untuk membaurkan eyeshadow agar warnanya halus dan tidak patchy.',
  },
  {
    id: 'tip5',
    title: '💡 Gunakan Highlighter Secukupnya',
    description:
      'Aplikasikan highlighter di tulang pipi, hidung, dan dagu untuk efek glowing natural.',
  },
  {
    id: 'tip6',
    title: '👄 Pilih Lipstik yang Melembapkan',
    description:
      'Gunakan lip balm sebelum memakai lipstik agar bibir tetap lembap dan tidak kering.',
  },
  {
    id: 'tip7',
    title: '🧴 Bersihkan Wajah Sebelum Makeup',
    description:
      'Pastikan wajahmu bersih dan lembap agar makeup menempel lebih baik.',
  },
  {
    id: 'tip8',
    title: '🧽 Gunakan Beauty Blender yang Basah',
    description:
      'Beauty blender yang sedikit lembap membantu aplikasi foundation lebih rata.',
  },
  {
    id: 'tip9',
    title: '🖌️ Sisir Alis Sebelum dan Sesudah Diisi',
    description:
      'Sisir alis untuk merapikan bentuknya dan meratakan produk eyebrow.',
  },
  {
    id: 'tip10',
    title: '🌟 Jangan Lupa Double Cleansing Setelah Makeup',
    description:
      'Hapus makeup dengan pembersih wajah dan lanjutkan dengan cleanser agar wajah bersih maksimal.',
  },
];

const TipsScreen = () => {
  const router = useRouter();

  const renderTip = ({ item }: { item: Tip }) => (
    <View style={styles.card}>
      <Text style={styles.tipTitle}>{item.title}</Text>
      <Text style={styles.tipDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✨ Tips Makeup ✨</Text>
      <Text style={styles.subHeader}>by Lavica 💄✨</Text>

      <FlatList
        data={makeupTips}
        keyExtractor={(item) => item.id}
        renderItem={renderTip}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            <View style={styles.recommendationContainer}>
              <Text style={styles.recommendationTitle}>🎥 Rekomendasi Tutorial Lainnya:</Text>

              <TouchableOpacity
                onPress={() => Linking.openURL('https://youtu.be/R8kAyTsXg3w?si=C9to-Q4AUVE-oCrh')}
                style={styles.recommendationButton}
              >
                <Text style={styles.recommendationText}>💖 Tutorial Makeup pemula</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL('https://youtu.be/CPdk3hIWBuc?si=mdOkaW7yYYxnsMjD')}
                style={styles.recommendationButton}
              >
                <Text style={styles.recommendationText}>✨ Flawless Makeup Look</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerButtons}>
  <TouchableOpacity
    onPress={() => router.push('/promo')}
    style={styles.backButton}
  >
    <Text style={styles.backButtonText}>⬅️ 🎀 Kembali</Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => router.push('/tips2')} // bisa diganti sesuai halaman berikutnya
    style={styles.nextButton}
  >
    <Text style={styles.nextButtonText}>💖 Selanjutnya ➡️</Text>
  </TouchableOpacity>
</View>
          </>
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
    marginBottom: 5,
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B0003A',
    textAlign: 'center',
    marginBottom: 25,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#8B2F57',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4B1D3F',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 16,
    color: '#7A4B65',
    lineHeight: 24,
  },
  recommendationContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B2F57',
    marginBottom: 10,
  },
  recommendationButton: {
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: '#B0003A',
    textDecorationLine: 'underline',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 24,
    gap: 16
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
    shadowColor: '#D6336C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
  },
});

export default TipsScreen;
