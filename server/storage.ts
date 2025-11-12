import { db } from "./db";
import { reports, admins, type InsertReport, type Report, type InsertAdmin, type Admin } from "../shared/schema";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";

export class DatabaseStorage {
  // Report operations
  async createReport(report: InsertReport): Promise<Report> {
    const [newReport] = await db.insert(reports).values(report).returning();
    return newReport;
  }

  async getAllReports(): Promise<Report[]> {
    return await db.select().from(reports).orderBy(desc(reports.createdAt));
  }

  async getReportById(id: number): Promise<Report | undefined> {
    const [report] = await db.select().from(reports).where(eq(reports.id, id));
    return report;
  }

  async updateReportStatus(id: number, status: string): Promise<Report | undefined> {
    const [updated] = await db
      .update(reports)
      .set({ status })
      .where(eq(reports.id, id))
      .returning();
    return updated;
  }

  // Admin operations
  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const [newAdmin] = await db
      .insert(admins)
      .values({ ...admin, password: hashedPassword })
      .returning();
    return newAdmin;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin;
  }

  async verifyAdminPassword(username: string, password: string): Promise<Admin | null> {
    const admin = await this.getAdminByUsername(username);
    if (!admin) return null;

    const isValid = await bcrypt.compare(password, admin.password);
    return isValid ? admin : null;
  }
}

export const storage = new DatabaseStorage();
