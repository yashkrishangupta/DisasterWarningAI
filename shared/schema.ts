import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Community Reports Table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema for reports (for form validation)
export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  status: true,
  createdAt: true,
});

// Types
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;

// Admin Users Table
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema for admins
export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;
