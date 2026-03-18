const recipes = [
  {
    title: "Quick Quesadillas with Pico de Gallo",
    description: "Crispy flour tortillas filled with melted cheese and served with fresh homemade pico de gallo salsa. A classic Mexican comfort food ready in minutes.",
    images: [
      { url: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=800", alt: "Golden quesadilla with melted cheese", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800", alt: "Fresh pico de gallo in a bowl", isPrimary: false }
    ],
    ingredients: [
      { name: "flour tortillas", amount: "4 large", optional: false },
      { name: "Oaxaca cheese", amount: "300g shredded", optional: false },
      { name: "tomatoes", amount: "4 diced", optional: false },
      { name: "white onion", amount: "1/2 diced", optional: false },
      { name: "jalapeño", amount: "1 minced", optional: true },
      { name: "fresh cilantro", amount: "1/4 cup chopped", optional: false },
      { name: "lime juice", amount: "2 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Mix tomatoes, onion, jalapeño, cilantro, and lime juice in a bowl. Season with salt and set aside.", duration: 5 },
      { step: 2, description: "Heat a non-stick pan over medium heat. Place one tortilla in the pan.", duration: 1 },
      { step: 3, description: "Sprinkle cheese on half the tortilla, fold over, and cook until golden on both sides.", duration: 4 },
      { step: 4, description: "Repeat with remaining tortillas. Cut into wedges and serve with pico de gallo.", duration: 5 }
    ],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 38,
      fat: 22,
      fiber: 3,
      sugar: 4,
      sodium: 580,
      servingSize: "1 quesadilla with salsa"
    },
    tags: ["dinner", "mexican", "quick", "vegetarian", "cheese"],
    dietaryInfo: {
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isNutFree: true,
      spiceLevel: 1
    },
    time: {
      prep: 10,
      cook: 10
    },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Avocado Tostadas with Black Beans",
    description: "Crispy corn tostadas topped with creamy refried black beans, fresh avocado slices, and a tangy cabbage slaw. A refreshing and satisfying meal.",
    images: [
      { url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800", alt: "Avocado tostadas with black beans", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800", alt: "Crispy corn tostada base", isPrimary: false }
    ],
    ingredients: [
      { name: "corn tostadas", amount: "6", optional: false },
      { name: "black beans", amount: "2 cans (400g each)", optional: false },
      { name: "avocados", amount: "2 ripe", optional: false },
      { name: "red cabbage", amount: "2 cups shredded", optional: false },
      { name: "lime", amount: "3", optional: false },
      { name: "garlic", amount: "2 cloves", optional: false },
      { name: "cumin", amount: "1 tsp", optional: false },
      { name: "hot sauce", amount: "to taste", optional: true }
    ],
    instructions: [
      { step: 1, description: "Mash black beans with garlic, cumin, and a splash of water. Heat in a pan until warm.", duration: 8 },
      { step: 2, description: "Toss shredded cabbage with lime juice and a pinch of salt.", duration: 3 },
      { step: 3, description: "Slice avocados thinly.", duration: 3 },
      { step: 4, description: "Spread warm beans on tostadas, top with avocado and cabbage slaw. Drizzle with hot sauce.", duration: 5 }
    ],
    nutrition: {
      calories: 340,
      protein: 12,
      carbs: 42,
      fat: 16,
      fiber: 14,
      sugar: 3,
      sodium: 420,
      servingSize: "2 tostadas"
    },
    tags: ["dinner", "mexican", "quick", "vegetarian", "avocado"],
    dietaryInfo: {
      isVegan: true,
      isGlutenFree: true,
      isDairyFree: true,
      isNutFree: true,
      spiceLevel: 2
    },
    time: {
      prep: 10,
      cook: 10
    },
    difficulty: "easy",
    servings: 3
  },
  {
    title: "Sopa de Fideo",
    description: "Traditional Mexican noodle soup with golden toasted vermicelli in a rich tomato broth. Comforting, simple, and deeply satisfying.",
    images: [
      { url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800", alt: "Mexican noodle soup with tomatoes", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800", alt: "Fresh soup in a rustic bowl", isPrimary: false }
    ],
    ingredients: [
      { name: "fideo noodles", amount: "200g", optional: false },
      { name: "roma tomatoes", amount: "4", optional: false },
      { name: "vegetable broth", amount: "6 cups", optional: false },
      { name: "white onion", amount: "1/2", optional: false },
      { name: "garlic", amount: "3 cloves", optional: false },
      { name: "cilantro", amount: "1 bunch", optional: false },
      { name: "vegetable oil", amount: "2 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Blend tomatoes, onion, and garlic with a cup of broth until smooth.", duration: 5 },
      { step: 2, description: "Toast fideo noodles in oil until golden brown.", duration: 5 },
      { step: 3, description: "Pour tomato mixture over noodles and cook for 2 minutes.", duration: 3 },
      { step: 4, description: "Add remaining broth, simmer until noodles are tender, about 8 minutes.", duration: 10 },
      { step: 5, description: "Serve hot with fresh cilantro.", duration: 2 }
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 48,
      fat: 8,
      fiber: 4,
      sugar: 6,
      sodium: 680,
      servingSize: "1 bowl"
    },
    tags: ["dinner", "mexican", "quick", "vegetarian", "soup"],
    dietaryInfo: {
      isVegan: true,
      isGlutenFree: false,
      isDairyFree: true,
      isNutFree: true,
      spiceLevel: 0
    },
    time: {
      prep: 10,
      cook: 20
    },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Elote Street Corn Salad",
    description: "All the flavors of Mexican street corn in an easy-to-eat bowl. Charred corn kernels tossed with creamy mayo, cotija cheese, lime, and chili powder.",
    images: [
      { url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800", alt: "Mexican street corn in a cup", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800", alt: "Grilled corn with toppings", isPrimary: false }
    ],
    ingredients: [
      { name: "corn kernels", amount: "4 cups fresh or frozen", optional: false },
      { name: "mayonnaise", amount: "1/4 cup", optional: false },
      { name: "cotija cheese", amount: "100g crumbled", optional: false },
      { name: "lime", amount: "2", optional: false },
      { name: "chili powder", amount: "1 tsp", optional: false },
      { name: "cilantro", amount: "1/4 cup chopped", optional: false },
      { name: "garlic powder", amount: "1/2 tsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Heat a cast-iron skillet over high heat. Char corn kernels until slightly blackened, stirring occasionally.", duration: 10 },
      { step: 2, description: "In a large bowl, mix mayonnaise, lime juice, garlic powder, and chili powder.", duration: 3 },
      { step: 3, description: "Toss warm corn with the mayo mixture until well coated.", duration: 2 },
      { step: 4, description: "Top with cotija cheese and cilantro. Serve immediately.", duration: 3 }
    ],
    nutrition: {
      calories: 310,
      protein: 8,
      carbs: 34,
      fat: 18,
      fiber: 5,
      sugar: 8,
      sodium: 380,
      servingSize: "1 cup"
    },
    tags: ["dinner", "mexican", "quick", "vegetarian", "corn"],
    dietaryInfo: {
      isVegan: false,
      isGlutenFree: true,
      isDairyFree: false,
      isNutFree: true,
      spiceLevel: 2
    },
    time: {
      prep: 5,
      cook: 15
    },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Chiles Rellenos with Oaxaca Cheese",
    description: "Poblano peppers stuffed with melted Oaxaca cheese, dipped in a fluffy egg batter, and fried until golden. Served with a light tomato sauce.",
    images: [
      { url: "https://images.unsplash.com/photo-1534352956036-cd81e27fed21?w=800", alt: "Stuffed poblano peppers on plate", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800", alt: "Mexican cheese dish close up", isPrimary: false }
    ],
    ingredients: [
      { name: "poblano peppers", amount: "6 large", optional: false },
      { name: "Oaxaca cheese", amount: "400g", optional: false },
      { name: "eggs", amount: "4 separated", optional: false },
      { name: "flour", amount: "1/2 cup", optional: false },
      { name: "tomatoes", amount: "3", optional: false },
      { name: "vegetable oil", amount: "for frying", optional: false },
      { name: "garlic", amount: "2 cloves", optional: false }
    ],
    instructions: [
      { step: 1, description: "Roast peppers over open flame until charred, then peel off skin. Make a slit and remove seeds.", duration: 15 },
      { step: 2, description: "Stuff each pepper with cheese strips and close with toothpicks.", duration: 10 },
      { step: 3, description: "Dredge peppers in flour, then dip in whipped egg whites folded with yolks.", duration: 10 },
      { step: 4, description: "Fry peppers in hot oil until golden on all sides.", duration: 8 },
      { step: 5, description: "Blend tomatoes and garlic for sauce. Simmer for 10 minutes.", duration: 15 },
      { step: 6, description: "Serve peppers topped with tomato sauce.", duration: 2 }
    ],
    nutrition: {
      calories: 380,
      protein: 22,
      carbs: 18,
      fat: 26,
      fiber: 4,
      sugar: 5,
      sodium: 520,
      servingSize: "2 peppers with sauce"
    },
    tags: ["dinner", "mexican", "medium", "vegetarian", "cheese"],
    dietaryInfo: {
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isNutFree: true,
      spiceLevel: 2
    },
    time: {
      prep: 35,
      cook: 35
    },
    difficulty: "medium",
    servings: 3
  },
  {
    title: "Vegetarian Enchiladas Suizas",
    description: "Corn tortillas filled with roasted vegetables and smothered in a creamy tomatillo sauce with melted cheese. Named after Swiss immigrants who added cream to Mexican cuisine.",
    images: [
      { url: "https://images.unsplash.com/photo-1534352956036-cd81e27fed21?w=800", alt: "Green enchiladas in baking dish", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1562059390-a761a084768e?w=800", alt: "Mexican enchiladas with sauce", isPrimary: false }
    ],
    ingredients: [
      { name: "corn tortillas", amount: "12", optional: false },
      { name: "tomatillos", amount: "500g", optional: false },
      { name: "zucchini", amount: "2 diced", optional: false },
      { name: "corn", amount: "1 cup", optional: false },
      { name: "crema", amount: "1/2 cup", optional: false },
      { name: "Oaxaca cheese", amount: "300g shredded", optional: false },
      { name: "serrano peppers", amount: "2", optional: true },
      { name: "cilantro", amount: "1 bunch", optional: false }
    ],
    instructions: [
      { step: 1, description: "Roast tomatillos and serranos under broiler until charred. Blend with cilantro and crema.", duration: 15 },
      { step: 2, description: "Sauté zucchini and corn until tender. Season with salt.", duration: 10 },
      { step: 3, description: "Dip tortillas in warm sauce, fill with vegetables, and roll into baking dish.", duration: 15 },
      { step: 4, description: "Pour remaining sauce over enchiladas and top with cheese.", duration: 5 },
      { step: 5, description: "Bake at 375°F (190°C) for 20 minutes until bubbly.", duration: 25 },
      { step: 6, description: "Let cool slightly before serving.", duration: 5 }
    ],
    nutrition: {
      calories: 420,
      protein: 18,
      carbs: 44,
      fat: 22,
      fiber: 8,
      sugar: 6,
      sodium: 580,
      servingSize: "3 enchiladas"
    },
    tags: ["dinner", "mexican", "medium", "vegetarian", "baked"],
    dietaryInfo: {
      isVegan: false,
      isGlutenFree: true,
      isDairyFree: false,
      isNutFree: true,
      spiceLevel: 3
    },
    time: {
      prep: 45,
      cook: 30
    },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Rajas con Crema",
    description: "Poblano pepper strips sautéed with corn and caramelized onions in a silky Mexican crema sauce. A classic central Mexican dish with smoky, creamy flavors.",
    images: [
      { url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800", alt: "Poblano peppers in cream sauce", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1623238911076-e00fef5a3217?w=800", alt: "Mexican peppers and corn dish", isPrimary: false }
    ],
    ingredients: [
      { name: "poblano peppers", amount: "4 large", optional: false },
      { name: "white onion", amount: "1 sliced", optional: false },
      { name: "corn kernels", amount: "1.5 cups", optional: false },
      { name: "Mexican crema", amount: "3/4 cup", optional: false },
      { name: "butter", amount: "2 tbsp", optional: false },
      { name: "garlic", amount: "2 cloves minced", optional: false },
      { name: "epazote", amount: "1 tsp dried", optional: true }
    ],
    instructions: [
      { step: 1, description: "Roast poblano peppers until charred, then peel, seed, and cut into strips (rajas).", duration: 20 },
      { step: 2, description: "Sauté onions in butter over medium heat until caramelized.", duration: 15 },
      { step: 3, description: "Add garlic and corn, cook for 5 minutes.", duration: 5 },
      { step: 4, description: "Add rajas and epazote, cook for 3 minutes.", duration: 5 },
      { step: 5, description: "Stir in crema gently, warm through without boiling.", duration: 5 },
      { step: 6, description: "Season with salt and serve with warm tortillas.", duration: 2 }
    ],
    nutrition: {
      calories: 340,
      protein: 8,
      carbs: 28,
      fat: 24,
      fiber: 5,
      sugar: 8,
      sodium: 180,
      servingSize: "1 cup"
    },
    tags: ["dinner", "mexican", "medium", "vegetarian", "creamy"],
    dietaryInfo: {
      isVegan: false,
      isGlutenFree: true,
      isDairyFree: false,
      isNutFree: true,
      spiceLevel: 2
    },
    time: {
      prep: 25,
      cook: 30
    },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Sopa Azteca (Tortilla Soup)",
    description: "Rich tomato-based soup with fried tortilla strips, avocado, cheese, and crema. A hearty Mexican classic with layers of texture and flavor.",
    images: [
      { url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800", alt: "Mexican tortilla soup in bowl", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1605493666574-278103849c18?w=800", alt: "Soup with avocado and tortilla strips", isPrimary: false }
    ],
    ingredients: [
      { name: "corn tortillas", amount: "8", optional: false },
      { name: "tomatoes", amount: "6 roma", optional: false },
      { name: "vegetable broth", amount: "6 cups", optional: false },
      { name: "avocado", amount: "2", optional: false },
      { name: "queso fresco", amount: "150g", optional: false },
      { name: "pasilla chiles", amount: "2 dried", optional: false },
      { name: "garlic", amount: "4 cloves", optional: false },
      { name: "vegetable oil", amount: "for frying", optional: false }
    ],
    instructions: [
      { step: 1, description: "Cut tortillas into strips and fry until crispy. Drain on paper towels.", duration: 10 },
      { step: 2, description: "Toast pasilla chiles in a dry pan, then soak in hot water.", duration: 15 },
      { step: 3, description: "Blend tomatoes, soaked chiles, and garlic until smooth.", duration: 5 },
      { step: 4, description: "Strain tomato mixture and cook in a pot for 10 minutes.", duration: 15 },
      { step: 5, description: "Add broth and simmer for 20 minutes. Season with salt.", duration: 25 },
      { step: 6, description: "Serve soup topped with tortilla strips, diced avocado, and crumbled cheese.", duration: 5 }
    ],
    nutrition: {
      calories: 360,
      protein: 12,
      carbs: 42,
      fat: 18,
      fiber: 8,
      sugar: 6,
      sodium: 720,
      servingSize: "1.5 cups"
    },
    tags: ["dinner", "mexican", "medium", "vegetarian", "soup"],
    dietaryInfo: {
      isVegan: false,
      isGlutenFree: true,
      isDairyFree: false,
      isNutFree: true,
      spiceLevel: 2
    },
    time: {
      prep: 20,
      cook: 50
    },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Mole Poblano over Roasted Vegetables",
    description: "Complex, rich mole sauce with hints of chocolate and multiple chiles, served over roasted seasonal vegetables. A festive dish that takes time but rewards patience.",
    images: [
      { url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800", alt: "Mole sauce with vegetables", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1618414466256-34825418e42a?w=800", alt: "Mexican mole with chocolate", isPrimary: false }
    ],
    ingredients: [
      { name: "mulato chiles", amount: "4 dried", optional: false },
      { name: "ancho chiles", amount: "3 dried", optional: false },
      { name: "pasilla chiles", amount: "2 dried", optional: false },
      { name: "Mexican chocolate", amount: "1 tablet (90g)", optional: false },
      { name: "almonds", amount: "1/4 cup", optional: false },
      { name: "raisins", amount: "1/4 cup", optional: false },
      { name: "vegetable broth", amount: "6 cups", optional: false },
      { name: "zucchini", amount: "3", optional: false },
      { name: "cauliflower", amount: "1 head", optional: false },
      { name: "sweet potato", amount: "2", optional: false },
      { name: "sesame seeds", amount: "2 tbsp", optional: false }
    ],
    instructions: [
      { step: 1, description: "Remove stems and seeds from all dried chiles. Toast them lightly.", duration: 10 },
      { step: 2, description: "Soak chiles in hot water for 30 minutes until softened.", duration: 35 },
      { step: 3, description: "Blend chiles with almonds, raisins, sesame seeds, and 2 cups broth until smooth.", duration: 5 },
      { step: 4, description: "Strain the mixture into a large pot. Cook for 15 minutes, stirring constantly.", duration: 20 },
      { step: 5, description: "Gradually add remaining broth, stirring until sauce thickens. Simmer for 45 minutes.", duration: 50 },
      { step: 6, description: "Add chocolate and stir until melted. Simmer for another 20 minutes.", duration: 25 },
      { step: 7, description: "Roast vegetables at 400°F (200°C) for 25 minutes until tender.", duration: 35 },
      { step: 8, description: "Serve vegetables topped generously with mole sauce and sesame seeds.", duration: 5 }
    ],
    nutrition: {
      calories: 420,
      protein: 14,
      carbs: 56,
      fat: 18,
      fiber: 16,
      sugar: 18,
      sodium: 480,
      servingSize: "1 cup vegetables with 1/2 cup mole"
    },
    tags: ["dinner", "mexican", "elaborate", "vegetarian", "mole"],
    dietaryInfo: {
      isVegan: true,
      isGlutenFree: true,
      isDairyFree: true,
      isNutFree: false,
      spiceLevel: 2
    },
    time: {
      prep: 60,
      cook: 120
    },
    difficulty: "hard",
    servings: 6
  },
  {
    title: "Tamales Oaxaqueños Negros",
    description: "Traditional Oaxacan black tamales wrapped in banana leaves with a complex mole negro filling. A celebration dish requiring multiple steps and careful preparation.",
    images: [
      { url: "https://images.unsplash.com/photo-1565299624946-b28f40aaeae2?w=800", alt: "Mexican tamales wrapped in banana leaves", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1590163575366-5c970594149a?w=800", alt: "Steamed tamales on plate", isPrimary: false }
    ],
    ingredients: [
      { name: "masa harina", amount: "500g", optional: false },
      { name: "banana leaves", amount: "12 pieces", optional: false },
      { name: "black beans", amount: "2 cups dried", optional: false },
      { name: "chocolate negro", amount: "60g", optional: false },
      { name: "chihuacle chiles", amount: "3 dried", optional: false },
      { name: "pasilla chiles", amount: "4 dried", optional: false },
      { name: "avocado leaves", amount: "4 dried", optional: false },
      { name: "lard", amount: "1/2 cup", optional: false },
      { name: "vegetable broth", amount: "3 cups", optional: false },
      { name: "onion", amount: "1 large", optional: false },
      { name: "garlic", amount: "6 cloves", optional: false },
      { name: "cinnamon", amount: "1 stick", optional: false }
    ],
    instructions: [
      { step: 1, description: "Cook black beans until very soft. Reserve cooking liquid.", duration: 120 },
      { step: 2, description: "Toast all dried chiles, then soak in hot water for 30 minutes.", duration: 40 },
      { step: 3, description: "Blend soaked chiles with half the cooked beans, chocolate, cinnamon, and garlic.", duration: 10 },
      { step: 4, description: "Cook blended mixture in a pot for 30 minutes, stirring frequently. This is the mole filling.", duration: 35 },
      { step: 5, description: "Mix masa harina with lard, broth, and remaining bean liquid to form smooth dough.", duration: 20 },
      { step: 6, description: "Toast banana leaves over flame briefly to make pliable.", duration: 10 },
      { step: 7, description: "Spread dough on leaf, add mole filling and remaining whole beans, fold and tie.", duration: 30 },
      { step: 8, description: "Steam tamales in a large steamer for 1.5 hours until masa pulls away from leaf.", duration: 95 },
      { step: 9, description: "Let rest 10 minutes before unwrapping and serving.", duration: 15 }
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 58,
      fat: 12,
      fiber: 16,
      sugar: 4,
      sodium: 340,
      servingSize: "2 tamales"
    },
    tags: ["dinner", "mexican", "elaborate", "vegetarian", "tamales"],
    dietaryInfo: {
      isVegan: false,
      isGlutenFree: true,
      isDairyFree: true,
      isNutFree: true,
      spiceLevel: 3
    },
    time: {
      prep: 180,
      cook: 120
    },
    difficulty: "hard",
    servings: 6
  }
];

module.exports = recipes;
