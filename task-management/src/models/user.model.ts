import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  fullname: varchar('fullname', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
