import { relations } from 'drizzle-orm';
import { sessionTable } from './session.model';
import { userTable } from './user.model';

export const userRelations = relations(userTable, ({ many }) => ({
  authTokens: many(sessionTable),
}));

export const sessionsRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, { fields: [sessionTable.userId], references: [userTable.id] }),
}));
