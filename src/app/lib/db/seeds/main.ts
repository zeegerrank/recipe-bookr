import { seedDoc } from "./helper";
import {
  initUser,
  initProfileDisplay,
  initIngredient1,
  initIngredient2,
  initRecipe,
  initComment,
  initLike,
} from "./data";

// Main function

async function main() {
  // User - users/{userId}
  await seedDoc(`users/${initUser.userId}`, initUser);
  // Profile DIsplay - profileDisplay/{userId}
  await seedDoc(
    `profileDisplay/${initProfileDisplay.userId}`,
    initProfileDisplay
  );
  // Ingredient - ingredients/{ingredientId}
  await seedDoc(`ingredients/${initIngredient1.ingredientId}`, initIngredient1);
  await seedDoc(`ingredients/${initIngredient2.ingredientId}`, initIngredient2);
  // Recipe - recipes/{recipeId}
  await seedDoc(`recipes/${initRecipe.recipeId}`, initRecipe);

  // Comment - subcollection: recipes/{recipeId}/comments/{authorId}
  await seedDoc(
    `recipes/${initRecipe.recipeId}/comments/${initComment.commentId}`,
    initComment
  );
  // Like - subcollection: recipes/{recipeId}/likes/{authorId}
  await seedDoc(
    `recipes/${initRecipe.recipeId}/likes/${initLike.authorId}`,
    initLike
  );
}

main().catch(console.error);
