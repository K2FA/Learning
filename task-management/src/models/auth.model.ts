import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const authTokensTable = mysqlTable('auth_tokens', {
  id: int('id').primaryKey().autoincrement(),
  user_id: int('user_id').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
