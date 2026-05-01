import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const missionStatusEnum = pgEnum('mission_status', ['waiting', 'cancelled', 'inprogress', 'over'])
export const assignmentStatusEnum = pgEnum('assignment_status', ['proposed', 'confirmed', 'cancelled', 'absent', 'present'])
export const dayOfWeekEnum = pgEnum('day_of_week', ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'])
export const slotEnum = pgEnum('slot', ['morning','afternoon','evening'])

export const managers = pgTable('managers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
})

export const festivals = pgTable('festivals', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull()
})

export const volunteers = pgTable('volunteers', {
  id: uuid('id').primaryKey().defaultRandom(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
})

export const availabilities = pgTable('availabilities', {
  id: uuid('id').primaryKey().defaultRandom(),
  volunteerId: uuid('volunteer_id').references(() => volunteers.id),
  day: dayOfWeekEnum('day').notNull(),
  slot: slotEnum('slot').notNull()
})

export const missions = pgTable('missions', {
  id: uuid('id').primaryKey().defaultRandom(),
  festivalId: uuid('festival_id').references(() => festivals.id),
  name: varchar('name', { length: 255 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  managerId: uuid('manager_id').references(() => managers.id),
  missionStatus: missionStatusEnum().default('waiting'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
})

export const assignments = pgTable('assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  volunteerId: uuid('volunteer_id').references(() => volunteers.id),
  missionId: uuid('mission_id').references(() => missions.id),
  assignmentStatus: assignmentStatusEnum().default('proposed'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
})