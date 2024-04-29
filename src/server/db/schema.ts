// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  timestamp,
  uuid,
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
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    userId: varchar("userId", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    title: varchar("title", { length: 64 }).notNull(),
    description: varchar("description", { length: 512 }),
    private: boolean("private").default(false).notNull(),
  },
  (table) => {
    return {
      titleIndex: index("title_idx").on(table.title),
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
    recipeId: uuid("recipeId")
      .notNull()
      .references(() => recipes.id),
    sortOrder: serial("sortOrder").notNull(),
    description: varchar("description", { length: 256 }),
    quantity: integer("quantity"),
    quantityType: integer("quantityType").references(() => quantity_types.id, {
      onDelete: "restrict",
    }),
  },
  (table) => {
    return {
      primaryKey: primaryKey({
        columns: [table.id, table.recipeId],
      }),
    };
  },
);

export const recipe_steps = createTable(
  "recipe_step",
  {
    id: serial("id").notNull(),
    recipeId: uuid("recipeId")
      .notNull()
      .references(() => recipes.id),
    sortOrder: serial("sortOrder").notNull(),
  },
  (table) => {
    return {
      primaryKey: primaryKey({
        columns: [table.id, table.recipeId],
      }),
    };
  },
);

export const recipe_images = createTable(
  "recipe_image",
  {
    id: serial("id").notNull(),
    recipeId: uuid("recipeId")
      .notNull()
      .references(() => recipes.id),
    sortOrder: serial("sortOrder").notNull(),
    url: varchar("url", { length: 256 }),
  },
  (table) => {
    return {
      primaryKey: primaryKey({
        columns: [table.id, table.recipeId],
      }),
    };
  },
);
