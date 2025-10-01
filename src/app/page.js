import Link from "next/link";
import NavBar from "../components/Navbar/page";

export const revalidate = 0;

async function fetchBlogs(page = 1, pageSize = 10) {
  const res = await fetch(`http://localhost:3000/api/blogs?page=${page}&pageSize=${pageSize}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export default async function HomePage({ searchParams }) {
  const search = searchParams?.q || "";
  const page = parseInt(searchParams?.page || "1", 10);
  const pageSize = 6; 

  const { data: blogs, meta } = await fetchBlogs(page, pageSize);

  const filteredData = blogs.filter((each) =>
    each.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = meta?.totalPages || 1;

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="page-title">Blogs</h1>

        {filteredData.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px", color: "#555" }}>
            No blogs found for your search.
          </div>
        ) : (
          <>
            <ul className="grid">
              {filteredData.map((blog) => {
                const noImgBlog = blog.imageUrl === null;
                const createdDate = new Date(blog.createdAt);
                const formattedDate = `${createdDate.getDate()}/${
                  createdDate.getMonth() + 1
                }/${createdDate.getFullYear()}`;
                const formattedTime = `${(createdDate.getHours() % 12 || 12)
                  .toString()
                  .padStart(2, "0")}:${createdDate
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")} ${createdDate.getHours() >= 12 ? "PM" : "AM"}`;

                return (
                  <li key={blog.id} className={`card ${noImgBlog ? "noImgCard" : ""}`}>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="card-img" />}
                      <h2 className="card-title">{blog.title}</h2>
                      <p className="card-desc">{blog.description}</p>
                      <p className="published-date">
                        Published: {formattedDate} • {formattedTime}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination-container">
      {page > 1 && (
        <Link
          href={`/?page=${page - 1}${search ? `&q=${search}` : ""}`}
          className="btn btn-outline-primary"
        >
          Previous
        </Link>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={`/?page=${p}${search ? `&q=${search}` : ""}`}
          className={`btn ${p === page ? "btn-primary" : "btn-outline-primary"}`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`/?page=${page + 1}${search ? `&q=${search}` : ""}`}
          className="btn btn-outline-primary"
        >
          Next
        </Link>
      )}
    </div>
          </>
        )}
      </div>
    </>
  );
}
