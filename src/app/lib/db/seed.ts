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

// Doc constructor

const now = new Date();
async function seedDoc<T extends { [key: string]: unknown }>(
  collection: string,
  id: string,
  data: T
) {
  try {
    const ref = doc(db, collection, id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      await setDoc(ref, data);
      console.log(`✅ created: ${collection}/${id}`);
    } else {
      console.log(`⏭️ skipped (already exist): ${collection}/${id}`);
    }
  } catch (error) {
    ifErrorThrow(error);
  }
}

// User - users/{userId}
type UserSeed = {
  userId: string;
  name: string;
  email: string;
  role: "user" | "editor" | "admin";
  createdAt: Date;
};

const initUser: UserSeed = {
  userId: "initUser",
  name: "initUser",
  email: "init@user.com",
  role: "user",
  createdAt: now,
};

seedDoc<UserSeed>("users", initUser.userId, initUser);

// Profile DIsplay - profileDisplay/{userId}
type ProfileDisplaySeed = {
  userId: string;
  displayName: string;
  avatarURL?: string | null;
  bio?: string;
  joinedAt: Date;
};

const initProfileDisplay: ProfileDisplaySeed = {
  userId: "initUser",
  displayName: "initDisplayName",
  avatarURL: null,
  bio: "",
  joinedAt: now,
};

seedDoc<ProfileDisplaySeed>(
  "profileDisplay",
  initProfileDisplay.userId,
  initProfileDisplay
);

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

seedDoc<IngredientSeed>(
  "ingredients",
  initIngredient1.ingredientId,
  initIngredient1
);

seedDoc<IngredientSeed>(
  "ingredients",
  initIngredient2.ingredientId,
  initIngredient2
);

// Recipe - recipes/{recipeId}
type RecipeSeed = {
  recipeId: string;
  description: string | null;
  authorId: string;
  public: boolean;
  ingredients: RecipeIngretients[];
  steps: string[];
  tags: string[];
  createdAt: Date;
};

// recipe.ingredients[] (embedded_array)
type RecipeIngretients = {
  ingredientId: string;
  name: string;
  amount: number;
  unit: "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "fl_oz" | "oz";
  notes: string | null;
};

const initRecipe: RecipeSeed = {
  recipeId: "initRecipe",
  description: "basic pancake",
  authorId: "initUser",
  public: false,
  ingredients: [
    {
      ingredientId: "flour",
      name: "flour",
      amount: 100,
      unit: "g",
      notes: "all-purpose flour",
    },
    {
      ingredientId: "water",
      name: "water",
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

seedDoc<RecipeSeed>("recipes", initRecipe.recipeId, initRecipe);
