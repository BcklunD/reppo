// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  foreignKey,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `reppo_${name}`);

export const recipes = createTable(
  "recipe",
  {
    id: serial("id").notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    title: varchar("title", { length: 64 }).notNull(),
    description: varchar("description", { length: 512 }),
    private: boolean("private").default(false).notNull(),
  },
  (example) => {
    return {
      primaryKey: primaryKey({ columns: [example.id, example.userId] }),
      titleIndex: index("title_idx").on(example.title),
    };
  },
);

export const quantity_types = createTable("quantity_type", {
  id: serial("id").primaryKey(),
  description: varchar("description", { length: 256 }).notNull(),
});

export const recipe_ingredients = createTable(
  "recipe_ingredient",
  {
    id: serial("id").notNull(),
    userId: varchar("authorId", { length: 256 }).notNull(),
    recipeId: integer("recipeId").notNull(),
    sortOrder: serial("sortOrder").notNull(),
    description: varchar("description", { length: 256 }),
    quantity: integer("quantity"),
    quantityType: integer("quantityType").references(() => quantity_types.id, {
      onDelete: "restrict",
    }),
  },
  (example) => {
    return {
      primaryKey: primaryKey({
        columns: [example.id, example.userId, example.recipeId],
      }),
      foreignKey: foreignKey({
        columns: [example.userId, example.recipeId],
        foreignColumns: [recipes.userId, recipes.id],
      }),
    };
  },
);

export const recipe_steps = createTable(
  "recipe_step",
  {
    id: serial("id").notNull(),
    userId: varchar("authorId", { length: 256 }).notNull(),
    recipeId: integer("recipeId").notNull(),
    sortOrder: serial("sortOrder").notNull(),
  },
  (table) => {
    return {
      primaryKey: primaryKey({
        columns: [table.id, table.userId, table.recipeId],
      }),
      foreignKey: foreignKey({
        columns: [table.userId, table.recipeId],
        foreignColumns: [recipes.userId, recipes.id],
      }),
    };
  },
);
