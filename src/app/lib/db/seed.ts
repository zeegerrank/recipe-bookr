import { db } from "../firebase/client";
import { getDoc, setDoc, doc } from "firebase/firestore";

//    Helper
function ifErrorThrow(error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(String(error));
  }
}

async function setIfNotExist(path: string, data: object) {
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

// Define type for seed docs

// User - users/{userId}
type UserSeed = {
  userId: string;
  displayName: string;
  email: string;
  role: "user" | "editor" | "admin";
  createdAt: Date;
};

// Profile DIsplay - profileDisplay/{userId}
type ProfileDisplaySeed = {
  userId: string;
  name: string;
  avatarURL?: string | null;
  bio?: string;
  joinedAt: Date;
};

// Ingredient - ingredients/{ingredientId}
type IngredientSeed = {
  ingredientId: string;
  name: string;
  gPerMl: number;
  defaultUnit:
    | "g"
    | "kg"
    | "ml"
    | "l"
    | "tsp"
    | "tbsp"
    | "cup"
    | "fl_oz"
    | "oz";
  createdAt: Date;
};

// Recipe - recipes/{recipeId}
type RecipeSeed = {
  recipeId: string;
  description: string | null;
  authorId: string;
  public: boolean;
  ingredients: RecipeIngretients[];
  steps: string[];
  tages: string[];
  createdAt: Date;
};

// recipe.ingredients[] (embedded_array)
type RecipeIngretients = {
  ingredientId: string;
  name: string;
  amount: number;
  unit: "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "fl_oz" | "oz";
  notes: string;
};

// Comment - subcollection: recipes/{recipeId}/comments/{authorId}
type CommentSeed = {
  recipeId: string;
  authorId: string;
  text: string;
  createdAt: Date;
};

// Like - subcollection: recipes/{recipeId}/likes/{authorId}

type Like = {
  recipeId: string;
  authorId: string;
  liked: boolean;
  updatedAt?: Date | null;
};
