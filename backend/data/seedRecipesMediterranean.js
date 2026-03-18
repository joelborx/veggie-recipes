const recipes = [
  {
    title: "Mediterranean Chickpea Salad",
    description: "A refreshing and protein-packed salad with chickpeas, cucumber, tomatoes, and a lemon-herb dressing.",
    images: [
      { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", alt: "Mediterranean chickpea salad in a bowl", isPrimary: true }
    ],
    ingredients: [
      { name: "canned chickpeas", amount: "400g", optional: false },
      { name: "cucumber", amount: "1 large", optional: false },
      { name: "cherry tomatoes", amount: "250g", optional: false },
      { name: "red onion", amount: "1/2", optional: false },
      { name: "olive oil", amount: "3 tbsp", optional: false },
      { name: "lemon juice", amount: "2 tbsp", optional: false },
      { name: "fresh parsley", amount: "1/4 cup", optional: false },
      { name: "feta cheese", amount: "100g", optional: true }
    ],
    instructions: [
      { step: 1, description: "Drain and rinse chickpeas, place in a large bowl.", duration: 5 },
      { step: 2, description: "Dice cucumber, halve tomatoes, and finely chop onion. Add to bowl.", duration: 10 },
      { step: 3, description: "Whisk olive oil, lemon juice, salt and pepper. Pour over salad.", duration: 5 },
      { step: 4, description: "Toss gently, garnish with parsley and optional feta. Serve.", duration: 5 }
    ],
    nutrition: { calories: 320, protein: 14, carbs: 38, fat: 14, fiber: 12, sugar: 6, sodium: 580, servingSize: "1 serving" },
    tags: ["dinner", "mediterranean", "salad", "quick", "healthy"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: 0 },
    time: { prep: 15, cook: 0 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Greek Lemon Potatoes",
    description: "Crispy roasted potatoes infused with lemon, garlic, and oregano - a classic Greek side dish.",
    images: [
      { url: "https://images.unsplash.com/photo-1573145506330-0ffec83a2cff?w=800", alt: "Golden roasted lemon potatoes in a baking dish", isPrimary: true }
    ],
    ingredients: [
      { name: "potatoes", amount: "1kg", optional: false },
      { name: "lemon juice", amount: "1/3 cup", optional: false },
      { name: "olive oil", amount: "1/2 cup", optional: false },
      { name: "garlic cloves", amount: "4", optional: false },
      { name: "dried oregano", amount: "2 tsp", optional: false },
      { name: "vegetable broth", amount: "1 cup", optional: false },
      { name: "fresh oregano", amount: "for garnish", optional: true }
    ],
    instructions: [
      { step: 1, description: "Preheat oven to 200°C. Peel and cut potatoes into wedges.", duration: 10 },
      { step: 2, description: "Whisk lemon juice, oil, garlic, oregano, salt and pepper.", duration: 5 },
      { step: 3, description: "Toss potatoes with mixture in a baking dish. Add broth.", duration: 5 },
      { step: 4, description: "Roast for 40 minutes, turning once, until golden and crispy.", duration: 40 }
    ],
    nutrition: { calories: 285, protein: 4, carbs: 38, fat: 14, fiber: 4, sugar: 2, sodium: 420, servingSize: "1 serving" },
    tags: ["dinner", "mediterranean", "side", "potatoes", "roasted"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: 0 },
    time: { prep: 15, cook: 40 },
    difficulty: "easy",
    servings: 6
  },
  {
    title: "Caprese Stuffed Portobello Mushrooms",
    description: "Juicy portobello mushrooms stuffed with mozzarella, tomatoes, and basil, drizzled with balsamic glaze.",
    images: [
      { url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800", alt: "Stuffed portobello mushrooms with melted cheese", isPrimary: true }
    ],
    ingredients: [
      { name: "portobello mushrooms", amount: "4 large", optional: false },
      { name: "mozzarella cheese", amount: "200g", optional: false },
      { name: "cherry tomatoes", amount: "200g", optional: false },
      { name: "fresh basil", amount: "1/2 cup", optional: false },
      { name: "balsamic vinegar", amount: "3 tbsp", optional: false },
      { name: "olive oil", amount: "2 tbsp", optional: false },
      { name: "garlic", amount: "2 cloves", optional: false }
    ],
    instructions: [
      { step: 1, description: "Preheat oven to 190°C. Clean mushrooms and remove stems.", duration: 5 },
      { step: 2, description: "Mix oil, garlic, salt and pepper. Brush on mushroom caps.", duration: 5 },
      { step: 3, description: "Fill each mushroom with sliced mozzarella and tomatoes.", duration: 10 },
      { step: 4, description: "Bake for 20 minutes until cheese melts. Top with basil and balsamic.", duration: 20 }
    ],
    nutrition: { calories: 245, protein: 14, carbs: 9, fat: 18, fiber: 2, sugar: 5, sodium: 380, servingSize: "1 mushroom" },
    tags: ["dinner", "mediterranean", "mushrooms", "caprese", "quick"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: false, isNutFree: true, spiceLevel: 0 },
    time: { prep: 20, cook: 20 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Lentil Soup with Spinach",
    description: "Hearty Mediterranean lentil soup with tender lentils, spinach, carrots, and warm spices.",
    images: [
      { url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800", alt: "Bowl of red lentil soup with spinach", isPrimary: true }
    ],
    ingredients: [
      { name: "red lentils", amount: "250g", optional: false },
      { name: "spinach", amount: "200g", optional: false },
      { name: "carrots", amount: "2", optional: false },
      { name: "celery", amount: "2 stalks", optional: false },
      { name: "onion", amount: "1", optional: false },
      { name: "vegetable broth", amount: "1.5L", optional: false },
      { name: "cumin", amount: "1 tsp", optional: false },
      { name: "paprika", amount: "1 tsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Dice onion, carrots and celery. Sauté in olive oil until soft.", duration: 10 },
      { step: 2, description: "Add lentils, broth, cumin and paprika. Bring to boil.", duration: 5 },
      { step: 3, description: "Simmer for 25 minutes until lentils are tender.", duration: 25 },
      { step: 4, description: "Stir in spinach and cook until wilted. Season and serve.", duration: 5 }
    ],
    nutrition: { calories: 280, protein: 18, carbs: 42, fat: 6, fiber: 16, sugar: 5, sodium: 520, servingSize: "1 bowl" },
    tags: ["dinner", "mediterranean", "soup", "lentils", "healthy"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: 1 },
    time: { prep: 15, cook: 30 },
    difficulty: "easy",
    servings: 6
  },
  {
    title: "Ratatouille",
    description: "Classic Provençal vegetable stew with eggplant, zucchini, peppers, and tomatoes, slow-cooked to perfection.",
    images: [
      { url: "https://images.unsplash.com/photo-1572453800999-e8d2d0ef81ae?w=800", alt: "Colorful ratatouille in a rustic pan", isPrimary: true }
    ],
    ingredients: [
      { name: "eggplant", amount: "1 large", optional: false },
      { name: "zucchini", amount: "2", optional: false },
      { name: "bell peppers", amount: "2", optional: false },
      { name: "tomatoes", amount: "4", optional: false },
      { name: "onion", amount: "1", optional: false },
      { name: "garlic", amount: "4 cloves", optional: false },
      { name: "olive oil", amount: "1/4 cup", optional: false },
      { name: "fresh thyme", amount: "4 sprigs", optional: false }
    ],
    instructions: [
      { step: 1, description: "Dice all vegetables. Salt eggplant and let drain for 20 minutes.", duration: 25 },
      { step: 2, description: "Sauté onion and garlic until fragrant. Add peppers.", duration: 10 },
      { step: 3, description: "Add eggplant, zucchini, tomatoes and thyme. Cover and simmer.", duration: 5 },
      { step: 4, description: "Cook for 35-40 minutes, stirring occasionally, until tender.", duration: 40 }
    ],
    nutrition: { calories: 165, protein: 4, carbs: 22, fat: 9, fiber: 8, sugar: 12, sodium: 310, servingSize: "1 serving" },
    tags: ["dinner", "mediterranean", "french", "stew", "vegetables"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: 0 },
    time: { prep: 30, cook: 50 },
    difficulty: "medium",
    servings: 6
  },
  {
    title: "Stuffed Bell Peppers with Rice and Herbs",
    description: "Sweet bell peppers filled with aromatic rice, pine nuts, fresh herbs, and Mediterranean spices.",
    images: [
      { url: "https://images.unsplash.com/photo-1600336153113-d62c5c202b74?w=800", alt: "Stuffed bell peppers arranged on a plate", isPrimary: true }
    ],
    ingredients: [
      { name: "bell peppers", amount: "6", optional: false },
      { name: " Arborio rice", amount: "200g", optional: false },
      { name: "vegetable broth", amount: "500ml", optional: false },
      { name: "onion", amount: "1", optional: false },
      { name: "garlic", amount: "3 cloves", optional: false },
      { name: "pine nuts", amount: "50g", optional: false },
      { name: "dried mint", amount: "1 tbsp", optional: false },
      { name: "dill", amount: "1/4 cup", optional: false },
      { name: "tomato paste", amount: "2 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Cook rice in broth until almost done. Preheat oven to 190°C.", duration: 15 },
      { step: 2, description: "Sauté onion and garlic. Mix with rice, nuts, herbs and paste.", duration: 10 },
      { step: 3, description: "Cut pepper tops off, remove seeds. Stuff with rice mixture.", duration: 10 },
      { step: 4, description: "Arrange in baking dish with water. Cover and bake 35 minutes.", duration: 35 }
    ],
    nutrition: { calories: 295, protein: 8, carbs: 45, fat: 11, fiber: 5, sugar: 8, sodium: 420, servingSize: "2 peppers" },
    tags: ["dinner", "mediterranean", "rice", "stuffed", "baked"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: false, spiceLevel: 0 },
    time: { prep: 25, cook: 50 },
    difficulty: "medium",
    servings: 3
  },
  {
    title: "Mediterranean Veggie Wrap",
    description: "Whole wheat wrap filled with hummus, roasted vegetables, feta, and fresh greens.",
    images: [
      { url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800", alt: "Mediterranean vegetable wrap cut in half", isPrimary: true }
    ],
    ingredients: [
      { name: "whole wheat wraps", amount: "4", optional: false },
      { name: "hummus", amount: "200g", optional: false },
      { name: "zucchini", amount: "1", optional: false },
      { name: "red pepper", amount: "1", optional: false },
      { name: "red onion", amount: "1/2", optional: false },
      { name: "feta cheese", amount: "100g", optional: false },
      { name: "mixed greens", amount: "2 cups", optional: false },
      { name: "olives", amount: "1/4 cup", optional: true }
    ],
    instructions: [
      { step: 1, description: "Slice vegetables and roast at 200°C for 20 minutes.", duration: 25 },
      { step: 2, description: "Warm wraps slightly. Spread hummus on each.", duration: 5 },
      { step: 3, description: "Layer greens, roasted vegetables, crumbled feta and olives.", duration: 10 },
      { step: 4, description: "Fold and roll tightly. Cut in half to serve.", duration: 5 }
    ],
    nutrition: { calories: 385, protein: 14, carbs: 48, fat: 16, fiber: 10, sugar: 6, sodium: 680, servingSize: "1 wrap" },
    tags: ["dinner", "mediterranean", "wrap", "lunch", "quick"],
    dietaryInfo: { isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: 0 },
    time: { prep: 15, cook: 20 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Spanish Chickpea and Spinach Stew",
    description: "Warm and comforting Spanish-style stew with chickpeas, spinach, smoky paprika, and saffron.",
    images: [
      { url: "https://images.unsplash.com/photo-1540420773420-3366772f4993?w=800", alt: "Hearty chickpea spinach stew in a bowl", isPrimary: true }
    ],
    ingredients: [
      { name: "chickpeas", amount: "2 cans", optional: false },
      { name: "spinach", amount: "300g", optional: false },
      { name: "onion", amount: "1", optional: false },
      { name: "garlic", amount: "4 cloves", optional: false },
      { name: "smoked paprika", amount: "2 tsp", optional: false },
      { name: "saffron threads", amount: "pinch", optional: false },
      { name: "tomatoes", amount: "400g can", optional: false },
      { name: "vegetable broth", amount: "500ml", optional: false },
      { name: "crusty bread", amount: "for serving", optional: true }
    ],
    instructions: [
      { step: 1, description: "Sauté onion until golden. Add garlic and paprika.", duration: 8 },
      { step: 2, description: "Add tomatoes, chickpeas, broth and saffron. Simmer 20 minutes.", duration: 25 },
      { step: 3, description: "Stir in spinach and cook until wilted.", duration: 5 },
      { step: 4, description: "Season and serve with crusty bread if desired.", duration: 2 }
    ],
    nutrition: { calories: 310, protein: 15, carbs: 42, fat: 9, fiber: 14, sugar: 8, sodium: 580, servingSize: "1 bowl" },
    tags: ["dinner", "mediterranean", "spanish", "stew", "chickpeas"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: 1 },
    time: { prep: 15, cook: 30 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Eggplant Parmigiana",
    description: "Layers of crispy eggplant, rich tomato sauce, and melted mozzarella baked to golden perfection.",
    images: [
      { url: "https://images.unsplash.com/photo-1574868235872-1663edcb4569?w=800", alt: "Baked eggplant parmigiana with melted cheese", isPrimary: true }
    ],
    ingredients: [
      { name: "eggplants", amount: "2 large", optional: false },
      { name: "mozzarella", amount: "400g", optional: false },
      { name: "parmesan", amount: "100g", optional: false },
      { name: "canned tomatoes", amount: "800g", optional: false },
      { name: "garlic", amount: "3 cloves", optional: false },
      { name: "basil", amount: "1 bunch", optional: false },
      { name: "flour", amount: "1/2 cup", optional: false },
      { name: "eggs", amount: "2", optional: false },
      { name: "breadcrumbs", amount: "1 cup", optional: false }
    ],
    instructions: [
      { step: 1, description: "Salt eggplant slices, let drain 30 min. Rinse and pat dry.", duration: 40 },
      { step: 2, description: "Dredge in flour, egg, breadcrumbs. Fry until golden.", duration: 20 },
      { step: 3, description: "Make sauce with tomatoes, garlic and basil. Simmer 15 min.", duration: 20 },
      { step: 4, description: "Layer eggplant, sauce, cheeses in dish. Bake 30 min at 190°C.", duration: 30 }
    ],
    nutrition: { calories: 425, protein: 22, carbs: 28, fat: 26, fiber: 8, sugar: 12, sodium: 720, servingSize: "1 serving" },
    tags: ["dinner", "mediterranean", "italian", "baked", "eggplant"],
    dietaryInfo: { isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: 0 },
    time: { prep: 45, cook: 50 },
    difficulty: "medium",
    servings: 6
  },
  {
    title: "Falafel with Tahini Sauce",
    description: "Crispy homemade falafel balls served with creamy tahini sauce and fresh vegetables.",
    images: [
      { url: "https://images.unsplash.com/photo-1547058881-aa04225503d2?w=800", alt: "Golden falafel balls on a plate with tahini", isPrimary: true }
    ],
    ingredients: [
      { name: "dried chickpeas", amount: "250g", optional: false },
      { name: "onion", amount: "1", optional: false },
      { name: "garlic", amount: "4 cloves", optional: false },
      { name: "fresh parsley", amount: "1 cup", optional: false },
      { name: "fresh cilantro", amount: "1/2 cup", optional: false },
      { name: "cumin", amount: "1 tsp", optional: false },
      { name: "coriander", amount: "1 tsp", optional: false },
      { name: "baking soda", amount: "1/2 tsp", optional: false },
      { name: "tahini", amount: "1/2 cup", optional: false }
    ],
    instructions: [
      { step: 1, description: "Soak chickpeas overnight. Drain well.", duration: 1 },
      { step: 2, description: "Blend chickpeas with herbs, onion, garlic and spices until coarse.", duration: 10 },
      { step: 3, description: "Add baking soda, rest 30 min. Form into balls.", duration: 40 },
      { step: 4, description: "Deep fry at 175°C for 3-4 min until crispy and golden.", duration: 15 }
    ],
    nutrition: { calories: 340, protein: 14, carbs: 38, fat: 16, fiber: 10, sugar: 4, sodium: 480, servingSize: "4 falafel" },
    tags: ["dinner", "mediterranean", "middle-eastern", "fried", "chickpeas"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: 1 },
    time: { prep: 60, cook: 15 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Spanakopita",
    description: "Classic Greek spinach and feta pie wrapped in crispy, flaky phyllo pastry.",
    images: [
      { url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800", alt: "Golden spanakopita triangles on a plate", isPrimary: true }
    ],
    ingredients: [
      { name: "phyllo pastry", amount: "500g", optional: false },
      { name: "spinach", amount: "1kg", optional: false },
      { name: "feta cheese", amount: "300g", optional: false },
      { name: "onion", amount: "1 large", optional: false },
      { name: "green onions", amount: "4", optional: false },
      { name: "dill", amount: "1/2 cup", optional: false },
      { name: "eggs", amount: "2", optional: false },
      { name: "olive oil", amount: "1/2 cup", optional: false },
      { name: "nutmeg", amount: "1/4 tsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Wilt spinach, drain and squeeze dry. Chop finely.", duration: 15 },
      { step: 2, description: "Sauté onion until soft. Mix with spinach, feta, dill, eggs and nutmeg.", duration: 15 },
      { step: 3, description: "Brush phyllo with oil, layer in dish. Add filling, fold over.", duration: 20 },
      { step: 4, description: "Score top, bake at 180°C for 45 min until golden and crisp.", duration: 45 }
    ],
    nutrition: { calories: 385, protein: 14, carbs: 32, fat: 24, fiber: 5, sugar: 4, sodium: 680, servingSize: "1 piece" },
    tags: ["dinner", "mediterranean", "greek", "pastry", "spinach"],
    dietaryInfo: { isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: 0 },
    time: { prep: 50, cook: 45 },
    difficulty: "medium",
    servings: 8
  },
  {
    title: "Vegetable Paella",
    description: "Traditional Spanish rice dish loaded with seasonal vegetables, saffron, and smoky paprika.",
    images: [
      { url: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800", alt: "Colorful vegetable paella in a traditional pan", isPrimary: true }
    ],
    ingredients: [
      { name: "Bomba rice", amount: "400g", optional: false },
      { name: "vegetable broth", amount: "1.2L", optional: false },
      { name: "saffron threads", amount: "1/2 tsp", optional: false },
      { name: "red pepper", amount: "1", optional: false },
      { name: "green beans", amount: "200g", optional: false },
      { name: "artichoke hearts", amount: "200g", optional: false },
      { name: "tomatoes", amount: "2", optional: false },
      { name: "garlic", amount: "4 cloves", optional: false },
      { name: "smoked paprika", amount: "1 tbsp", optional: false },
      { name: "peas", amount: "100g", optional: false },
      { name: "lemon", amount: "1", optional: true }
    ],
    instructions: [
      { step: 1, description: "Infuse saffron in warm broth. Prep all vegetables.", duration: 15 },
      { step: 2, description: "Sauté garlic, tomatoes and paprika in paella pan.", duration: 10 },
      { step: 3, description: "Add rice, coat well. Pour in broth, arrange vegetables artfully.", duration: 10 },
      { step: 4, description: "Simmer without stirring for 20 min. Rest 5 min. Serve with lemon.", duration: 25 }
    ],
    nutrition: { calories: 345, protein: 10, carbs: 68, fat: 6, fiber: 8, sugar: 8, sodium: 520, servingSize: "1 serving" },
    tags: ["dinner", "mediterranean", "spanish", "rice", "paella"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: 1 },
    time: { prep: 25, cook: 35 },
    difficulty: "medium",
    servings: 6
  }
];

module.exports = recipes;
