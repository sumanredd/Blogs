
import prisma from "@/lib/db";

export async function POST(req) {
  try {
    const { title, slug, description, content, tags, imageUrl } = await req.json();

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        description,
        content,
        tags,
        imageUrl: imageUrl || null,
      },
    });

    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create blog" }), { status: 500 });
  }
}


