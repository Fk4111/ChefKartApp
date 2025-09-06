// screens/DessertScreen.js
import React from "react";
import CategoryScreen from "./CategoryScreen";

export default function DessertScreen(props) {
  return <CategoryScreen {...props} mealType="dessert" />;
}
