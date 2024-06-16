import { sqliteTable, AnySQLiteColumn, foreignKey, primaryKey, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const account = sqliteTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
},
(table) => {
	return {
		pk0: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"})
	}
});

export const authenticator = sqliteTable("authenticator", {
	credentialID: text("credentialID").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	providerAccountId: text("providerAccountId").notNull(),
	credentialPublicKey: text("credentialPublicKey").notNull(),
	counter: integer("counter").notNull(),
	credentialDeviceType: text("credentialDeviceType").notNull(),
	credentialBackedUp: integer("credentialBackedUp").notNull(),
	transports: text("transports"),
},
(table) => {
	return {
		credentialID_unique: uniqueIndex("authenticator_credentialID_unique").on(table.credentialID),
		pk0: primaryKey({ columns: [table.credentialID, table.userId], name: "authenticator_credentialID_userId_pk"})
	}
});

export const session = sqliteTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: integer("expires").notNull(),
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: integer("emailVerified"),
	image: text("image"),
});

export const verificationToken = sqliteTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: integer("expires").notNull(),
},
(table) => {
	return {
		pk0: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"})
	}
});