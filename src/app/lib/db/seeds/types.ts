export type Unit = "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "fl_oz";

export type UserSeed = {
  userId: string;
  name: string;
  email: string;
  role: "user" | "editor" | "admin";
  createdAt: Date;
};

export type ProfileDisplaySeed = {
  userId: string;
  displayName: string;
  avatarURL?: string | null;
  bio?: string;
  joinedAt: Date;
};

export type RecipeSeed = {
  recipeId: string;
  description: string | null;
  authorId: string;
  public: boolean;
  ingredients: RecipeIngredients[];
  steps: string[];
  tags: string[];
  createdAt: Date;
};

export type RecipeIngredients = {
  ingredientId: string;
  name: string;
  amount: number;
  unit: Unit;
  notes: string | null;
};

export type IngredientSeed = {
  ingredientId: string;
  name: string;
  gPerMl: number;
  defaultUnit: Unit;
  createdAt: Date;
};

export type CommentSeed = {
  commentId: string;
  authorId: string;
  text: string;
  createdAt: Date;
};

export type LikeSeed = {
  authorId: string;
  liked: boolean;
  updatedAt?: Date | null;
};
