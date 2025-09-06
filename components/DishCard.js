// components/DishCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// ✅ Cart context import kiya (add/remove cart functionality ke liye)
import { useCart } from '../context/CartContext';

// ✅ Local image loader (assets se image load karne ke liye)
import { getImage } from '../utils/imageLoader';

export default function DishCard({ dish, onIngredients }) {
  // ✅ Cart context se functions liye
  const { addToCart, removeFromCart, isInCart } = useCart();

  // ✅ Check kar rahe hain dish already cart me hai ya nahi
  const selected = isInCart(dish.id);

  return (
    <View style={[styles.card, selected && styles.selected]}>
      {/* ✅ Image local assets se load ho rahi hai (pehle URI issue aa raha tha) */}
      <Image
        source={getImage(dish.image)} 
        style={styles.image}
      />

      <View style={styles.info}>
        {/* ✅ Dish ka naam show */}
        <Text style={styles.name}>{dish.name}</Text>

        {/* ✅ Description max 2 lines tak limited */}
        <Text style={styles.desc} numberOfLines={2}>
          {dish.description}
        </Text>

        {/* ✅ Price show karna */}
        <Text style={styles.price}>₹ {dish.price}</Text>

        {/* ✅ Add/Remove aur Ingredients ke buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            // agar already cart me hai -> Remove, warna Add
            onPress={() => (selected ? removeFromCart(dish.id) : addToCart(dish))}
            style={[styles.btn, selected ? styles.removeBtn : styles.addBtn]}
          >
            <Text style={styles.btnText}>{selected ? 'Remove' : 'Add'}</Text>
          </TouchableOpacity>

          {/* ✅ Ingredients button -> details page kholega */}
          <TouchableOpacity 
            onPress={() => onIngredients(dish)} 
            style={[styles.btn, styles.linkBtn]}
          >
            <Text style={styles.linkText}>Ingredients</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ✅ Stylesheet for DishCard
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  selected: { borderWidth: 2, borderColor: '#2ecc71' }, // ✅ Selected dish highlight
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700' },
  desc: { fontSize: 13, color: '#666', marginVertical: 4 },
  price: { fontSize: 14, fontWeight: '600', color: '#111' },
  actions: { flexDirection: 'row', marginTop: 8 },
  btn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 8 },
  addBtn: { backgroundColor: '#ff6600' }, // ✅ Orange Add button
  removeBtn: { backgroundColor: '#ccc' }, // ✅ Grey Remove button
  btnText: { color: '#fff', fontWeight: '600' },
  linkBtn: { backgroundColor: 'transparent' },
  linkText: { color: '#007aff', fontWeight: '600' }, // ✅ Blue Ingredients link
});
// ✅ Ye component ek dish card dikhata hai jisme image, name, description,  buttons hote hain future me price add bhi kr sakte hain