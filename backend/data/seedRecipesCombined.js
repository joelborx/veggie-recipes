// Combined seed file with all 52 vegetarian recipes
// Generated from: Italian, Asian, Mexican, Mediterranean, Indian

const italianRecipes = require('./seedRecipes');
const mexicanRecipes = require('./seedRecipesMexican');
const mediterraneanRecipes = require('./seedRecipesMediterranean');
const indianRecipes = require('./seedRecipesIndian');

// Combine all recipes
const allRecipes = [
  ...italianRecipes,
  ...mexicanRecipes,
  ...mediterraneanRecipes,
  ...indianRecipes
];

console.log(`Loaded ${allRecipes.length} recipes:`);
console.log(`- Italian: ${italianRecipes.length}`);
console.log(`- Mexican: ${mexicanRecipes.length}`);
console.log(`- Mediterranean: ${mediterraneanRecipes.length}`);
console.log(`- Indian: ${indianRecipes.length}`);

module.exports = allRecipes;
