import {
  UserSeed,
  ProfileDisplaySeed,
  RecipeSeed,
  IngredientSeed,
  CommentSeed,
  LikeSeed,
} from "./types";

// Seed data

const now = new Date();

export const initUser: UserSeed = {
  userId: "initUser",
  name: "initUser",
  email: "init@user.com",
  role: "user",
  createdAt: now,
};

export const initProfileDisplay: ProfileDisplaySeed = {
  userId: initUser.userId,
  displayName: "initDisplayName",
  avatarURL: null,
  bio: "",
  joinedAt: now,
};

export const initIngredient1: IngredientSeed = {
  ingredientId: "flour",
  name: "flour",
  gPerMl: 0.6,
  defaultUnit: "g",
  createdAt: now,
};

export const initIngredient2: IngredientSeed = {
  ingredientId: "water",
  name: "water",
  gPerMl: 1,
  defaultUnit: "ml",
  createdAt: now,
};

export const initRecipe: RecipeSeed = {
  recipeId: "initRecipe",
  description: "basic pancake",
  authorId: "initUser",
  public: false,
  // recipe.ingredients[] (embedded_array)
  ingredients: [
    {
      ingredientId: initIngredient1.ingredientId,
      name: initIngredient1.name,
      amount: 100,
      unit: "g",
      notes: "all-purpose flour",
    },
    {
      ingredientId: initIngredient2.ingredientId,
      name: initIngredient2.name,
      amount: 200,
      unit: "ml",
      notes: "",
    },
  ],
  steps: [
    "Mix flour with water until smooth.",
    "Cook on a hot pan until golden.",
  ],
  tags: ["breakfast", "simple"],
  createdAt: now,
};

export const initComment: CommentSeed = {
  commentId: "initCommentId",
  authorId: initUser.userId,
  text: "init message",
  createdAt: now,
};

export const initLike: LikeSeed = {
  authorId: initUser.userId,
  liked: false,
  updatedAt: now,
};
