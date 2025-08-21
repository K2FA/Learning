import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { roleTable } from './role.model';

export const userTable = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  fullname: varchar('fullname', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  roleId: int('role_id').references(() => roleTable.id),
  createdAt: timestamp('created_at').defaultNow(),
});
