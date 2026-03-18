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
