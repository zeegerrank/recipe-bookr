import { db } from "../firebase/client";
import { getDoc, setDoc, doc } from "firebase/firestore";

// Type

type UserSeed = {
  userId: string;
  name: string;
  email: string;
  role: "user" | "editor" | "admin";
  createdAt: Date;
};

type ProfileDisplaySeed = {
  userId: string;
  displayName: string;
  avatarURL?: string | null;
  bio?: string;
  joinedAt: Date;
};

type RecipeSeed = {
  recipeId: string;
  description: string | null;
  authorId: string;
  public: boolean;
  ingredients: RecipeIngredients[];
  steps: string[];
  tags: string[];
  createdAt: Date;
};

type RecipeIngredients = {
  ingredientId: string;
  name: string;
  amount: number;
  unit: "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "fl_oz";
  notes: string | null;
};

type IngredientSeed = {
  ingredientId: string;
  name: string;
  gPerMl: number;
  defaultUnit: "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "fl_oz";
  createdAt: Date;
};

type CommentSeed = {
  commentId: string;
  authorId: string;
  text: string;
  createdAt: Date;
};

type Like = {
  authorId: string;
  liked: boolean;
  updatedAt?: Date | null;
};

// Seed data

const now = new Date();

const initUser: UserSeed = {
  userId: "initUser",
  name: "initUser",
  email: "init@user.com",
  role: "user",
  createdAt: now,
};

const initProfileDisplay: ProfileDisplaySeed = {
  userId: initUser.userId,
  displayName: "initDisplayName",
  avatarURL: null,
  bio: "",
  joinedAt: now,
};

const initIngredient1: IngredientSeed = {
  ingredientId: "flour",
  name: "flour",
  gPerMl: 0.6,
  defaultUnit: "g",
  createdAt: now,
};

const initIngredient2: IngredientSeed = {
  ingredientId: "water",
  name: "water",
  gPerMl: 1,
  defaultUnit: "ml",
  createdAt: now,
};

const initRecipe: RecipeSeed = {
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

const initComment: CommentSeed = {
  commentId: "initCommentId",
  authorId: initUser.userId,
  text: "init message",
  createdAt: now,
};

const initLike: Like = {
  authorId: initUser.userId,
  liked: false,
  updatedAt: now,
};

//    Helper
function ifErrorThrow(error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(String(error));
  }
}

async function seedDoc(path: string, data: object) {
  try {
    const ref = doc(db, path);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      await setDoc(ref, data);
      console.log(`✅ created: ${path}`);
    } else {
      console.log(`⏭️ skipped (already exist): ${path}`);
    }
  } catch (error) {
    ifErrorThrow(error);
  }
}

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
