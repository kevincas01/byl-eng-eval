
import { getUserResults } from "@/lib/data/users";
import {  isUserId, UserId } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/users/[userId]">
) {
  const { userId } = await ctx.params;

  if (!userId || !isUserId(userId)) {
    return NextResponse.json(
      { error: "Missing or invalid userId" },
      { status: 400 }
    );
  }

  const results = getUserResults(userId as UserId);

  if (!results) {
    return NextResponse.json(
      { error: "User not found", userId },
      { status: 404 }
    );
  }
  return NextResponse.json({ results }, { status: 200 });
}
