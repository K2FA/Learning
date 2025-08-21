import { int, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { permissionTable } from './permission.model';
import { roleTable } from './role.model';

export const rolePermissionTable = mysqlTable('role_permissions', {
  id: int('id').primaryKey().autoincrement(),
  roleId: int('role_id').references(() => roleTable.id),
  permissionId: int('permission_id').references(() => permissionTable.id),
  createdAt: timestamp('created_at').defaultNow(),
});
