/* import { Client, Account } from "appwrite";
import { v4 as uuidv4 } from "uuid";

class AppwriteUserManager {
  constructor() {
    // Initialize Appwrite SDK
    this.client = new Client();
    this.client
      .setEndpoint("YOUR_APPWRITE_ENDPOINT") // Replace with your Appwrite endpoint
      .setProject("YOUR_APPWRITE_PROJECT_ID") // Replace with your Appwrite project ID
      .setKey("YOUR_APPWRITE_API_KEY"); // Replace with your Appwrite API key

    // Initialize Appwrite user service
    this.userService = new Account(this.client);
  }

  generateUserId() {
    return uuidv4(); // Generate a unique UUID
  }

  async createAccount(email, password, name) {
    try {
      const userId = this.generateUserId();
      const result = await this.userService.create(
        email,
        password,
        name,
        userId
      );
      console.log("Account created successfully:", result);
      return result;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const result = await this.client.account.createSession(email, password);
      console.log("Login successful:", result);
      return result;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async logout(sessionId) {
    try {
      const result = await this.client.account.deleteSession(sessionId);
      console.log("Logout successful:", result);
      return result;
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }

  async deleteAccount(userId) {
    try {
      const result = await this.userService.delete(userId);
      console.log("Account deleted successfully:", result);
      return result;
    } catch (error) {
      console.error("Error deleting account:", error);
      throw error;
    }
  }
}

// Example usage:
const userManager = new AppwriteUserManager();

// Create account
userManager.createAccount("user@example.com", "password123", "User Name");

// Login (create session)
const loginResult = await userManager.login("user@example.com", "password123");

// Perform actions with the user session (e.g., access user data)

// Logout (delete session)
userManager.logout(loginResult.sessionId);

// Delete account (provide the user ID)
userManager.deleteAccount("USER_ID");
 */