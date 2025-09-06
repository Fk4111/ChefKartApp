// utils/imageLoader.js ka code

const images = {
    butter_chicken: require('../Assets/images/butter_chicken.jpg'),
    tomato_soup: require('../Assets/images/tomato_soup.jpg'),
    spring_roll: require('../Assets/images/spring_roll.jpg'),
    veg_biryani: require('../Assets/images/veg_biryani.webp'),
    butter_naan: require('../Assets/images/butter_naan.jpg'),
    chicken_biryani: require('../Assets/images/chicken_biryani.jpg'),
    chicken_tikka: require('../Assets/images/chicken_tikka.jpg'),
    chole_bhature: require('../Assets/images/chole_bhature.webp'),
    dal_makhani: require('../Assets/images/dal_makhani.jpg'),
    egg_curry: require('../Assets/images/egg_curry.jpg'),
    fish_curry: require('../Assets/images/fish_curry.jpg'),
    fish_fingers: require('../Assets/images/fish_fingers.jpg'),
    gajar_halwa: require('../Assets/images/gajar_halwa.jpg'),
    green_salad: require('../Assets/images/green_salad.jpg'),
    gulab_jamun: require('../Assets/images/gulab_jamun.webp'),
    hara_bhara_kabab: require('../Assets/images/hara_bhara_kabab.webp'),
    jalebi: require('../Assets/images/jalebi.webp'),
    kheer: require('../Assets/images/kheer.jpg'),
    mutton_rogan_josh: require('../Assets/images/mutton_rogan_josh.jpg'),
    mutton_seekh_kabab: require('../Assets/images/mutton_seekh_kabab.jpg'),
    palak_paneer: require('../Assets/images/palak_paneer.webp'),
    paneer_butter_masala: require('../Assets/images/paneer_butter_masala.jpg'),
    paneer_tikka: require('../Assets/images/paneer_tikka.png'),
    papad: require('../Assets/images/papad.jpg'),
    plain_rice: require('../Assets/images/plain_rice.jpg'),
    prawn_masala: require('../Assets/images/prawn_masala.jpg'),
    rabri_dessert: require('../Assets/images/rabri_dessert.webp'),
    raita: require('../Assets/images/raita.webp'),
    rasgulla: require('../Assets/images/rasgulla.jpg'),
    sandesh: require('../Assets/images/sandesh.jpg'),
    veg_manchurian: require('../Assets/images/veg_manchurian.jpg')

};



// ✅ Function jo dish ke naam se image return karega
export function getImage(name) {
  return images[name] || require("../Assets/images/placeholder_image.jpg");
  // agar koi image missing hai to placeholder dikhegi
}