
import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query ,Permission,Role} from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create Post
    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            );
        } catch (error) {
            console.error("Appwrite createPost error:", error.message);
            throw error;
        }
    }

    // Update Post
    async updatePost(postID, { title, slug, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postID,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.error("Appwrite updatePost error:", error.message);
            throw error;
        }
    }

    // Delete Post
    async deletePost(postID) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postID
            );
            return true;
        } catch (error) {
            console.error("Appwrite deletePost error:", error.message);
            throw error;
        }
    }

    // Get Single Post
    async getPost(postID) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postID
            );
        } catch (error) {
            console.error("Appwrite getPost error:", error.message);
            throw error;
        }
    }

    // Get All Posts
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite getPosts error:", error.message);
            return false;
        }
    }

    // File Upload
   // File Upload
async uploadFile(file) {
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file,
            [
                Permission.read(Role.any())
            ]
        );
    } catch (error) {
        console.error("Appwrite uploadFile error:", error.message);
        throw error;
    }
}

    // Delete File
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite deleteFile error:", error.message);
            throw error;
        }
    }

    // File Preview
    getFilePreview(fileID) {
        return this.bucket.getFileView(
            config.appwriteBucketId,
            fileID
        );
    }
}

const service = new Service();

export default service;
