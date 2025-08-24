export type Unit = "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "fl_oz";

export type UserDoc = {
  userId: string;
  name: string;
  email: string;
  role: "user" | "editor" | "admin";
  createdAt: Date;
  updatedAt?: Date;
};

export type ProfileDisplayDoc = {
  userId: string;
  displayName: string;
  avatarURL?: string | null;
  bio?: string;
  joinedAt: Date;
  updatedAt?: Date;
};

export type RecipeDoc = {
  recipeId: string;
  description: string | null;
  authorId: string;
  public: boolean;
  ingredients: RecipeIngredients[];
  steps: string[];
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
};

export type RecipeIngredients = {
  ingredientId: string;
  name: string;
  amount: number;
  unit: Unit;
  notes: string | null;
};

export type IngredientDoc = {
  ingredientId: string;
  name: string;
  gPerMl: number;
  defaultUnit: Unit;
  createdAt: Date;
  updatedAt?: Date;
};
export type WriteIngredientDoc = {
  ingredientId: string;
  name: string;
  gPerMl: number;
  defaultUnit: Unit;
};

export type CommentDoc = {
  commentId: string;
  authorId: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type LikeDoc = {
  authorId: string;
  liked: boolean;
  updatedAt?: Date | null;
};
