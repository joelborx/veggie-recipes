const recipes = [
  {
    title: "Pad Thai",
    description: "Klassisches thailändisches Reisnudelgericht mit Tofu, Erdnüssen und Tamarindensauce",
    images: [{ url: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800", alt: "Pad Thai mit Tofu und Erdnüssen", isPrimary: true }],
    ingredients: [
      { name: "Reisnudeln", amount: "200g", optional: false },
      { name: "Tofu", amount: "150g", optional: false },
      { name: "Erdnüsse", amount: "50g", optional: false },
      { name: "Tamarindenpaste", amount: "2 EL", optional: false },
      { name: "Sojasauce", amount: "2 EL", optional: false },
      { name: "Palmzucker", amount: "1 EL", optional: false },
      { name: "Sprossen", amount: "100g", optional: false },
      { name: "Frühlingszwiebeln", amount: "3 Stück", optional: false },
      { name: "Ei", amount: "2 Stück", optional: true },
      { name: "Limette", amount: "1 Stück", optional: false }
    ],
    instructions: [
      { step: 1, description: "Nudeln nach Packungsanweisung einweichen", duration: 15 },
      { step: 2, description: "Tofu würfeln und goldbraun anbraten", duration: 8 },
      { step: 3, description: "Erdnüsse rösten und beiseite stellen", duration: 3 },
      { step: 4, description: "Sauce aus Tamarinde, Sojasauce und Zucker mischen", duration: 2 },
      { step: 5, description: "Nudeln mit Sauce und Tofu in der Pfanne vermengen", duration: 5 },
      { step: 6, description: "Mit Sprossen, Erdnüssen und Limette servieren", duration: 2 }
    ],
    nutrition: { calories: 450, protein: 18, carbohydrates: 55, fat: 16, fiber: 6, sugar: 12, sodium: 850, servingSize: "1 Portion" },
    tags: ["dinner", "asian", "thai", "stir-fry", "noodles"],
    dietaryInfo: { isVegan: false, isGlutenFree: false, isDairyFree: true, isNutFree: false, spiceLevel: "mild" },
    time: { prep: 15, cook: 20 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Vegetarische Dumplings",
    description: "Gedämpfte chinesische Teigtaschen gefüllt mit Pak Choi und Shiitake",
    images: [{ url: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800", alt: "Gedämpfte vegetarische Dumplings", isPrimary: true }],
    ingredients: [
      { name: "Dumpling-Teig", amount: "300g", optional: false },
      { name: "Pak Choi", amount: "200g", optional: false },
      { name: "Shiitake Pilze", amount: "150g", optional: false },
      { name: "Ingwer", amount: "2cm", optional: false },
      { name: "Knoblauch", amount: "3 Zehen", optional: false },
      { name: "Sesamöl", amount: "1 EL", optional: false },
      { name: "Sojasauce", amount: "2 EL", optional: false },
      { name: "Chiliöl", amount: "1 TL", optional: true }
    ],
    instructions: [
      { step: 1, description: "Gemüse fein hacken und mit Ingwer, Knoblauch anbraten", duration: 10 },
      { step: 2, description: "Füllung mit Sesamöl und Sojasauce würzen, abkühlen lassen", duration: 15 },
      { step: 3, description: "Teig ausrollen und Kreise ausstechen", duration: 10 },
      { step: 4, description: "Füllung in die Mitte geben und falten", duration: 20 },
      { step: 5, description: "Dumplings 8-10 Minuten dämpfen", duration: 10 },
      { step: 6, description: "Mit Sojasauce und Chiliöl servieren", duration: 5 }
    ],
    nutrition: { calories: 320, protein: 10, carbohydrates: 48, fat: 10, fiber: 5, sugar: 4, sodium: 680, servingSize: "1 Portion" },
    tags: ["lunch", "asian", "chinese", "dumplings", "steamed"],
    dietaryInfo: { isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 45, cook: 15 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Miso Ramen",
    description: "Japanische Nudelsuppe mit reicher Miso-Brühe, Tofu und Gemüse",
    images: [{ url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800", alt: "Miso Ramen mit Tofu und Gemüse", isPrimary: true }],
    ingredients: [
      { name: "Ramen-Nudeln", amount: "300g", optional: false },
      { name: "Miso-Paste", amount: "3 EL", optional: false },
      { name: "Tofu", amount: "200g", optional: false },
      { name: "Pak Choi", amount: "150g", optional: false },
      { name: "Frühlingszwiebeln", amount: "4 Stück", optional: false },
      { name: "Nori-Algen", amount: "2 Blätter", optional: false },
      { name: "Sesam", amount: "1 EL", optional: false },
      { name: "Gemüsebrühe", amount: "1.5L", optional: false },
      { name: "Ingwer", amount: "3cm", optional: false },
      { name: "Knoblauch", amount: "3 Zehen", optional: false }
    ],
    instructions: [
      { step: 1, description: "Brühe mit Ingwer und Knoblauch aufkochen", duration: 10 },
      { step: 2, description: "Miso-Paste einrühren und 30 Minuten köcheln lassen", duration: 35 },
      { step: 3, description: "Tofu würfeln und separat anbraten", duration: 10 },
      { step: 4, description: "Nudeln nach Packungsanweisung kochen", duration: 5 },
      { step: 5, description: "Pak Choi kurz in der Brühe blanchieren", duration: 3 },
      { step: 6, description: "Alles in Schüsseln anrichten und garnieren", duration: 5 }
    ],
    nutrition: { calories: 380, protein: 16, carbohydrates: 52, fat: 12, fiber: 7, sugar: 5, sodium: 1200, servingSize: "1 Portion" },
    tags: ["dinner", "asian", "japanese", "soup", "noodles"],
    dietaryInfo: { isVegan: true, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 15, cook: 50 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Kimchi Fried Rice",
    description: "Koreanischer gebratener Reis mit Kimchi, Sesam und einem Spiegelei",
    images: [{ url: "https://images.unsplash.com/photo-1583224964978-2257b96070d3?w=800", alt: "Kimchi Fried Rice mit Spiegelei", isPrimary: true }],
    ingredients: [
      { name: "Gekochter Reis", amount: "400g", optional: false },
      { name: "Kimchi", amount: "200g", optional: false },
      { name: "Frühlingszwiebeln", amount: "3 Stück", optional: false },
      { name: "Sesamöl", amount: "2 EL", optional: false },
      { name: "Sojasauce", amount: "1 EL", optional: false },
      { name: "Gochujang", amount: "1 EL", optional: false },
      { name: "Sesam", amount: "1 EL", optional: false },
      { name: "Eier", amount: "4 Stück", optional: true },
      { name: "Nori", amount: "1 Blatt", optional: true }
    ],
    instructions: [
      { step: 1, description: "Kimchi grob hacken", duration: 3 },
      { step: 2, description: "Sesamöl in der Pfanne erhitzen", duration: 2 },
      { step: 3, description: "Kimchi und Gochujang anbraten", duration: 5 },
      { step: 4, description: "Reis hinzufügen und durchmischen", duration: 5 },
      { step: 5, description: "Mit Sojasauce würzen", duration: 2 },
      { step: 6, description: "Spiegelei braten und servieren", duration: 8 }
    ],
    nutrition: { calories: 420, protein: 14, carbohydrates: 58, fat: 14, fiber: 4, sugar: 6, sodium: 950, servingSize: "1 Portion" },
    tags: ["dinner", "asian", "korean", "rice", "quick"],
    dietaryInfo: { isVegan: false, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "medium" },
    time: { prep: 5, cook: 20 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Banh Mi Sandwich",
    description: "Vietnamesisches Baguette-Sandwich mit mariniertem Tofu und eingelegtem Gemüse",
    images: [{ url: "https://images.unsplash.com/photo-1600454309261-3dc9b7594592?w=800", alt: "Vietnamesisches Banh Mi Sandwich", isPrimary: true }],
    ingredients: [
      { name: "Baguette", amount: "4 kleine", optional: false },
      { name: "Tofu", amount: "300g", optional: false },
      { name: "Karotten", amount: "2 Stück", optional: false },
      { name: "Daikon-Rettich", amount: "150g", optional: false },
      { name: "Gurke", amount: "1 Stück", optional: false },
      { name: "Koriander", amount: "1 Bund", optional: false },
      { name: "Mayonnaise", amount: "4 EL", optional: false },
      { name: "Sojasauce", amount: "3 EL", optional: false },
      { name: "Reisessig", amount: "3 EL", optional: false },
      { name: "Zucker", amount: "1 EL", optional: false },
      { name: "Sriracha", amount: "1 EL", optional: true }
    ],
    instructions: [
      { step: 1, description: "Karotten und Rettich in Streifen schneiden und mit Essig und Zucker einlegen", duration: 15 },
      { step: 2, description: "Tofu in Scheiben schneiden und mit Sojasauce marinieren", duration: 10 },
      { step: 3, description: "Tofu goldbraun anbraten", duration: 10 },
      { step: 4, description: "Baguette aufschneiden und toasten", duration: 5 },
      { step: 5, description: "Mit Mayo, Tofu, eingelegtem Gemüse und Koriander belegen", duration: 10 }
    ],
    nutrition: { calories: 380, protein: 15, carbohydrates: 52, fat: 12, fiber: 6, sugar: 8, sodium: 720, servingSize: "1 Portion" },
    tags: ["lunch", "asian", "vietnamese", "sandwich", "street-food"],
    dietaryInfo: { isVegan: false, isGlutenFree: false, isDairyFree: false, isNutFree: true, spiceLevel: "medium" },
    time: { prep: 25, cook: 15 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Congee",
    description: "Chinesischer Reisbrei mit Ingwer, Frühlingszwiebeln und eingelegtem Gemüse",
    images: [{ url: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=800", alt: "Chinesischer Congee Reisbrei", isPrimary: true }],
    ingredients: [
      { name: "Reis", amount: "150g", optional: false },
      { name: "Gemüsebrühe", amount: "2L", optional: false },
      { name: "Ingwer", amount: "5cm", optional: false },
      { name: "Frühlingszwiebeln", amount: "4 Stück", optional: false },
      { name: "Sojasauce", amount: "2 EL", optional: false },
      { name: "Sesamöl", amount: "1 EL", optional: false },
      { name: "Eingelegtes Gemüse", amount: "100g", optional: true },
      { name: "Eier", amount: "4 Stück", optional: true }
    ],
    instructions: [
      { step: 1, description: "Reis gründlich waschen", duration: 5 },
      { step: 2, description: "Reis mit Brühe und Ingwer aufkochen", duration: 15 },
      { step: 3, description: "Bei niedriger Hitze 60 Minuten köcheln lassen, dabei umrühren", duration: 65 },
      { step: 4, description: "Eier weich kochen", duration: 10 },
      { step: 5, description: "Congee mit Sojasauce und Sesamöl abschmecken", duration: 5 },
      { step: 6, description: "Mit Frühlingszwiebeln, Ei und eingelegtem Gemüse servieren", duration: 5 }
    ],
    nutrition: { calories: 280, protein: 10, carbohydrates: 48, fat: 6, fiber: 3, sugar: 2, sodium: 580, servingSize: "1 Portion" },
    tags: ["breakfast", "asian", "chinese", "porridge", "comfort-food"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 10, cook: 80 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Tamagoyaki",
    description: "Japanisches gerolltes Omelett mit süßer Sojasauce",
    images: [{ url: "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=800", alt: "Japanisches Tamagoyaki Omelett", isPrimary: true }],
    ingredients: [
      { name: "Eier", amount: "6 Stück", optional: false },
      { name: "Mirin", amount: "2 EL", optional: false },
      { name: "Sojasauce", amount: "1 EL", optional: false },
      { name: "Zucker", amount: "1 TL", optional: false },
      { name: "Dashi", amount: "2 EL", optional: false },
      { name: "Öl", amount: "1 EL", optional: false },
      { name: "Frühlingszwiebeln", amount: "2 Stück", optional: true }
    ],
    instructions: [
      { step: 1, description: "Eier mit Mirin, Sojasauce, Zucker und Dashi verquirlen", duration: 5 },
      { step: 2, "description": "Tamagoyaki-Pfanne mit Öl einfetten erhitzen", duration: 3 },
      { step: 3, description: "Dünne Eischicht gießen und anrollen", duration: 5 },
      { step: 4, description: "Prozess wiederholen bis alle Eier aufgebraucht", duration: 15 },
      { step: 5, description: "Rolle formen und 5 Minuten ruhen lassen", duration: 7 },
      { step: 6, description: "In Scheiben schneiden und servieren", duration: 5 }
    ],
    nutrition: { calories: 180, protein: 14, carbohydrates: 6, fat: 11, fiber: 0, sugar: 4, sodium: 420, servingSize: "1 Portion" },
    tags: ["breakfast", "asian", "japanese", "eggs", "quick"],
    dietaryInfo: { isVegan: false, isGlutenFree: false, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 10, cook: 20 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Edamame",
    description: "Gedämpfte junge Sojabohnen mit Meersalz",
    images: [{ url: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800", alt: "Edamame Sojabohnen", isPrimary: true }],
    ingredients: [
      { name: "Edamame (im Schoten)", amount: "400g", optional: false },
      { name: "Meersalz", amount: "1 EL", optional: false },
      { name: "Wasser", amount: "2L", optional: false }
    ],
    instructions: [
      { step: 1, description: "Wasser mit Salz aufkochen", duration: 8 },
      { step: 2, description: "Edamame hinzugeben und 5 Minuten kochen", duration: 7 },
      { step: 3, description: "Abgießen und mit Salz bestreuen", duration: 2 },
      { step: 4, description: "Warm oder kalt servieren", duration: 3 }
    ],
    nutrition: { calories: 190, protein: 17, carbohydrates: 14, fat: 8, fiber: 8, sugar: 4, sodium: 380, servingSize: "1 Portion" },
    tags: ["snack", "asian", "japanese", "healthy", "quick"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 2, cook: 10 },
    difficulty: "easy",
    servings: 4
  },
  {
    title: "Mochi",
    description: "Japanische klebrige Reiskuchen mit süßer Bohnenpaste",
    images: [{ url: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800", alt: "Japanische Mochi Reiskuchen", isPrimary: true }],
    ingredients: [
      { name: "Klebreismehl (Mochiko)", amount: "200g", optional: false },
      { name: "Wasser", amount: "200ml", optional: false },
      { name: "Zucker", amount: "100g", optional: false },
      { name: "Süße Bohnenpaste (Anko)", amount: "200g", optional: false },
      { name: "Kartoffelstärke", amount: "50g", optional: false }
    ],
    instructions: [
      { step: 1, description: "Mehl, Wasser und Zucker vermischen", duration: 5 },
      { step: 2, description: "Mischung in der Mikrowelle 2 Minuten erhitzen", duration: 3 },
      { step: 3, description: "Umrühren und weitere 2 Minuten erhitzen", duration: 3 },
      { step: 4, description: "Teig auf mit Stärke bestäubter Fläche kneten", duration: 10 },
      { step: 5, description: "Teig in 12 Portionen teilen", duration: 5 },
      { step: 6, description: "Jede Portion mit Bohnenpaste füllen und formen", duration: 20 },
      { step: 7, description: "Mit Stärke bestäuben und servieren", duration: 4 }
    ],
    nutrition: { calories: 220, protein: 4, carbohydrates: 48, fat: 1, fiber: 3, sugar: 24, sodium: 15, servingSize: "2 Stück" },
    tags: ["dessert", "asian", "japanese", "sweet", "traditional"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "mild" },
    time: { prep: 20, cook: 10 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Sommerrollen",
    description: "Frische vietnamesische Reispapierrollen mit Gemüse und Erdnussdip",
    images: [{ url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800", alt: "Frische vietnamesische Sommerrollen", isPrimary: true }],
    ingredients: [
      { name: "Reispapier", amount: "12 Blätter", optional: false },
      { name: "Reisnudeln", amount: "150g", optional: false },
      { name: "Gurke", amount: "1 Stück", optional: false },
      { name: "Karotte", amount: "1 Stück", optional: false },
      { name: "Minze", amount: "1 Bund", optional: false },
      { name: "Koriander", amount: "1 Bund", optional: false },
      { name: "Erdnussbutter", amount: "4 EL", optional: false },
      { name: "Hoisin-Sauce", amount: "2 EL", optional: false },
      { name: "Limette", amount: "1 Stück", optional: false },
      { name: "Chili", amount: "1 Stück", optional: true }
    ],
    instructions: [
      { step: 1, description: "Nudeln nach Packungsanweisung kochen und abkühlen", duration: 10 },
      { step: 2, description: "Gemüse in dünne Streifen schneiden", duration: 10 },
      { step: 3, description: "Reispapier kurz in warmem Wasser einweichen", duration: 5 },
      { step: 4, description: "Mit Nudeln, Gemüse und Kräutern belegen und rollen", duration: 20 },
      { step: 5, description: "Erdnussdip aus Erdnussbutter, Hoisin und Limette mischen", duration: 5 }
    ],
    nutrition: { calories: 240, protein: 8, carbohydrates: 38, fat: 8, fiber: 5, sugar: 6, sodium: 320, servingSize: "3 Rollen" },
    tags: ["snack", "asian", "vietnamese", "fresh", "healthy"],
    dietaryInfo: { isVegan: true, isGlutenFree: true, isDairyFree: true, isNutFree: false, spiceLevel: "mild" },
    time: { prep: 30, cook: 10 },
    difficulty: "medium",
    servings: 4
  },
  {
    title: "Thai Green Curry",
    description: "Aromatisches thailändisches Curry mit Kokosmilch, Gemüse und Thai-Basilikum",
    images: [{ url: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800", alt: "Thai Green Curry mit Gemüse", isPrimary: true }],
    ingredients: [
      { name: "Grüne Currypaste", amount: "3 EL", optional: false },
      { name: "Kokosmilch", amount: "800ml", optional: false },
      { name: "Thai-Auberginen", amount: "200g", optional: false },
      { name: "Bambussprossen", amount: "150g", optional: false },
      { name: "Paprika", amount: "2 Stück", optional: false },
      { name: "Thai-Basilikum", amount: "1 Bund", optional: false },
      { name: "Kaffir-Limettenblätter", amount: "4 Blätter", optional: false },
      { name: "Palmzucker", amount: "1 EL", optional: false },
      { name: "Fischsauce", amount: "2 EL", optional: false },
      { name: "Jasminreis", amount: "300g", optional: false }
    ],
    instructions: [
      { step: 1, description: "Reis nach Packungsanweisung kochen", duration: 20 },
      { step: 2, description: "Currypaste in einem Esslöffel Kokosmilch anbraten", duration: 5 },
      { step: 3, description: "Restliche Kokosmilch hinzugeben und aufkochen", duration: 10 },
      { step: 4, description: "Auberginen und Bambussprossen hinzufügen", duration: 5 },
      { step: 5, description: "15 Minuten köcheln lassen", duration: 17 },
      { step: 6, description: "Paprika, Zucker, Fischsauce und Limettenblätter hinzufügen", duration: 5 },
      { step: 7, description: "Weitere 5 Minuten köcheln und mit Basilikum garnieren", duration: 8 }
    ],
    nutrition: { calories: 480, protein: 12, carbohydrates: 58, fat: 22, fiber: 7, sugar: 10, sodium: 890, servingSize: "1 Portion" },
    tags: ["dinner", "asian", "thai", "curry", "spicy"],
    dietaryInfo: { isVegan: false, isGlutenFree: true, isDairyFree: true, isNutFree: true, spiceLevel: "hot" },
    time: { prep: 20, cook: 50 },
    difficulty: "medium",
    servings: 4
  }
];

module.exports = recipes;
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
