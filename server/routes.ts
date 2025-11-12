import { createServer } from "http";
import { storage } from "./storage";
import session from "express-session";
import { insertReportSchema } from "../shared/schema";

export async function registerRoutes(app: any) {
  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Middleware to check if user is authenticated admin
  const requireAuth = (req: any, res: any, next: any) => {
    if (req.session.adminId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  // Public API: Submit community report
  app.post("/api/reports", async (req: any, res: any) => {
    try {
      const validatedData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(validatedData);
      res.json({ success: true, report });
    } catch (error: any) {
      console.error("Error creating report:", error);
      res.status(400).json({ message: error.message || "Failed to create report" });
    }
  });

  // Admin API: Login
  app.post("/api/admin/login", async (req: any, res: any) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const admin = await storage.verifyAdminPassword(username, password);

      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.adminId = admin.id;
      req.session.username = admin.username;

      res.json({ success: true, admin: { id: admin.id, username: admin.username } });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Admin API: Logout
  app.post("/api/admin/logout", (req: any, res: any) => {
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  // Admin API: Check auth status
  app.get("/api/admin/me", requireAuth, (req: any, res: any) => {
    res.json({ 
      authenticated: true, 
      admin: { 
        id: req.session.adminId, 
        username: req.session.username 
      } 
    });
  });

  // Admin API: Get all reports
  app.get("/api/admin/reports", requireAuth, async (req: any, res: any) => {
    try {
      const reports = await storage.getAllReports();
      res.json(reports);
    } catch (error: any) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  // Admin API: Update report status
  app.patch("/api/admin/reports/:id", requireAuth, async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const updated = await storage.updateReportStatus(id, status);
      
      if (!updated) {
        return res.status(404).json({ message: "Report not found" });
      }

      res.json(updated);
    } catch (error: any) {
      console.error("Error updating report:", error);
      res.status(500).json({ message: "Failed to update report" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
