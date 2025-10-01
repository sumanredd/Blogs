"use client";

import { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import NavBar from "../../components/Navbar/page";
import "./adminPage.css";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [blogs, setBlogs] = useState([]);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs?page=1&pageSize=100");
      const data = await res.json();
      setBlogs(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Create blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          description,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to create blog");

      setMessage("Blog created successfully!");
      setVariant("success");

      // Reset form
      setTitle("");
      setSlug("");
      setDescription("");
      setContent("");
      setTags("");
      setImageUrl("");

      fetchBlogs();
    } catch (err) {
      console.error(err);
      setMessage("Error creating blog");
      setVariant("danger");
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
       const res = await fetch(`/api/adminBlog/${slug}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete blog");

      setMessage("Blog deleted successfully!");
      setVariant("success");

      fetchBlogs();
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Error deleting blog");
      setVariant("danger");
    }
  };

  return (
    <>
      <NavBar />
      <Container className="adminContainer my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
          
            <Card className="adminCard mb-5">
              <Card.Title className="adminTitle mb-4 text-center">Admin - Create Blog</Card.Title>
              {message && <Alert variant={variant}>{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="adminLabel">Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    required
                    className="adminInput"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="adminLabel">Slug</Form.Label>
                  <Form.Control
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="unique-slug"
                    required
                    className="adminInput"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="adminLabel">Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description"
                    required
                    className="adminInput"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="adminLabel">Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content..."
                    required
                    className="adminInput"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="adminLabel">Tags (comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="technology, lifestyle, travel"
                    className="adminInput"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="adminLabel">Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="adminInput"
                  />
                </Form.Group>

                {imageUrl && (
                  <div className="text-center mb-3">
                    <img src={imageUrl} alt="Preview" className="adminImg" />
                  </div>
                )}

                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg">
                    Create Blog
                  </Button>
                </div>
              </Form>
            </Card>

           
            <Card className="adminCard">
              <Card.Title className="adminTitle mb-4 text-center">All Blogs</Card.Title>
              {blogs.length === 0 ? (
                <p>No blogs yet.</p>
              ) : (
                blogs.map((blog) => (
                  <Card key={blog.id} className="w-100 mb-3 p-2">
                    <Row className="align-items-center">
                      <Col>
                        <h5>{blog.title}</h5>
                        <p className="mb-0 text-white">{blog.slug}</p>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant="danger"
                          style={{border:"none"}}
                          onClick={() => handleDelete(blog.slug)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
