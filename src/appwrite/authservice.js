import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
        //understand this keyword
    }
    //signup functionality(login form)
    async createAccount(email, password, name) {
        try {
            return await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
        } catch (error) {
            throw error;
        }
    }
    //login functionality
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            throw error;
        }
    }
    //ke agar apa home te chlege starting vich ee te check krna ke apa login hege ke nahi 
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code !== 401) {
                console.log("Appwrite getCurrentUser error:", error);
            }
            return null;
        }
    }
    //logout functionality
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error" ,error);
        }
    }

}

const authService = new AuthService();

export default authService;
