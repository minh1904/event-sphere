import { sql, SQL } from 'drizzle-orm';

import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  AnyPgColumn,
  uniqueIndex,
  serial,
  varchar,
  decimal,
  date,
  time,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable(
  'user',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    password: text('password'),
    role: roleEnum('role').notNull().default('user'),
  },
  (table) => [
    // uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`),
    uniqueIndex('emailUniqueIndex').on(lower(table.email)),
  ]
);

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);
export const categories = pgTable('categories', {
  id: serial('id').notNull().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict' }),
  title: varchar('title', { length: 255 }).notNull(),
  shortTitle: text('short_title').notNull().default('Chưa có tiêu đề ngắn'),
  description: text('description'),
  price: decimal('price', { precision: 15, scale: 2 }).notNull(),
  isFree: boolean('is_free').default(false),
  imageUrl: varchar('image_url', { length: 255 }),
  type: varchar('type', { length: 100 }),
  dateStart: date('dateStart'),
  dateEnd: date('dateEnd'),
  ticketLeft: integer('ticket_left').default(0),
  startTime: time('start_time'),
  endTime: time('end_time'),
  location: varchar('location', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  status: varchar('status', { length: 50 }).default('active'),
});

export const cart_items = pgTable(
  'cart_items',
  {
    id: serial('id').notNull().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }), // Liên kết với người dùng
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'restrict' }), // Liên kết với vé
    quantity: integer('quantity').notNull().default(1), // Số lượng vé
    price: decimal('price', { precision: 15, scale: 2 }).notNull(), // Giá vé tại thời điểm thêm
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('user_product_unique').on(table.userId, table.productId), // Mỗi vé chỉ xuất hiện một lần trong giỏ hàng
  ]
);

export const imageSourceEnum = pgEnum('image_source', ['local', 'external']);

export const product_images = pgTable(
  'product_images',
  {
    id: serial('id').notNull().primaryKey(),
    productId: integer('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    imageUrl: varchar('image_url', { length: 255 }).notNull(),
    sourceType: imageSourceEnum('source_type').notNull().default('local'),
    isPrimary: boolean('is_primary').notNull().default(false),
    order: integer('order').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('product_image_unique').on(table.productId, table.imageUrl),
  ]
);
