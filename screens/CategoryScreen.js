// screens/CategoryScreen.js 
import React, { useMemo, useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

// ✅ JSON data import (all dishes with details)
import dishesData from '../data/Dishes.json';

// ✅ Reusable DishCard component import
import DishCard from '../components/DishCard';

// ✅ Cart context import (cart state & methods use karne ke liye)
import { useCart } from '../context/CartContext';

// ✅ Helper function: mealType ko normalize karta hai 
// (e.g. "main course", "Main", "MainCourse" -> sab ko "maincourse" banata hai)
const normalizeMealType = (m) => {
  const s = (m || '').toString().toLowerCase().trim();
  if (s.includes('main')) return 'maincourse';
  if (s.includes('start')) return 'starter';
  if (s.includes('dessert')) return 'dessert';
  if (s.includes('side')) return 'sides';
  return s;
};

export default function CategoryScreen({ mealType, navigation }) {
  // 🔎 Search query aur filter ke states
  const [query, setQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);

  // 🛒 Cart context se values nikal rahe hain
  const { totalCount, countByCategory } = useCart();

  // ✅ Step 1: mealType ke hisaab se dishes filter karna
  const baseList = useMemo(() => {
    const norm = mealType.toString().toLowerCase().trim();
    return dishesData.filter(d => normalizeMealType(d.mealType) === norm);
  }, [mealType]);

  // ✅ Step 2: Search + Veg/Non-Veg filters apply karna
  const displayed = useMemo(() => {
    return baseList.filter(item => {
      // search filter
      if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false;

      // veg / non-veg filter
      const t = (item.type || '').toString().toLowerCase().trim();
      if (vegOnly && !nonVegOnly) return t === 'veg';      // sirf veg
      if (nonVegOnly && !vegOnly) return t === 'non-veg';  // sirf non-veg
      return true;
    });
  }, [baseList, query, vegOnly, nonVegOnly]);

  // ✅ Ingredients screen pe navigate karne ka function
  const onIngredients = (dish) => {
    navigation.navigate('Ingredients', { dish });
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Top section: Search bar + Veg/Non-Veg filters */}
      <View style={styles.topRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search dishes..."
          style={styles.search}
        />

        {/* Veg toggle button */}
        <TouchableOpacity
          style={[styles.toggle, vegOnly && styles.activeToggle]}
          onPress={() => {
            setVegOnly(v => !v);
            setNonVegOnly(false); // dono ek saath active na ho
          }}
        >
          <Text style={styles.toggleText}>Veg</Text>
        </TouchableOpacity>

        {/* Non-Veg toggle button */}
        <TouchableOpacity
          style={[styles.toggle, nonVegOnly && styles.activeToggle]}
          onPress={() => {
            setNonVegOnly(v => !v);
            setVegOnly(false);
          }}
        >
          <Text style={styles.toggleText}>Non-Veg</Text>
        </TouchableOpacity>
      </View>

      {/* 🍲 Dish list render ho rahi hai FlatList se */}
      <FlatList
        data={displayed} // filtered dishes
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <DishCard dish={item} onIngredients={onIngredients} />
        )}
        // ✅ Niche space add karna (bottom bar ke overlap se bachane ke liye)
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* 🟢 Fixed bottom bar: selection summary + continue button */}
      <View style={styles.bottom}>
        {/* Category wise count */}
        <Text style={styles.bottomText}>
          {mealType} selected: {countByCategory(mealType)}
        </Text>

        {/* Total count */}
        <Text style={styles.bottomText}>Total selected: {totalCount}</Text>

        {/* Continue button */}
        <TouchableOpacity style={styles.continue}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Top bar (search + filters)
  topRow: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 8,
  },
  toggle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    marginLeft: 4,
  },
  activeToggle: { backgroundColor: '#c8f7dc' },
  toggleText: { fontWeight: '600' },

  // Bottom bar
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
  },
  bottomText: { fontWeight: '600' },
  continue: {
    backgroundColor: '#ff6600',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});
