import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Import models
import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import BlogLike from "../models/bloglike.model.js";

// Setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

// Helper function to convert MongoDB JSON format to regular objects
const convertMongoData = (data) => {
  return JSON.parse(JSON.stringify(data), (key, value) => {
    if (value && typeof value === "object" && value.$oid) {
      return value.$oid;
    }
    if (value && typeof value === "object" && value.$date) {
      return new Date(value.$date);
    }
    return value;
  });
};

const importData = async () => {
  try {
    console.log("🚀 Starting data import...");
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_CONN);
    console.log("✅ Connected to MongoDB");

    // Read JSON files
    const dataPath = path.join(__dirname, "../data");
    
    const usersData = JSON.parse(
      fs.readFileSync(path.join(dataPath, "yt-mern-blog.users.json"), "utf-8")
    );
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(dataPath, "yt-mern-blog.categories.json"), "utf-8")
    );
    const blogsData = JSON.parse(
      fs.readFileSync(path.join(dataPath, "yt-mern-blog.blogs.json"), "utf-8")
    );
    const commentsData = JSON.parse(
      fs.readFileSync(path.join(dataPath, "yt-mern-blog.comments.json"), "utf-8")
    );
    const blogLikesData = JSON.parse(
      fs.readFileSync(path.join(dataPath, "yt-mern-blog.bloglikes.json"), "utf-8")
    );

    console.log(`📊 Data loaded:`);
    console.log(`  - Users: ${usersData.length}`);
    console.log(`  - Categories: ${categoriesData.length}`);
    console.log(`  - Blogs: ${blogsData.length}`);
    console.log(`  - Comments: ${commentsData.length}`);
    console.log(`  - Blog Likes: ${blogLikesData.length}`);

    // Clear existing data
    console.log("🗑️ Clearing existing data...");
    await User.deleteMany({});
    await Category.deleteMany({});
    await Blog.deleteMany({});
    await Comment.deleteMany({});
    await BlogLike.deleteMany({});

    // Convert and import data
    console.log("📥 Importing users...");
    const convertedUsers = convertMongoData(usersData);
    await User.insertMany(convertedUsers, { ordered: false });
    console.log(`✅ Imported ${convertedUsers.length} users`);

    console.log("📥 Importing categories...");
    const convertedCategories = convertMongoData(categoriesData);
    await Category.insertMany(convertedCategories, { ordered: false });
    console.log(`✅ Imported ${convertedCategories.length} categories`);

    console.log("📥 Importing blogs...");
    const convertedBlogs = convertMongoData(blogsData);
    await Blog.insertMany(convertedBlogs, { ordered: false });
    console.log(`✅ Imported ${convertedBlogs.length} blogs`);

    console.log("📥 Importing comments...");
    const convertedComments = convertMongoData(commentsData);
    await Comment.insertMany(convertedComments, { ordered: false });
    console.log(`✅ Imported ${convertedComments.length} comments`);

    console.log("📥 Importing blog likes...");
    const convertedBlogLikes = convertMongoData(blogLikesData);
    await BlogLike.insertMany(convertedBlogLikes, { ordered: false });
    console.log(`✅ Imported ${convertedBlogLikes.length} blog likes`);

    console.log("🎉 Data import completed successfully!");

    // Verify the import
    console.log("\n🔍 Verifying import:");
    const userCount = await User.countDocuments();
    const categoryCount = await Category.countDocuments();
    const blogCount = await Blog.countDocuments();
    const commentCount = await Comment.countDocuments();
    const blogLikeCount = await BlogLike.countDocuments();

    console.log(`  - Users in DB: ${userCount}`);
    console.log(`  - Categories in DB: ${categoryCount}`);
    console.log(`  - Blogs in DB: ${blogCount}`);
    console.log(`  - Comments in DB: ${commentCount}`);
    console.log(`  - Blog Likes in DB: ${blogLikeCount}`);

  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  } finally {
    mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
};

// Run the import
importData();
