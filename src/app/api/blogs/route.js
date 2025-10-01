import prisma from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      imageUrl: true,
      createdAt: true,
    },
  });

  const total = await prisma.blog.count();

  return new Response(JSON.stringify({
    data: blogs,
    meta: { page, pageSize, totalPages: Math.ceil(total / pageSize), total },
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
