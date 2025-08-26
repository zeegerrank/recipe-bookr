import { NextRequest, NextResponse } from "next/server";
import {
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} from "@/app/lib/db/services/ingredients";
import { ingredientUpdateValidator } from "@/app/lib/db/validator/ingredients";

// GET /api/ingredients/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ status: 400, error: "id required" });
    }

    const item = await getIngredientById(id);
    if (!item) {
      return NextResponse.json({ status: 404, error: "Not found" });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PATCH /api/ingredients/:id
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const body = req.json();
    const validated = ingredientUpdateValidator.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Invalid payload",
          issue: validated.error.issues,
        },
        { status: 400 }
      );
    }
    await updateIngredient(id, validated.data);

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/ingredients/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    await deleteIngredient(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
