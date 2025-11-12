import { storage } from "../server/storage";

async function createAdmin() {
  try {
    console.log("Creating admin user...");
    
    // Check if admin already exists
    const existing = await storage.getAdminByUsername("admin");
    
    if (existing) {
      console.log("Admin user already exists!");
      return;
    }

    // Create admin user
    await storage.createAdmin({
      username: "admin",
      password: "admin123", // Change this in production!
    });

    console.log("✓ Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("\n⚠️  IMPORTANT: Change the default password in production!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
