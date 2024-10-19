import {
  serial,
  text,
  index,
  pgTable,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expensesTable = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);

// Schema for inserting - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expensesTable, {
  title: z.string().min(3),
  amount: z.string(),
});
// Schema for selecting - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expensesTable);
