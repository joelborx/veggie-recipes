const recipes = [
  {
    title: "Chana Masala",
    description: "A classic North Indian chickpea curry with aromatic spices, tomatoes, and onions. Hearty, protein-rich, and perfect with rice or naan.",
    images: [
      { url: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=800", alt: "Chana Masala in a bowl", isPrimary: true }
    ],
    ingredients: [
      { name: "chickpeas (canned)", amount: "2 cans (800g)", optional: false },
      { name: "onion", amount: "2 large", optional: false },
      { name: "tomatoes", amount: "3 medium", optional: false },
      { name: "ginger", amount: "2 tbsp, minced", optional: false },
      { name: "garlic", amount: "4 cloves", optional: false },
      { name: "garam masala", amount: "1 tsp", optional: false },
      { name: "cumin seeds", amount: "1 tsp", optional: false },
      { name: "turmeric", amount: "1/2 tsp", optional: false },
      { name: "cilantro", amount: "handful", optional: true }
    ],
    instructions: [
      { step: 1, description: "Heat oil in a pan, add cumin seeds until fragrant", duration: 2 },
      { step: 2, description: "Add onions and sauté until golden brown", duration: 8 },
      { step: 3, description: "Add ginger, garlic, and spices, cook for 2 minutes", duration: 2 },
      { step: 4, description: "Add tomatoes and cook until soft", duration: 5 },
      { step: 5, description: "Add chickpeas and simmer for 15 minutes", duration: 15 }
    ],
    nutrition: { calories: 320, protein: 14, carbs: 48, fat: 8, fiber: 12, sugar: 8, sodium: 580, servingSize: "1 cup" },
    tags: ["dinner", "indian", "curry", "chickpeas", "high-protein"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "medium" },
    time: { prep: 10, cook: 30 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Palak Paneer",
    description: "Creamy spinach curry with soft paneer cheese cubes. A beloved Punjabi dish that's nutritious and comforting.",
    images: [
      { url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800", alt: "Palak Paneer with fresh naan", isPrimary: true }
    ],
    ingredients: [
      { name: "fresh spinach", amount: "500g", optional: false },
      { name: "paneer", amount: "250g, cubed", optional: false },
      { name: "onion", amount: "1 large", optional: false },
      { name: "tomatoes", amount: "2 medium", optional: false },
      { name: "ginger-garlic paste", amount: "1 tbsp", optional: false },
      { name: "green chilies", amount: "2", optional: true },
      { name: "cream", amount: "2 tbsp", optional: true },
      { name: "cumin seeds", amount: "1 tsp", optional: false },
      { name: "coriander powder", amount: "1 tsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Blanch spinach in boiling water, then blend into smooth puree", duration: 10 },
      { step: 2, description: "Fry paneer cubes until golden, set aside", duration: 8 },
      { step: 3, description: "Sauté onions, ginger-garlic, and tomatoes", duration: 10 },
      { step: 4, description: "Add spices and spinach puree, simmer for 10 minutes", duration: 10 },
      { step: 5, description: "Add paneer and cream, cook for 5 more minutes", duration: 5 }
    ],
    nutrition: { calories: 280, protein: 16, carbs: 12, fat: 18, fiber: 5, sugar: 4, sodium: 450, servingSize: "1 cup" },
    tags: ["dinner", "indian", "curry", "spinach", "paneer"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 15, cook: 35 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Aloo Gobi",
    description: "A simple, comforting dry curry of potatoes and cauliflower with turmeric and spices. Light yet satisfying.",
    images: [
      { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800", alt: "Aloo Gobi with potatoes and cauliflower", isPrimary: true }
    ],
    ingredients: [
      { name: "cauliflower", amount: "1 medium head", optional: false },
      { name: "potatoes", amount: "3 medium", optional: false },
      { name: "onion", amount: "1 large", optional: false },
      { name: "tomato", amount: "1 medium", optional: false },
      { name: "ginger", amount: "1 tbsp, minced", optional: false },
      { name: "turmeric", amount: "1 tsp", optional: false },
      { name: "cumin seeds", amount: "1 tsp", optional: false },
      { name: "garam masala", amount: "1/2 tsp", optional: false },
      { name: "green chilies", amount: "1-2", optional: true }
    ],
    instructions: [
      { step: 1, description: "Cut cauliflower and potatoes into florets/cubes", duration: 10 },
      { step: 2, description: "Heat oil, add cumin seeds and onions, sauté until soft", duration: 8 },
      { step: 3, description: "Add ginger, turmeric, and tomato, cook for 3 minutes", duration: 3 },
      { step: 4, description: "Add potatoes and cauliflower, stir well", duration: 5 },
      { step: 5, description: "Cover and cook on low until vegetables are tender", duration: 20 }
    ],
    nutrition: { calories: 180, protein: 5, carbs: 32, fat: 5, fiber: 6, sugar: 6, sodium: 320, servingSize: "1 cup" },
    tags: ["dinner", "indian", "vegetables", "potato", "cauliflower"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 15, cook: 35 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Quick Masoor Dal",
    description: "A fast-cooking red lentil dal that's ready in under 30 minutes. Comforting, nutritious, and perfect for busy weeknights.",
    images: [
      { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", alt: "Red lentil dal in a bowl", isPrimary: true }
    ],
    ingredients: [
      { name: "red lentils (masoor)", amount: "1 cup", optional: false },
      { name: "onion", amount: "1 medium", optional: false },
      { name: "tomato", amount: "1 medium", optional: false },
      { name: "garlic", amount: "3 cloves", optional: false },
      { name: "turmeric", amount: "1/2 tsp", optional: false },
      { name: "cumin seeds", amount: "1 tsp", optional: false },
      { name: "ghee or oil", amount: "2 tbsp", optional: false },
      { name: "cilantro", amount: "for garnish", optional: true },
      { name: "lemon juice", amount: "1 tbsp", optional: true }
    ],
    instructions: [
      { step: 1, description: "Rinse lentils and boil with turmeric until soft (15 min)", duration: 15 },
      { step: 2, description: "In a pan, heat ghee and add cumin seeds", duration: 1 },
      { step: 3, description: "Add onions and garlic, sauté until golden", duration: 5 },
      { step: 4, description: "Add tomato and cook until mushy", duration: 4 },
      { step: 5, description: "Pour tempering over cooked dal, add lemon juice", duration: 2 }
    ],
    nutrition: { calories: 210, protein: 12, carbs: 34, fat: 4, fiber: 8, sugar: 3, sodium: 280, servingSize: "1 cup" },
    tags: ["dinner", "indian", "dal", "lentils", "quick"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 5, cook: 25 },
    difficulty: "quick",
    servings: 4
  },
  {
    title: "Bhindi Masala",
    description: "Stir-fried okra with onions, tomatoes, and spices. Crispy, tangy, and absolutely delicious when done right.",
    images: [
      { url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6eb?w=800", alt: "Bhindi Masala with okra", isPrimary: true }
    ],
    ingredients: [
      { name: "okra (bhindi)", amount: "500g", optional: false },
      { name: "onion", amount: "2 medium", optional: false },
      { name: "tomato", amount: "2 medium", optional: false },
      { name: "ginger-garlic paste", amount: "1 tbsp", optional: false },
      { name: "turmeric", amount: "1/2 tsp", optional: false },
      { name: "coriander powder", amount: "1 tsp", optional: false },
      { name: "amchur (dry mango powder)", amount: "1/2 tsp", optional: true },
      { name: "red chili powder", amount: "1/2 tsp", optional: false },
      { name: "oil", amount: "3 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Wash and pat dry okra thoroughly, cut into pieces", duration: 10 },
      { step: 2, description: "Heat oil, sauté okra on high heat for 8 minutes", duration: 8 },
      { step: 3, description: "Remove okra, in same pan sauté onions until golden", duration: 8 },
      { step: 4, description: "Add ginger-garlic, tomatoes, and spices", duration: 5 },
      { step: 5, description: "Return okra to pan, cook on low for 5 minutes", duration: 5 }
    ],
    nutrition: { calories: 145, protein: 3, carbs: 18, fat: 8, fiber: 6, sugar: 5, sodium: 240, servingSize: "1 cup" },
    tags: ["dinner", "indian", "okra", "stir-fry", "side"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "medium" },
    time: { prep: 15, cook: 25 },
    difficulty: "medium",
    servings: 3
  },
  {
    title: "Vegetable Biryani",
    description: "Fragrant basmati rice layered with spiced vegetables, saffron, and fried onions. A celebration dish that's worth the effort.",
    images: [
      { url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800", alt: "Vegetable Biryani with raita", isPrimary: true }
    ],
    ingredients: [
      { name: "basmati rice", amount: "2 cups", optional: false },
      { name: "mixed vegetables", amount: "2 cups (carrots, beans, peas, cauliflower)", optional: false },
      { name: "onions", amount: "3 large, sliced", optional: false },
      { name: "yogurt", amount: "1/2 cup", optional: false },
      { name: "ginger-garlic paste", amount: "2 tbsp", optional: false },
      { name: "biryani masala", amount: "2 tbsp", optional: false },
      { name: "saffron", amount: "few strands", optional: true },
      { name: "fried onions", amount: "1/2 cup", optional: false },
      { name: "ghee", amount: "3 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Soak rice for 30 min, parboil with whole spices", duration: 20 },
      { step: 2, description: "Marinate vegetables in yogurt and spices for 30 min", duration: 30 },
      { step: 3, description: "Fry sliced onions until crispy and golden", duration: 15 },
      { step: 4, description: "Cook marinated vegetables until tender", duration: 20 },
      { step: 5, description: "Layer rice and vegetables, dum cook for 20 min", duration: 20 }
    ],
    nutrition: { calories: 420, protein: 10, carbs: 68, fat: 14, fiber: 6, sugar: 8, sodium: 480, servingSize: "1.5 cups" },
    tags: ["dinner", "indian", "biryani", "rice", "festive"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "medium" },
    time: { prep: 45, cook: 60 },
    difficulty: "elaborate",
    servings: 6
  },
  {
    title: "Rajma (Red Kidney Bean Curry)",
    description: "Punjabi-style kidney bean curry in a rich tomato gravy. Comfort food at its finest, best enjoyed with steamed rice.",
    images: [
      { url: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800", alt: "Rajma curry with rice", isPrimary: true }
    ],
    ingredients: [
      { name: "red kidney beans (rajma)", amount: "1.5 cups, soaked overnight", optional: false },
      { name: "onions", amount: "2 large", optional: false },
      { name: "tomatoes", amount: "4 medium", optional: false },
      { name: "ginger", amount: "2 inch piece", optional: false },
      { name: "garlic", amount: "6 cloves", optional: false },
      { name: "rajma masala", amount: "2 tbsp", optional: false },
      { name: "bay leaves", amount: "2", optional: false },
      { name: "cinnamon stick", amount: "1 inch", optional: false },
      { name: "cream", amount: "2 tbsp", optional: true }
    ],
    instructions: [
      { step: 1, description: "Pressure cook soaked rajma until soft (15-20 min)", duration: 30 },
      { step: 2, description: "Blend onions, tomatoes, ginger, garlic into paste", duration: 10 },
      { step: 3, description: "Heat oil, add whole spices, then onion-tomato paste", duration: 15 },
      { step: 4, description: "Add rajma masala and cooked beans with water", duration: 5 },
      { step: 5, description: "Simmer for 20 minutes, add cream before serving", duration: 20 }
    ],
    nutrition: { calories: 340, protein: 18, carbs: 52, fat: 8, fiber: 14, sugar: 8, sodium: 520, servingSize: "1 cup" },
    tags: ["dinner", "indian", "curry", "beans", "comfort-food"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: "medium" },
    time: { prep: 20, cook: 60 },
    difficulty: "medium",
    servings: 6
  },
  {
    title: "Matar Paneer",
    description: "Green peas and paneer cubes in a creamy tomato-based curry. Mild, comforting, and loved by all ages.",
    images: [
      { url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800", alt: "Matar Paneer curry", isPrimary: true }
    ],
    ingredients: [
      { name: "paneer", amount: "250g, cubed", optional: false },
      { name: "green peas", amount: "1.5 cups", optional: false },
      { name: "onion", amount: "2 medium", optional: false },
      { name: "tomatoes", amount: "3 medium", optional: false },
      { name: "cashews", amount: "10-12", optional: true },
      { name: "ginger-garlic paste", amount: "1 tbsp", optional: false },
      { name: "garam masala", amount: "1 tsp", optional: false },
      { name: "cream", amount: "3 tbsp", optional: false },
      { name: "kasuri methi", amount: "1 tsp", optional: true }
    ],
    instructions: [
      { step: 1, description: "Sauté onions until golden, cool and blend with tomatoes", duration: 15 },
      { step: 2, description: "Fry paneer cubes until light golden", duration: 8 },
      { step: 3, description: "Heat butter, add blended onion-tomato paste", duration: 10 },
      { step: 4, description: "Add spices, peas, and simmer for 10 minutes", duration: 10 },
      { step: 5, description: "Add paneer, cream, and kasuri methi, simmer 5 min", duration: 5 }
    ],
    nutrition: { calories: 360, protein: 18, carbs: 22, fat: 22, fiber: 6, sugar: 8, sodium: 480, servingSize: "1 cup" },
    tags: ["dinner", "indian", "curry", "paneer", "peas"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: false, spiceLevel: "mild" },
    time: { prep: 15, cook: 35 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Quick Tadka Dal",
    description: "Yellow lentils tempered with mustard seeds, curry leaves, and garlic. The ultimate quick comfort food.",
    images: [
      { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", alt: "Tadka Dal with tempering", isPrimary: true }
    ],
    ingredients: [
      { name: "toor dal (split pigeon peas)", amount: "1 cup", optional: false },
      { name: "turmeric", amount: "1/2 tsp", optional: false },
      { name: "tomato", amount: "1 small, chopped", optional: false },
      { name: "mustard seeds", amount: "1 tsp", optional: false },
      { name: "curry leaves", amount: "1 sprig", optional: false },
      { name: "garlic", amount: "3 cloves, sliced", optional: false },
      { name: "dried red chilies", amount: "2", optional: true },
      { name: "ghee", amount: "2 tbsp", optional: false },
      { name: "cilantro", amount: "for garnish", optional: true }
    ],
    instructions: [
      { step: 1, description: "Pressure cook dal with turmeric and tomato (15 min)", duration: 20 },
      { step: 2, description: "Mash cooked dal to desired consistency", duration: 3 },
      { step: 3, description: "Heat ghee, add mustard seeds until they splutter", duration: 2 },
      { step: 4, description: "Add garlic, curry leaves, and red chilies", duration: 2 },
      { step: 5, description: "Pour tempering over dal, garnish with cilantro", duration: 2 }
    ],
    nutrition: { calories: 195, protein: 11, carbs: 32, fat: 4, fiber: 7, sugar: 3, sodium: 260, servingSize: "1 cup" },
    tags: ["dinner", "indian", "dal", "lentils", "quick"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 5, cook: 25 },
    difficulty: "quick",
    servings: 4
  },
  {
    title: "Sambar (South Indian Lentil Stew)",
        description: "A tangy South Indian lentil stew with vegetables and tamarind. A staple accompaniment for idli, dosa, and rice.",
    images: [
      { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800", alt: "South Indian Sambar in a bowl", isPrimary: true }
    ],
    ingredients: [
      { name: "toor dal", amount: "1 cup", optional: false },
      { name: "mixed vegetables", amount: "2 cups (drumstick, pumpkin, eggplant)", optional: false },
      { name: "tamarind paste", amount: "2 tbsp", optional: false },
      { name: "sambar powder", amount: "2 tbsp", optional: false },
      { name: "mustard seeds", amount: "1 tsp", optional: false },
      { name: "fenugreek seeds", amount: "1/4 tsp", optional: false },
      { name: "curry leaves", amount: "2 sprigs", optional: false },
      { name: "asafoetida (hing)", amount: "1/4 tsp", optional: false },
      { name: "oil", amount: "2 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Cook toor dal until mushy, mash well", duration: 30 },
      { step: 2, description: "Cook vegetables with tamarind water until tender", duration: 20 },
      { step: 3, description: "Combine dal with vegetables and sambar powder", duration: 5 },
      { step: 4, description: "Prepare tempering with mustard, fenugreek, curry leaves", duration: 5 },
      { step: 5, description: "Pour tempering over sambar, simmer for 10 minutes", duration: 10 }
    ],
    nutrition: { calories: 185, protein: 10, carbs: 34, fat: 3, fiber: 8, sugar: 6, sodium: 320, servingSize: "1 cup" },
    tags: ["dinner", "indian", "south-indian", "dal", "stew"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "medium" },
    time: { prep: 20, cook: 45 },
    difficulty: "medium",
    servings: 6
  },
  {
    title: "Paneer Tikka Masala",
    description: "Grilled marinated paneer cubes in a rich, creamy tomato gravy. Restaurant-style indulgence made at home.",
    images: [
      { url: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6eb?w=800", alt: "Paneer Tikka Masala with naan", isPrimary: true }
    ],
    ingredients: [
      { name: "paneer", amount: "400g, cubed", optional: false },
      { name: "yogurt", amount: "1/2 cup", optional: false },
      { name: "ginger-garlic paste", amount: "2 tbsp", optional: false },
      { name: "kashmiri red chili powder", amount: "1 tsp", optional: false },
      { name: "garam masala", amount: "1 tsp", optional: false },
      { name: "kasuri methi", amount: "1 tbsp", optional: false },
      { name: "cashew paste", amount: "3 tbsp", optional: false },
      { name: "cream", amount: "1/2 cup", optional: false },
      { name: "butter", amount: "3 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Marinate paneer in yogurt and spices for 30 minutes", duration: 30 },
      { step: 2, description: "Grill or pan-fry paneer until charred spots appear", duration: 15 },
      { step: 3, description: "Prepare makhani gravy with tomatoes, butter, and cashews", duration: 25 },
      { step: 4, description: "Blend gravy until smooth, strain if desired", duration: 10 },
      { step: 5, description: "Add paneer tikka and cream, simmer for 10 minutes", duration: 10 }
    ],
    nutrition: { calories: 485, protein: 22, carbs: 18, fat: 36, fiber: 4, sugar: 10, sodium: 620, servingSize: "1 cup" },
    tags: ["dinner", "indian", "curry", "paneer", "restaurant-style"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: false, spiceLevel: "medium" },
    time: { prep: 45, cook: 45 },
    difficulty: "elaborate",
    servings: 4
  }
];

module.exports = recipes;
