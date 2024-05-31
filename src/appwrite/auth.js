import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.client.create(ID.unique(), email, password, name);
            if (userAccount) {
                //another method
                this.login({ email, password });
            } else {
                return userAccount
            }
        } catch (error) {
            console.log(error)
        }
    }

    async login({ email, password }) {
        try {
            return this.account.createEmailSession(email, password);
        } catch (error) {
            console.log(error)
        }
    }

    async getCurrentUser() {
        try {
            return this.account.get();
        } catch (error) {
            console.log(error)
        }

        return null;
    }

    async logout() {
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService()

export default authService