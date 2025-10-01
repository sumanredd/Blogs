# My Blog App

## Project Overview
This is a full-stack **Next.js 13** blog application featuring server-side rendering (SSR), API routes, and an admin interface to create, manage, and delete blog posts. The app supports pagination, search, and image uploads. Blogs are stored in a **Prisma-managed database** (PostgreSQL or MongoDB).

**Key Features:**
- Homepage listing all blogs with title, description, publish date, and images.
- Individual blog pages accessible via dynamic routes.
- Search blogs by title.
- Pagination for blog listings.
- Admin page to create, edit, and delete blogs.
- Rich text support (Markdown editor optional).
- Image support for each blog post.

---

## Github URL
https://github.com/sumanredd/Blogs

---

## Tech Stack
- **Next.js 13 (App Router)**
- **React**
- **Prisma ORM**
- **PostgreSQL / MongoDB**
- **Bootstrap 5**
- **Optional:** Material-UI for pagination or components

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/my-blog.git
cd my-blog
## Install dependencies
```bash

npm install

or

bash
yarn install
```
## Set up environment variables
```bash
Create a .env file at the root of the project with the following variables:

env

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blogdb"
Password is **postgres**
Ensure that the DATABASE_URL points to a live PostgreSQL or MongoDB instance.
```

## Migrate the database
```bash
npx prisma migrate dev

This will create the necessary tables for blogs.
```
## Run the development server
```bash
npm run dev
Open http://localhost:3000 in your browser.
```

## API Routes
**GET /api/blogs** → Returns paginated list of blogs.

**GET /api/blogs/[slug]** → Returns a single blog post by slug.

**POST /api/admin/blog** → Create a new blog (admin only).

**DELETE /api/adminBlog/[slug]** → Delete a blog by slug (admin only).

## Dependencies
```bash
next

react

react-dom

prisma

@prisma/client

react-bootstrap

bootstrap
```

## Admin Page
```bash
URL: /admin
```
## Functionality:

**Create new blog posts.**

**Upload images (via URL).**

**Delete blogs from the list.**

## Notes
Ensure that fetch calls from server components use relative paths (/api/blogs) instead of localhost.

Pagination is implemented on both server and client side.

Proper error handling is included in all API routes.


## AI Tool Usage Disclosure
During the development of this project, AI tools were used as follows:

ChatGPT – Assisted with:

Writing API routes and Prisma queries.

Debugging Next.js server/client issues.

Writing pagination logic.