// screens/MainCourseScreen.js

import React from "react";
import CategoryScreen from "./CategoryScreen";

// ✅ Ye component CategoryScreen ko wrap karta hai
// aur mealType="MAINCOURSE" fix karke bhejta hai
// Taake CategoryScreen sirf Main Course wale dishes dikhaaye
export default function MainCourseScreen(props) {
  // props forward kar diye CategoryScreen ko (navigation wagairah ke liye)
  return <CategoryScreen {...props} mealType="MAINCOURSE" />;
}
