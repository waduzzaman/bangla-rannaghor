"use client";
import React, { useState, useEffect, useCallback } from 'react';

// --- MOCK DATA STRUCTURE (55 Bangladeshi Recipes) ---
// Note: In a real Next.js app, this data would come from an API or file system.

const initialRecipes = [
  // --- Rice Dishes (6) ---
  { id: 1, slug: "kacchi-biryani", title: "Kacchi Biryani", excerpt: "A classic dish where raw marinated mutton is slow-cooked with rice.", image: "https://placehold.co/400x250/500000/ffffff?text=Kacchi+Biryani", category: "Rice Dishes", prepTime: "60 min", cookTime: "90 min", ingredients: ["Basmati Rice", "Mutton", "Yogurt", "Potatoes", "Spices"], instructions: ["Marinate mutton.", "Layer rice and mutton in a pot.", "Seal and cook on low heat."] },
  { id: 2, slug: "morog-polao", title: "Morog Polao", excerpt: "Fragrant rice cooked with chicken, milk, and traditional spices.", image: "https://placehold.co/400x250/22c55e/ffffff?text=Morog+Polao", category: "Rice Dishes", prepTime: "30 min", cookTime: "45 min", ingredients: ["Polao Rice", "Chicken", "Ginger Paste", "Saffron", "Ghee"], instructions: ["Fry chicken lightly.", "Cook rice with chicken and spices.", "Steam until tender."] },
  { id: 3, slug: "shrimp-polao", title: "Chingri Polao", excerpt: "A popular pilaf cooked with delicate small shrimp and aromatic spices.", image: "https://placehold.co/400x250/06b6d4/ffffff?text=Chingri+Polao", category: "Rice Dishes", prepTime: "20 min", cookTime: "35 min", ingredients: ["Polao Rice", "Shrimp", "Onion", "Turmeric", "Green Chilies"], instructions: ["Sauté shrimp and set aside.", "Cook rice with spices.", "Add shrimp back and steam."] },
  { id: 4, slug: "khichuri-light", title: "Simple Khichuri", excerpt: "A simple, comforting rice and lentil porridge, perfect for a rainy day.", image: "https://placehold.co/400x250/fbbf24/000000?text=Simple+Khichuri", category: "Rice Dishes", prepTime: "15 min", cookTime: "30 min", ingredients: ["Rice", "Masoor Dal", "Ginger", "Turmeric", "Ghee"], instructions: ["Wash rice and dal.", "Boil with spices and water.", "Simmer until mushy."] },
  { id: 5, slug: "panta-bhat", title: "Panta Bhat", excerpt: "Fermented rice soaked overnight, a traditional farmer's breakfast.", image: "https://placehold.co/400x250/ef4444/ffffff?text=Panta+Bhat", category: "Rice Dishes", prepTime: "5 min", cookTime: "Overnight", ingredients: ["Cooked Rice", "Water", "Salt", "Lemon/Chili"], instructions: ["Soak cooked rice in water overnight.", "Serve cold with condiments."] },
  { id: 6, slug: "tehari", title: "Beef Tehari", excerpt: "A spicier, richer version of pilaf where meat and rice are cooked together.", image: "https://placehold.co/400x250/9333ea/ffffff?text=Beef+Tehari", category: "Rice Dishes", prepTime: "40 min", cookTime: "60 min", ingredients: ["Beef", "Short-grain Rice", "Mustard Oil", "Allspice", "Yogurt"], instructions: ["Marinate and cook beef.", "Add rice and water.", "Steam until done."] },

  // --- Fish Curries (6) ---
  { id: 7, slug: "shorshe-ilish", title: "Shorshe Ilish (Mustard Hilsa)", excerpt: "Hilsa fish cooked in a pungent mustard paste, a Bengali delicacy.", image: "https://placehold.co/400x250/dc2626/ffffff?text=Shorshe+Ilish", category: "Fish Curries", prepTime: "25 min", cookTime: "30 min", ingredients: ["Hilsa Fish", "Mustard Seeds", "Green Chilies", "Turmeric", "Mustard Oil"], instructions: ["Prepare mustard paste.", "Marinate fish.", "Cook in minimal oil and steam."] },
  { id: 8, slug: "doi-maach", title: "Doi Maach (Yogurt Fish)", excerpt: "Rohu or Katla fish simmered in a creamy, mild yogurt-based gravy.", image: "https://placehold.co/400x250/2563eb/ffffff?text=Doi+Maach", category: "Fish Curries", prepTime: "20 min", cookTime: "40 min", ingredients: ["Rohu Fish", "Yogurt", "Ginger Paste", "Cumin", "Bay Leaf"], instructions: ["Fry fish lightly.", "Make a curry with yogurt and spices.", "Simmer the fish until gravy thickens."] },
  { id: 9, slug: "chingri-malaikari", title: "Chingri Malaikari", excerpt: "Prawns cooked in a rich, mild coconut milk sauce, often served at celebrations.", image: "https://placehold.co/400x250/d97706/ffffff?text=Chingri+Malaikari", category: "Fish Curries", prepTime: "30 min", cookTime: "45 min", ingredients: ["Prawns", "Coconut Milk", "Garam Masala", "Ghee", "Cashew Paste"], instructions: ["Sauté prawns.", "Simmer in coconut milk and spices.", "Finish with ghee."] },
  { id: 10, slug: "rui-kalia", title: "Rui Machher Kalia", excerpt: "A traditional celebratory curry made with large pieces of Rui (Rohu) fish.", image: "https://placehold.co/400x250/16a34a/ffffff?text=Rui+Kalia", category: "Fish Curries", prepTime: "30 min", cookTime: "40 min", ingredients: ["Rui Fish", "Onion Paste", "Tomato", "Yogurt", "Red Chili Powder"], instructions: ["Fry fish.", "Prepare a thick, spicy gravy base.", "Add fish and cook until gravy is rich."] },
  { id: 11, slug: "macher-jhol-bata", title: "Bata Macher Jhol", excerpt: "A light and watery curry for quick digestion, often served with turmeric and ginger.", image: "https://placehold.co/400x250/be123c/ffffff?text=Bata+Jhol", category: "Fish Curries", prepTime: "10 min", cookTime: "20 min", ingredients: ["Bata Fish", "Potatoes", "Cumin Powder", "Turmeric", "Cilantro"], instructions: ["Sauté the fish and vegetables.", "Add water and spices.", "Boil until flavors meld."] },
  { id: 12, slug: "shutki-curry", title: "Shutki Curry (Dried Fish)", excerpt: "A spicy and pungent dried fish curry, highly popular in coastal areas.", image: "https://placehold.co/400x250/7c3aed/ffffff?text=Shutki+Curry", category: "Fish Curries", prepTime: "40 min", cookTime: "40 min", ingredients: ["Dried Fish", "Garlic", "Onion", "Lots of Chili", "Mustard Oil"], instructions: ["Clean and soak dried fish.", "Cook with a generous amount of garlic and chilies.", "Serve hot and spicy."] },

  // --- Meat Curries (6) ---
  { id: 13, slug: "kala-bhuna", title: "Chittagong Kala Bhuna (Beef)", excerpt: "Beef slow-cooked until tender and dark in color with a mix of special spices.", image: "https://placehold.co/400x250/44403c/ffffff?text=Kala+Bhuna", category: "Meat Curries", prepTime: "60 min", cookTime: "180 min", ingredients: ["Beef Cubes", "Kala Bhuna Masala", "Mustard Oil", "Yogurt", "Onion"], instructions: ["Marinate beef.", "Slow cook for several hours until oil separates and meat is dark.", "Temper with fried onions."] },
  { id: 14, slug: "kosha-mangsho", title: "Kosha Mangsho (Mutton)", excerpt: "A popular Bengali mutton curry where the meat is braised in a rich, caramelized onion base.", image: "https://placehold.co/400x250/84cc16/000000?text=Kosha+Mangsho", category: "Meat Curries", prepTime: "45 min", cookTime: "120 min", ingredients: ["Mutton", "Onion Paste", "Ginger-Garlic", "Potatoes", "Garam Masala"], instructions: ["Brown the onions.", "Add mutton and spices; cook (Kosha) until tender and dry.", "Add water and simmer."] },
  { id: 15, slug: "chicken-rezala", title: "Chicken Rezala", excerpt: "A mild, Mughlai-influenced curry with chicken cooked in a white, nutty gravy.", image: "https://placehold.co/400x250/f97316/ffffff?text=Chicken+Rezala", category: "Meat Curries", prepTime: "30 min", cookTime: "45 min", ingredients: ["Chicken", "Cashew Paste", "Poppy Seeds", "Kewra Water", "Yogurt"], instructions: ["Marinate chicken.", "Cook in a white gravy of nuts and yogurt.", "Finish with aromatic water."] },
  { id: 16, slug: "dimer-dalna", title: "Dimer Dalna (Egg Curry)", excerpt: "Hard-boiled eggs cooked in a simple, flavorful tomato and potato gravy.", image: "https://placehold.co/400x250/a855f7/ffffff?text=Dimer+Dalna", category: "Meat Curries", prepTime: "20 min", cookTime: "30 min", ingredients: ["Eggs", "Potatoes", "Tomato", "Ginger", "Cumin"], instructions: ["Fry boiled eggs.", "Make a potato and tomato gravy.", "Simmer eggs in the gravy."] },
  { id: 17, slug: "beef-aloo-jhol", title: "Beef and Potato Curry", excerpt: "A thin, hearty curry featuring tender beef and soft potatoes, ideal with rice.", image: "https://placehold.co/400x250/ef4444/ffffff?text=Beef+Aloo+Jhol", category: "Meat Curries", prepTime: "20 min", cookTime: "75 min", ingredients: ["Beef", "Potatoes", "Onion", "Turmeric", "Coriander"], instructions: ["Brown the beef.", "Add potatoes and cook with spices.", "Add water and pressure cook until soft."] },
  { id: 18, slug: "chicken-jhal-fry", title: "Chicken Jhal Fry", excerpt: "A dry, spicy chicken stir-fry with peppers, onions, and lots of chilies.", image: "https://placehold.co/400x250/0ea5e9/ffffff?text=Chicken+Jhal+Fry", category: "Meat Curries", prepTime: "15 min", cookTime: "25 min", ingredients: ["Chicken Strips", "Bell Peppers", "Onions", "Soy Sauce", "Hot Chili Sauce"], instructions: ["Stir-fry vegetables and chicken.", "Add sauces and spices.", "Cook until dry and heavily coated."] },

  // --- Vegetable Bhaji (5) ---
  { id: 19, slug: "aloo-bhaji", title: "Aloo Bhaji (Potato Fry)", excerpt: "Simple, finely diced potatoes fried with turmeric and onions.", image: "https://placehold.co/400x250/facc15/000000?text=Aloo+Bhaji", category: "Vegetable Bhaji", prepTime: "10 min", cookTime: "20 min", ingredients: ["Potatoes", "Onion", "Turmeric", "Green Chilies", "Mustard Oil"], instructions: ["Dice potatoes finely.", "Fry onions and chilies.", "Add potatoes and spices; cook until soft and crisp."] },
  { id: 20, slug: "shukto", title: "Shukto (Mixed Veg Curry)", excerpt: "A slightly bitter, creamy mixed vegetable curry, often served at the start of a meal.", image: "https://placehold.co/400x250/22d3ee/000000?text=Shukto", category: "Vegetable Bhaji", prepTime: "40 min", cookTime: "45 min", ingredients: ["Mixed Veg (e.g., Bitter Gourd, Drumsticks)", "Milk", "Ginger", "Radhuni Powder"], instructions: ["Fry vegetables separately.", "Cook the gravy with milk and ginger.", "Combine vegetables and simmer."] },
  { id: 21, slug: "lau-shak-bhaji", title: "Lau Shak (Bottle Gourd Leaves) Bhaji", excerpt: "Bottle gourd leaves stir-fried with small prawns or dried fish for flavor.", image: "https://placehold.co/400x250/99f6e4/000000?text=Lau+Shak+Bhaji", category: "Vegetable Bhaji", prepTime: "15 min", cookTime: "25 min", ingredients: ["Lau Shak Leaves", "Garlic", "Onion", "Chingri (Prawns)", "Mustard Oil"], instructions: ["Chop leaves.", "Fry prawns, then add leaves and seasonings.", "Stir-fry until wilted."] },
  { id: 22, slug: "begun-bhaja", title: "Begun Bhaja (Fried Eggplant)", excerpt: "Slices of eggplant seasoned with turmeric and chili, pan-fried until crisp.", image: "https://placehold.co/400x250/9333ea/ffffff?text=Begun+Bhaja", category: "Vegetable Bhaji", prepTime: "10 min", cookTime: "15 min", ingredients: ["Eggplant", "Turmeric", "Chili Powder", "Salt", "Mustard Oil"], instructions: ["Slice eggplant.", "Marinate with spices.", "Pan-fry until golden brown and tender."] },
  { id: 23, slug: "potol-bhaja", title: "Potol Bhaja (Pointed Gourd Fry)", excerpt: "Pointed gourd (Parwal/Potol) sliced and fried until crispy.", image: "https://placehold.co/400x250/f43f5e/ffffff?text=Potol+Bhaja", category: "Vegetable Bhaji", prepTime: "10 min", cookTime: "15 min", ingredients: ["Potol", "Turmeric", "Salt", "Mustard Oil"], instructions: ["Slice potol.", "Season well.", "Shallow fry in hot oil."] },

  // --- Vorta (5) ---
  { id: 24, slug: "aloo-vorta", title: "Aloo Vorta (Spicy Mashed Potato)", excerpt: "Mashed potatoes mixed with fried onions, chilies, and mustard oil.", image: "https://placehold.co/400x250/34d399/000000?text=Aloo+Vorta", category: "Vorta", prepTime: "15 min", cookTime: "20 min", ingredients: ["Potatoes", "Dried Red Chilies", "Onion", "Cilantro", "Mustard Oil"], instructions: ["Boil and mash potatoes.", "Mix with mashed chilies, fried onions, and mustard oil.", "Serve at room temperature."] },
  { id: 25, slug: "begun-vorta", title: "Begun Vorta (Smoked Eggplant Mash)", excerpt: "Eggplant roasted over fire until smoky, then mashed with spices.", image: "https://placehold.co/400x250/065f46/ffffff?text=Begun+Vorta", category: "Vorta", prepTime: "5 min", cookTime: "20 min", ingredients: ["Large Eggplant", "Garlic", "Chilies", "Onion", "Mustard Oil"], instructions: ["Roast eggplant until soft and smoky.", "Peel and mash.", "Mix with sautéed ingredients."] },
  { id: 26, slug: "shutki-vorta", title: "Shutki Vorta (Dried Fish Mash)", excerpt: "Spicy and intensely flavored dried fish mashed with garlic and chilies.", image: "https://placehold.co/400x250/1d4ed8/ffffff?text=Shutki+Vorta", category: "Vorta", prepTime: "10 min", cookTime: "15 min", ingredients: ["Dried Fish", "Garlic", "Onion", "Chilies", "Mustard Oil"], instructions: ["Fry dried fish, chilies, and garlic.", "Pound or blend into a coarse paste.", "Mix with mustard oil."] },
  { id: 27, slug: "chingri-vorta", title: "Chingri Vorta (Shrimp Mash)", excerpt: "Small shrimp mashed with coconut, onions, and a touch of chili.", image: "https://placehold.co/400x250/f97316/ffffff?text=Chingri+Vorta", category: "Vorta", prepTime: "10 min", cookTime: "15 min", ingredients: ["Small Shrimp", "Coconut", "Onion", "Turmeric", "Salt"], instructions: ["Fry shrimp and coconut.", "Grind with onion and chilies.", "Serve fresh."] },
  { id: 28, slug: "dal-vorta", title: "Masoor Dal Vorta", excerpt: "Mashed red lentils (masoor dal) with onions, garlic, and mustard oil.", image: "https://placehold.co/400x250/f0b400/000000?text=Dal+Vorta", category: "Vorta", prepTime: "10 min", cookTime: "30 min", ingredients: ["Masoor Dal", "Garlic", "Dried Chilies", "Onion", "Mustard Oil"], instructions: ["Boil dal until soft.", "Drain and mash.", "Mix with mustard oil, fried chilies, and onions."] },

  // --- Street Food (5) ---
  { id: 29, slug: "fuchka", title: "Fuchka (Panipuri)", excerpt: "Crisp, hollow puris filled with spiced mashed potato and tangy tamarind water.", image: "https://placehold.co/400x250/dc2626/ffffff?text=Fuchka", category: "Street Food", prepTime: "40 min", cookTime: "30 min", ingredients: ["Puri Shells", "Spiced Potatoes", "Tamarind Pulp", "Mint Water", "Chili"], instructions: ["Prepare filling and water.", "Punch a hole in the puri.", "Fill and serve immediately."] },
  { id: 30, slug: "singara", title: "Singara (Samosa)", excerpt: "Triangular pastries filled with spicy potatoes and vegetables, deep-fried.", image: "https://placehold.co/400x250/4d7c0f/ffffff?text=Singara", category: "Street Food", prepTime: "45 min", cookTime: "25 min", ingredients: ["Flour", "Potatoes", "Peanuts", "Cumin", "Oil for frying"], instructions: ["Make the dough and filling.", "Shape into triangles.", "Deep fry until golden."] },
  { id: 31, slug: "jhal-muri", title: "Jhal Muri", excerpt: "Spicy puffed rice snack mixed with nuts, chanachur, and mustard oil.", image: "https://placehold.co/400x250/f97316/ffffff?text=Jhal+Muri", category: "Street Food", prepTime: "5 min", cookTime: "0 min", ingredients: ["Puffed Rice", "Chanachur", "Chop (Onion/Cucumber)", "Mustard Oil", "Chilies"], instructions: ["Mix all ingredients in a dry bowl.", "Toss quickly and serve immediately."] },
  { id: 32, slug: "chotpoti", title: "Chotpoti", excerpt: "A popular snack of chickpeas, mashed potatoes, eggs, and a spicy tamarind chutney.", image: "https://placehold.co/400x250/a855f7/ffffff?text=Chotpoti", category: "Street Food", prepTime: "30 min", cookTime: "40 min", ingredients: ["Chickpeas", "Potatoes", "Egg", "Tamarind", "Chilies"], instructions: ["Boil chickpeas and potatoes.", "Mix with tamarind sauce and toppings.", "Garnish with crushed Fuchka shells."] },
  { id: 33, slug: "beguni", title: "Beguni (Eggplant Fritters)", excerpt: "Thin slices of eggplant dipped in a spiced batter and deep-fried.", image: "https://placehold.co/400x250/14b8a6/000000?text=Beguni", category: "Street Food", prepTime: "15 min", cookTime: "15 min", ingredients: ["Eggplant", "Gram Flour", "Rice Flour", "Turmeric", "Chili Powder"], instructions: ["Slice eggplant thin.", "Make a smooth batter.", "Dip slices and deep fry until crispy."] },

  // --- Pithas (5) ---
  { id: 34, slug: "vapa-pitha", title: "Vapa Pitha", excerpt: "Steamed rice cake filled with jaggery and coconut, a winter delight.", image: "https://placehold.co/400x250/65a30d/ffffff?text=Vapa+Pitha", category: "Pithas", prepTime: "30 min", cookTime: "20 min", ingredients: ["Rice Flour", "Date Jaggery (Gur)", "Coconut", "Salt"], instructions: ["Mix rice flour and water.", "Fill small molds with rice and jaggery.", "Steam until cooked."] },
  { id: 35, slug: "patishapta-pitha", title: "Patishapta Pitha", excerpt: "Thin crepes filled with a rich, sweet mixture of condensed milk and coconut.", image: "https://placehold.co/400x250/f97316/ffffff?text=Patishapta", category: "Pithas", prepTime: "20 min", cookTime: "30 min", ingredients: ["Flour/Semolina", "Milk", "Coconut", "Khoya (Milk Solids)", "Ghee"], instructions: ["Prepare the coconut filling.", "Make thin crepes (shaptas).", "Roll the filling inside the crepes."] },
  { id: 36, slug: "nokshi-pitha", title: "Nokshi Pitha", excerpt: "Elaborately designed and carved rice flour cakes, deep-fried and soaked in syrup.", image: "https://placehold.co/400x250/374151/ffffff?text=Nokshi+Pitha", category: "Pithas", prepTime: "120 min", cookTime: "30 min", ingredients: ["Rice Flour Dough", "Date Jaggery Syrup", "Oil for frying"], instructions: ["Prepare a firm dough.", "Carve intricate designs.", "Deep fry and soak in hot syrup."] },
  { id: 37, slug: "tel-pitha", title: "Tel Pitha (Teler Pitha)", excerpt: "Sweet, puffy, deep-fried pancakes made from rice flour and jaggery.", image: "https://placehold.co/400x250/be123c/ffffff?text=Tel+Pitha", category: "Pithas", prepTime: "15 min", cookTime: "20 min", ingredients: ["Rice Flour", "Jaggery", "Water", "Oil for frying"], instructions: ["Make a thin batter of jaggery and rice flour.", "Drop spoonfuls into hot oil.", "Fry until puffed and golden."] },
  { id: 38, slug: "chitoi-pitha", title: "Chitoi Pitha", excerpt: "Plain, round, flat steamed rice cakes, often served with chutney or meat curry.", image: "https://placehold.co/400x250/1e40af/ffffff?text=Chitoi+Pitha", category: "Pithas", prepTime: "10 min", cookTime: "20 min", ingredients: ["Rice Flour", "Water", "Salt"], instructions: ["Make a runny rice flour batter.", "Pour into special Chitoi pan.", "Cook over low heat, covered, until done."] },

  // --- Desserts (6) ---
  { id: 39, slug: "mishti-doi", title: "Mishti Doi", excerpt: "Sweetened yogurt, a rich fermented dessert with a beautiful caramel color.", image: "https://placehold.co/400x250/f97316/ffffff?text=Mishti+Doi", category: "Desserts", prepTime: "30 min", cookTime: "Overnight", ingredients: ["Milk", "Sugar", "Yogurt Starter"], instructions: ["Caramelize sugar.", "Mix with warm milk.", "Set the mixture with a starter and ferment."] },
  { id: 40, slug: "rosogolla", title: "Rosogolla", excerpt: "Soft, spongy cheese balls soaked in light sugar syrup.", image: "https://placehold.co/400x250/059669/ffffff?text=Rosogolla", category: "Desserts", prepTime: "40 min", cookTime: "30 min", ingredients: ["Chhena (Cottage Cheese)", "Sugar", "Cardamom", "Water"], instructions: ["Knead chhena into smooth balls.", "Boil in sugar syrup until spongy.", "Chill before serving."] },
  { id: 41, slug: "cham-cham", title: "Cham Cham", excerpt: "An elongated sweet made from chhena, cooked in syrup and coated in coconut.", image: "https://placehold.co/400x250/84cc16/000000?text=Cham+Cham", category: "Desserts", prepTime: "40 min", cookTime: "35 min", ingredients: ["Chhena", "Sugar", "Saffron", "Coconut Flakes"], instructions: ["Shape chhena into cylinders.", "Cook in syrup.", "Coat with coconut and garnish."] },
  { id: 42, slug: "shondesh", title: "Shondesh", excerpt: "A dry sweet made from chhena and jaggery or sugar, often molded into decorative shapes.", image: "https://placehold.co/400x250/22d3ee/000000?text=Shondesh", category: "Desserts", prepTime: "30 min", cookTime: "10 min", ingredients: ["Chhena", "Sugar/Jaggery", "Cardamom"], instructions: ["Heat chhena and sugar until smooth.", "Remove from heat and knead.", "Press into molds and chill."] },
  { id: 43, slug: "gulab-jamun", title: "Gulab Jamun", excerpt: "Deep-fried milk solids (khoya) balls soaked in rose-flavored sugar syrup.", image: "https://placehold.co/400x250/db2777/ffffff?text=Gulab+Jamun", category: "Desserts", prepTime: "30 min", cookTime: "20 min", ingredients: ["Khoya (Milk Solids)", "Flour", "Sugar Syrup", "Rose Water"], instructions: ["Mix khoya and flour into dough.", "Fry balls until dark.", "Soak in warm syrup."] },
  { id: 44, slug: "firni", title: "Firni (Rice Pudding)", excerpt: "A creamy, thick rice pudding made with ground rice, milk, and saffron.", image: "https://placehold.co/400x250/fcd34d/000000?text=Firni", category: "Desserts", prepTime: "15 min", cookTime: "60 min", ingredients: ["Milk", "Ground Rice", "Sugar", "Saffron", "Pistachios"], instructions: ["Boil milk and sugar.", "Add ground rice and cook until thick.", "Chill and serve with nuts."] },

  // --- Daals & Soups (6) ---
  { id: 45, slug: "masoor-dal-torka", title: "Masoor Dal Torka", excerpt: "Red lentils cooked until soft and finished with a tempering (torka) of spices.", image: "https://placehold.co/400x250/f97316/ffffff?text=Masoor+Dal", category: "Daals & Soups", prepTime: "10 min", cookTime: "40 min", ingredients: ["Masoor Dal", "Garlic", "Dried Red Chilies", "Cumin Seeds", "Ghee"], instructions: ["Boil dal with turmeric and salt.", "Prepare torka by frying spices in ghee.", "Pour torka over the dal."] },
  { id: 46, slug: "aam-diye-tok-dal", title: "Aam Diye Tok Dal (Sour Mango Dal)", excerpt: "A refreshing, tangy lentil soup made with raw green mangoes.", image: "https://placehold.co/400x250/65a30d/ffffff?text=Aam+Tok+Dal", category: "Daals & Soups", prepTime: "15 min", cookTime: "30 min", ingredients: ["Masoor Dal", "Raw Mango Slices", "Mustard Seeds", "Turmeric"], instructions: ["Boil dal and mangoes together.", "Temper with mustard seeds and curry leaves.", "Serve warm."] },
  { id: 47, slug: "muger-dal", title: "Bhaja Muger Dal (Roasted Moong Dal)", excerpt: "Moong lentils lightly roasted before cooking, giving it a nutty flavor.", image: "https://placehold.co/400x250/2dd4bf/000000?text=Muger+Dal", category: "Daals & Soups", prepTime: "10 min", cookTime: "45 min", ingredients: ["Moong Dal", "Ginger", "Ghee", "Bay Leaf", "Peas"], instructions: ["Roast dal.", "Boil with vegetables and spices.", "Temper and serve."] },
  { id: 48, slug: "murgir-shorba", title: "Murgir Shorba (Chicken Soup)", excerpt: "A clear, spiced chicken broth, used as a restorative or starter.", image: "https://placehold.co/400x250/f87171/ffffff?text=Chicken+Shorba", category: "Daals & Soups", prepTime: "10 min", cookTime: "40 min", ingredients: ["Chicken Bones", "Ginger", "Black Peppercorns", "Cinnamon", "Cilantro"], instructions: ["Boil bones and spices gently for a long time.", "Strain the broth.", "Serve hot with cilantro."] },
  { id: 49, slug: "dal-ghost", title: "Dal Gosht (Meat and Dal Stew)", excerpt: "A rich, slow-cooked stew combining tender meat and multiple varieties of lentils.", image: "https://placehold.co/400x250/1f2937/ffffff?text=Dal+Gosht", category: "Daals & Soups", prepTime: "30 min", cookTime: "90 min", ingredients: ["Mutton/Beef", "Chana Dal", "Toor Dal", "Garam Masala", "Mint"], instructions: ["Cook dal and meat separately.", "Combine and simmer with spices.", "Finish with fresh mint."] },
  { id: 50, slug: "niramish-dal", title: "Niramish Dal (Vegetarian Dal)", excerpt: "Lentils cooked without onion or garlic, using ginger and asafoetida.", image: "https://placehold.co/400x250/fbbf24/000000?text=Niramish+Dal", category: "Daals & Soups", prepTime: "15 min", cookTime: "35 min", ingredients: ["Moong Dal", "Ginger", "Asafoetida", "Coconut", "Raisins"], instructions: ["Boil dal until soft.", "Temper with ginger and asafoetida.", "Add coconut and raisins for texture."] },

  // --- Drinks & Refreshments (5) ---
  { id: 51, slug: "doi-lassi", title: "Doi Lassi (Yogurt Drink)", excerpt: "A traditional cold drink made with yogurt, sugar, and water.", image: "https://placehold.co/400x250/3b82f6/ffffff?text=Doi+Lassi", category: "Drinks & Refreshments", prepTime: "5 min", cookTime: "0 min", ingredients: ["Yogurt", "Sugar", "Water/Milk", "Ice"], instructions: ["Blend yogurt, sugar, and water until smooth.", "Serve chilled with ice."] },
  { id: 52, slug: "tetul-sharbat", title: "Tetul Sharbat (Tamarind Drink)", excerpt: "A sweet and tangy tamarind cooler, perfect for summer.", image: "https://placehold.co/400x250/ef4444/ffffff?text=Tetul+Sharbat", category: "Drinks & Refreshments", prepTime: "10 min", cookTime: "0 min", ingredients: ["Tamarind Pulp", "Sugar", "Water", "Black Salt"], instructions: ["Soak tamarind, strain the pulp.", "Mix with sugar, salt, and water.", "Serve cold."] },
  { id: 53, slug: "aam-panna", title: "Aam Panna (Raw Mango Drink)", excerpt: "A cooling drink made from boiled, pulped raw mangoes, cumin, and mint.", image: "https://placehold.co/400x250/10b981/ffffff?text=Aam+Panna", category: "Drinks & Refreshments", prepTime: "20 min", cookTime: "30 min", ingredients: ["Raw Mangoes", "Sugar", "Cumin Powder", "Mint Leaves"], instructions: ["Boil and peel mangoes; mash the pulp.", "Mix with spices and sugar.", "Dilute with cold water."] },
  { id: 54, slug: "nimbu-pani", title: "Nimbu Pani (Spicy Lemonade)", excerpt: "A refreshing lemonade flavored with black salt and chaat masala.", image: "https://placehold.co/400x250/fcd34d/000000?text=Nimbu+Pani", category: "Drinks & Refreshments", prepTime: "5 min", cookTime: "0 min", ingredients: ["Lemon Juice", "Sugar", "Water", "Black Salt", "Chaat Masala"], instructions: ["Mix all ingredients well.", "Adjust seasoning to taste.", "Serve over ice."] },
  { id: 55, slug: "gurer-sharbat", title: "Gur-er Sharbat (Jaggery Drink)", excerpt: "A traditional sweetener made by dissolving date palm jaggery in water.", image: "https://placehold.co/400x250/9333ea/ffffff?text=Gur+Sharbat", category: "Drinks & Refreshments", prepTime: "5 min", cookTime: "0 min", ingredients: ["Date Palm Jaggery (Nolen Gur)", "Water", "Ice"], instructions: ["Dissolve jaggery in water.", "Strain and serve chilled."] },
];

const categories = Array.from(new Set(initialRecipes.map(r => r.category)));

// --- COMPONENTS ---

// Navbar Component
const Navbar = ({ navigate }) => (
  <nav className="bg-teal-600 shadow-xl sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <h1 onClick={() => navigate('home')} className="text-3xl font-bold text-white cursor-pointer hover:text-teal-200 transition duration-150">
        BanglaRannaghor 🌶️
      </h1>
      <div className="space-x-6 text-lg">
        <button onClick={() => navigate('recipes')} className="text-white hover:text-teal-200 transition duration-150 font-medium">
          Recipes
        </button>
        <button onClick={() => navigate('about')} className="text-white hover:text-teal-200 transition duration-150 font-medium hidden sm:inline">
          About
        </button>
      </div>
    </div>
  </nav>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-800 text-white mt-12 py-6">
    <div className="container mx-auto text-center text-sm opacity-80">
      &copy; 2025 BanglaRannaghor - A Taste of Bangladesh. All rights reserved.
    </div>
  </footer>
);

// Recipe Card Component
const RecipeCard = ({ recipe, navigate }) => (
  <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-white transform hover:-translate-y-1">
    <div className="relative h-48">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-full object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/2dd4bf/000000?text=Food+Image"; }}
      />
      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        {recipe.category}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-xl mb-2 text-gray-900 hover:text-teal-600 transition cursor-pointer" onClick={() => navigate('recipe', recipe.slug)}>
        {recipe.title}
      </h3>
      <p className="text-gray-700 text-base mb-4">
        {recipe.excerpt}
      </p>
      <div className="flex space-x-4 text-sm text-gray-600 border-t pt-3">
        <span><span role="img" aria-label="prep time">⏱</span> {recipe.prepTime}</span>
        <span><span role="img" aria-label="cook time">🔥</span> {recipe.cookTime}</span>
      </div>
    </div>
    <div className="px-5 pb-5">
       <button 
          onClick={() => navigate('recipe', recipe.slug)}
          className="w-full bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-700 transition duration-200 shadow-md"
       >
          View Recipe →
      </button>
    </div>
  </div>
);

// Hero Section Component
const Hero = ({ navigate }) => (
  <div className="bg-gray-100 rounded-xl p-8 sm:p-16 text-center shadow-lg mb-12">
    <h2 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
      Explore the Flavors of **Bangladesh**
    </h2>
    <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
      55 authentic recipes from **Kacchi Biryani** to **Shorshe Ilish**.
    </p>
    <button 
      onClick={() => navigate('recipes')} 
      className="bg-amber-500 text-white text-xl font-bold px-8 py-3 rounded-full shadow-lg hover:bg-amber-600 transform hover:scale-105 transition duration-300"
    >
      Start Cooking Now!
    </button>
  </div>
);

// Home Page Component
const HomePage = ({ navigate }) => (
  <>
    <Hero navigate={navigate} />
    <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-teal-500 inline-block pb-1">
      Featured Recipes
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {initialRecipes.slice(0, 3).map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} navigate={navigate} />
      ))}
    </div>
  </>
);

// Recipes List Page Component
const RecipesListPage = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = initialRecipes.filter(recipe => 
    selectedCategory === 'All' || recipe.category === selectedCategory
  );

  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-900 mb-6">All Bangladeshi Recipes</h2>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 bg-white rounded-xl shadow-inner">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            selectedCategory === 'All' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
          }`}
        >
          All ({initialRecipes.length})
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedCategory === category ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
            }`}
          >
            {category} ({initialRecipes.filter(r => r.category === category).length})
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} navigate={navigate} />
          ))
        ) : (
          <p className="text-lg text-gray-600 col-span-full p-8 text-center bg-gray-50 rounded-lg">
            No recipes found in the selected category.
          </p>
        )}
      </div>
    </div>
  );
};

// Single Recipe Page Component
const RecipePage = ({ slug, navigate }) => {
  const recipe = initialRecipes.find(r => r.slug === slug);

  if (!recipe) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold text-red-500">404 - Recipe Not Found</h2>
        <p className="mt-4 text-gray-600">The recipe you are looking for does not exist.</p>
        <button onClick={() => navigate('recipes')} className="mt-6 text-teal-600 hover:underline">
          ← Back to All Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl">
      {/* Back Button */}
      <button onClick={() => navigate('recipes')} className="text-teal-600 hover:text-teal-800 font-medium flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to All Recipes
      </button>

      {/* Title & Metadata */}
      <div className="border-b pb-4 mb-6">
        <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1 rounded-full mb-3 shadow-sm">
            {recipe.category}
        </span>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">{recipe.title}</h2>
        <p className="text-lg text-gray-600 italic">{recipe.excerpt}</p>
        <div className="flex space-x-6 mt-4 text-gray-700 font-medium">
            <span><span role="img" aria-label="prep time">⏱ Prep:</span> {recipe.prepTime}</span>
            <span><span role="img" aria-label="cook time">🔥 Cook:</span> {recipe.cookTime}</span>
        </div>
      </div>

      {/* Image and Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-auto object-cover rounded-xl shadow-xl" 
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x450/2dd4bf/000000?text=Food+Image"; }}
            />
        </div>
        
        {/* Ingredients List */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-teal-600 mb-4 border-b pb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                {recipe.ingredients.map((item, index) => (
                    <li key={index} className="text-lg">{item}</li>
                ))}
            </ul>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-teal-600 mb-4 border-b pb-2">Instructions</h3>
        <ol className="list-decimal pl-6 space-y-4 text-gray-700">
          {/* CORRECTED NUMBERING LOGIC: Using map index + 1 for clean numbering */}
          {recipe.instructions.map((step, index) => (
            <li key={index} className="pl-2 text-lg">
                <span className="font-semibold text-gray-900">Step {index + 1}:</span> {step}
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
};

// About Page Component
const AboutPage = () => (
    <div className="bg-white p-10 rounded-xl shadow-xl max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b pb-3">About BanglaRannaghor</h2>
        <p className="text-lg text-gray-700 mb-6">
            Welcome to **BanglaRannaghor**, your ultimate source for authentic Bangladeshi cuisine. Our mission is to preserve and share the rich, vibrant, and diverse flavors of Bengal, from the spicy curries of Dhaka to the delicate pithas of the villages.
        </p>
        <p className="text-lg text-gray-700 mb-6">
            We currently feature **55 unique recipes** across 10 distinct categories, ensuring you can find everything from quick weeknight meals to festive dishes perfect for Eid or Pahela Baishakh.
        </p>
        <p className="text-lg text-gray-700 font-medium">
            Happy cooking!
        </p>
    </div>
);


// --- MAIN APP COMPONENT ---

const App = () => {
  // Simple client-side routing state
  const [route, setRoute] = useState('home'); // 'home', 'recipes', 'recipe', 'about'
  const [slug, setSlug] = useState(null);

  // Function to handle navigation
  const navigate = useCallback((newRoute, newSlug = null) => {
    setRoute(newRoute);
    setSlug(newSlug);
    // Scroll to the top on route change
    window.scrollTo(0, 0);
  }, []);

  // Render the appropriate component based on the current route
  const renderContent = () => {
    switch (route) {
      case 'recipes':
        return <RecipesListPage navigate={navigate} />;
      case 'recipe':
        return <RecipePage slug={slug} navigate={navigate} />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navigate={navigate} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
