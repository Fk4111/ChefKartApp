// screens/SidesScreen.js
import React from "react";
import CategoryScreen from "./CategoryScreen";

export default function SidesScreen(props) {
  return <CategoryScreen {...props} mealType="sides" />;
}
