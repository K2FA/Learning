import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { userTable } from './user.model';

export const authTokensTable = mysqlTable('auth_tokens', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id')
    .references(() => userTable.id)
    .notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
