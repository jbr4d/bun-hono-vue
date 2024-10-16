import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { db } from "../db";
import { expensesTable } from "../db/schema/expenses";
import { eq } from "drizzle-orm";
import { getUser } from "../kinde";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.string(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses = [
  { id: 1, title: "Groceries", amount: "50" },
  { id: 2, title: "Utilities", amount: "100" },
  { id: 3, title: "Rent", amount: "1200" },
];

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {

    const user = c.var.user
    // console.log(user.id)

    const expenses = await db.select().from(expensesTable).where(eq(expensesTable.userId, user.id));
    return c.json({ expenses: expenses });
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {

    const expense = await c.req.valid("json");
    const user = c.var.user;
    console.log(`user id: ${user.id}`)

    const result = await db.insert(expensesTable).values({
        ...expense,
        userId: user.id
    }).returning()

    c.status(201);
    return c.json(result);
  })
  // .get("/total-spent", (c) => {
  //   const total = fakeExpenses.reduce(
  //     (acc, expense) => acc + expense.amount,
  //     0
  //   );
  //   return c.json({ total });
  // })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
//   .delete("/:id{[0-9]+}", (c) => {
//     const id = Number.parseInt(c.req.param("id"));
//     const expense = fakeExpenses.find((expense) => expense.id === id);
//     if (!expense) {
//       return c.notFound();
//     }
//     const deletedExpense = fakeExpenses.splice(index, 1)[0];
//     return c.json({ expense: deletedExpense });
//   });
