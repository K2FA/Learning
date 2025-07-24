import { relations } from 'drizzle-orm';
import { authTokensTable } from './auth.model';
import { userTable } from './user.model';

export const userRelations = relations(userTable, ({ many }) => ({
  authTokens: many(authTokensTable),
}));

export const authTokenRelations = relations(authTokensTable, ({ one }) => ({
  user: one(userTable, { fields: [authTokensTable.userId], references: [userTable.id] }),
}));
