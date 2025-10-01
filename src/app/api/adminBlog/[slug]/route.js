import { deleteBlogBySlug } from "../../../../lib/blogQueries";



export async function DELETE(req, { params }) {
  try {
    const { slug } = params; 
    const deleted = await deleteBlogBySlug(slug);
    return new Response(JSON.stringify({ message: "Blog deleted", deleted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
