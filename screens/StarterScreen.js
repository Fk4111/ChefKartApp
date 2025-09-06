// screens/StarterScreen.js
import React from "react";
import CategoryScreen from "./CategoryScreen";

export default function StarterScreen(props) {
  return <CategoryScreen {...props} mealType="starter" />;
}
