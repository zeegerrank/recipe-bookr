export type Unit = "g" | "kg" | "ml" | "l" | "tsp" | "tbsp" | "cup" | "fl_oz";

export type UserDoc = {
  id: string;
  name: string;
  email: string;
  role: "user" | "editor" | "admin";
  createdAt: Date;
  updatedAt?: Date;
};

export type ProfileDisplayDoc = {
  id: string;
  displayName: string;
  avatarURL?: string | null;
  bio?: string;
  joinedAt: Date;
  updatedAt?: Date;
};

export type RecipeDoc = {
  id: string;
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
  id: string;
  name: string;
  amount: number;
  unit: Unit;
  notes: string | null;
};

export type IngredientDoc = {
  id: string;
  name: string;
  gPerMl: number;
  defaultUnit: Unit;
  createdAt: Date;
  updatedAt?: Date;
};
export type WriteIngredientDoc = {
  id: string;
  name: string;
  gPerMl: number;
  defaultUnit: Unit;
};

export type CommentDoc = {
  id: string;
  authorId: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type LikeDoc = {
  id: string;
  liked: boolean;
  updatedAt?: Date | null;
};
