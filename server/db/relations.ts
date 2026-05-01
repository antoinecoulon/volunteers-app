import { relations } from "drizzle-orm";
import { assignments, availabilities, festivals, managers, missions, volunteers } from "./schema";

export const volunteersRelations = relations(volunteers, ({ many }) => ({
  availabilities: many(availabilities),
  assignments: many(assignments)
}))

export const missionsRelations = relations(missions, ({ one, many }) => ({
  festival: one(festivals, {
    fields: [missions.festivalId],
    references: [festivals.id]
  }),
  manager: one(managers, {
    fields: [missions.managerId],
    references: [managers.id]
  }),
  assignments: many(assignments)
}))

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  volunteer: one(volunteers, {
    fields: [assignments.volunteerId],
    references: [volunteers.id]
  }),
  mission: one(missions, {
    fields: [assignments.missionId],
    references: [missions.id]
  })
}))