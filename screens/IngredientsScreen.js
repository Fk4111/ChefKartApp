import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
// ✅ Local images load karne ke liye helper import kiya
import { getImage } from "../utils/imageLoader";

export default function IngredientsScreen({ route }) {
  // ✅ Dish ka data props se receive kar rahe hain
  const { dish } = route.params || {};

  // ✅ Agar dish hi nahi mila to fallback UI dikhayenge
  // fallback UI = jab data missing ho to ek safe/default UI dikhana
  if (!dish) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No dish data found</Text>
      </View>
    );
  }

  return (
    <FlatList
      // ✅ Ingredients data pass kar rahe hain
      data={dish.ingredients || []}
      keyExtractor={(item, index) => index.toString()}
      
      // ✅ Har ek ingredient render karna
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.text}>
            {item.name} - {item.quantity}
          </Text>
        </View>
      )}

      // ✅ Agar list empty ho to fallback message
      ListEmptyComponent={
        <Text style={styles.text}>No ingredients available</Text>
      }

      // ✅ Ye sab upar (header) me show hoga ek hi FlatList ke andar
      ListHeaderComponent={
        <View>
          {/* Dish Image (local assets se load ho rahi hai) */}
          {dish.image && (
            <Image
              source={getImage(dish.image)}  // ⚡ yahan local image mapping use kiya
              style={styles.image}
              resizeMode="cover"
            />
          )}

          {/* Dish Name */}
          <Text style={styles.title}>{dish.name}</Text>

          {/* Dish Description */}
          <Text style={styles.description}>
            {dish.description || "No description available"}
          </Text>

          {/* Ingredients Heading */}
          <Text style={styles.section}>Ingredients:</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
    paddingHorizontal: 16,
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111",
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    paddingHorizontal: 16,
  },
  dot: {
    fontSize: 18,
    marginRight: 8,
    color: "#ff6600",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

// ✅ Ye screen dish ka image, name, description aur ingredients list dikhayegi
// ✅ Images ab local assets folder se load hongi via getImage()
