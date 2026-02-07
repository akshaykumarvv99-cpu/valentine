import { NextRequest, NextResponse } from "next/server";
import { getPostById } from "@/app/data/blog-posts";

/**
 * GET /api/blog/[id] — returns a single blog post by id.
 * Use this to fetch one post for the blog detail page.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const post = getPostById(numId);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
