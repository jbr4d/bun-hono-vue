import { serial, text, index, pgTable, numeric } from "drizzle-orm/pg-core";

export const expensesTable = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);
