import { int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const roleTable = mysqlTable('roles', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description'),
  createAt: timestamp('created_at').defaultNow(),
});
