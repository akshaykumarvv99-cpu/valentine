import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/app/data/blog-posts";

/**
 * GET /api/blog — returns all blog posts.
 * Use this to fetch the list for the dashboard and blog index.
 */
export async function GET() {
  return NextResponse.json(BLOG_POSTS);
}
