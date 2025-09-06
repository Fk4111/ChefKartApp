// screens/CartScreen.js
//React Native me JSX ke liye ab explicit React import ki requirement nahi hoti isliye maine import nh kiya

import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import DishCard from '../components/DishCard';

export default function CartScreen() {
  // 🛒 Cart context se selected dishes nikaalte hain
  const { cart } = useCart();

  return (
    <View style={styles.container}>
      {/* 🔹 Heading */}
      <Text style={styles.header}>Your Selected Dishes</Text>

      {/* ❌ Agar cart empty hai to ek message show karo */}
      {cart.length === 0 ? (
        <Text style={styles.empty}>No dishes selected yet</Text>
      ) : (
        // ✅ Agar cart me dishes hain to unki list show karo
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            // 🔹 DishCard reuse kiya but buttons disable kar diye
            <DishCard dish={item} disableButtons />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  header: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16 }
});
