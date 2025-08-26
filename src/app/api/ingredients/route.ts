import { NextRequest, NextResponse } from "next/server";
import { ingredientCreateValidator } from "@/app/lib/db/validator/ingredients";
import {
  listIngredients,
  createIngredient,
} from "@/app/lib/db/services/ingredients";
import { IngredientDoc } from "@/app/lib/db/services/types";

// GET /api/ingredients?limit=20&orderByField=name
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit =
      limitParam !== null
        ? Math.max(1, Math.min(100, Number(limitParam)))
        : undefined;

    const orderByField = searchParams.get(
      "orderByField"
    ) as keyof IngredientDoc;
    const items = listIngredients({ orderByField, qLimit: limit });

    return NextResponse.json(items, { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/ingredients
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ingredientCreateValidator.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid payload",
          issue: validated.error.issues,
        },
        { status: 400 }
      );
    }
    const { id, name, gPerMl, defaultUnit } = validated.data;
    const result = await createIngredient(id, { name, gPerMl, defaultUnit });

    if (!result.created) {
      return NextResponse.json(
        {
          error: "Ingredient is already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({ id: result.id, status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
