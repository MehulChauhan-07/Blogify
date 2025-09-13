import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

const Index = () => {
  const apiUrl = getEnv("VITE_API_BASE_URL");
  const blogUrl = `${apiUrl}/blog/blogs`;

  console.log("Fetching blogs from:", blogUrl);

  const {
    data: blogData,
    loading,
    error,
  } = useFetch(blogUrl, {
    method: "get",
    credentials: "include",
  });

  console.log("Fetching blogs from:", blogUrl);
  console.log("Blog data:", blogData);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) return <Loading />;

  if (error) {
    console.error("Blog fetch error:", error);
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading blogs</h2>
        <p className="text-gray-600">{error.message}</p>
        <p className="text-sm text-gray-500 mt-2">Please check if the server is running on port 3000</p>
      </div>
    );
  }

  // Handle the case where data is fetched but no blogs exist
  const hasBlogs = blogData && blogData.blog && Array.isArray(blogData.blog) && blogData.blog.length > 0;
  const hasData = blogData !== undefined;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {hasBlogs ? (
        blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog} />)
      ) : hasData ? (
        <div className="col-span-full text-center p-8">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h2>
          <p className="text-gray-500">It looks like there are no blog posts yet. Create your first blog post to get started!</p>
        </div>
      ) : (
        <div className="col-span-full text-center p-8">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Loading blogs...</h2>
        </div>
      )}
    </div>
  );
};

export default Index;
