import prisma from "@/lib/db";
import "./Individual.css"; // External CSS

export const revalidate = 0;

export default async function BlogPage({ params }) {
  const { slug } = params;

  
  const blog = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!blog) return <p>Blog not found</p>;

  const createdDate = new Date(blog.createdAt);
  const formattedDate = `${createdDate.getDate().toString().padStart(2, "0")}/${(createdDate.getMonth()+1).toString().padStart(2,"0")}/${createdDate.getFullYear()}`;
  const hours = createdDate.getHours();
  const minutes = createdDate.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12) || 12;
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  return (
    <div className="blog-container">
      <h1 className="blog-title">{blog.title}</h1>
      <p className="published">
        <strong>Published:</strong> {formattedDate} <span className="dot">•</span> {formattedTime}
      </p>
      {blog.imageUrl && (
        <div className="image-wrapper">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="blog-image"
          />
        </div>
      )}
      <p className="blog-description">{blog.description}</p>
      <h4>Content</h4>
      <div className="blog-content">{blog.content}</div>
      {/* <p>{blog.tags}</p> */}
    </div>
  );
}
