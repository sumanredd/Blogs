import prisma from "./db";

export async function getAllBlogs() {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      imageUrl: true,
      createdAt: true,
    },
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      tags: true,
      imageUrl: true,
      createdAt: true,
    },
  });
}

export async function deleteBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) throw new Error("Blog not found");

  return prisma.blog.delete({ where: { slug } });
}