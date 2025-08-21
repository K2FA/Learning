import { relations } from 'drizzle-orm';
import { permissionTable } from './permission.model';
import { rolePermissionTable } from './role-permission.model';
import { roleTable } from './role.model';
import { sessionTable } from './session.model';
import { userTable } from './user.model';

export const userRelations = relations(userTable, ({ many, one }) => ({
  authTokens: many(sessionTable),
  role: one(roleTable, { fields: [userTable.roleId], references: [roleTable.id] }),
}));

export const sessionsRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, { fields: [sessionTable.userId], references: [userTable.id] }),
}));

export const roleRelations = relations(roleTable, ({ many }) => ({
  user: many(userTable),
  rolePermission: many(rolePermissionTable),
}));

export const permissionRelations = relations(permissionTable, ({ many }) => ({
  rolePermission: many(rolePermissionTable),
}));

export const rolePermissionRelations = relations(rolePermissionTable, ({ one }) => ({
  role: one(roleTable, { fields: [rolePermissionTable.roleId], references: [roleTable.id] }),
  permission: one(permissionTable, { fields: [rolePermissionTable.permissionId], references: [permissionTable.id] }),
}));
