import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { userTable } from './user.model';

export const sessionTable = mysqlTable('sessions', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').references(() => userTable.id),
  token: varchar('token', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
});
