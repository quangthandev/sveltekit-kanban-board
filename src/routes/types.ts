import type { attachment, board, column, cover, item } from '$lib/server/drizzle/schema';

export type Board = typeof board.$inferSelect;
export type Column = typeof column.$inferSelect;
export type Item = typeof item.$inferSelect;
export type Attachment = typeof attachment.$inferSelect;
export type Cover = typeof cover.$inferSelect;

export type BoardWithColumns = Board & {
	columns: (Column & { items: ItemWithCoverAndAttachments[] })[];
};

export type ItemWithColumn = Item & {
	column: Column;
};
export type ItemFullPayload = Item & {
	board: Board;
	column: Column;
	cover: Cover | null;
	attachments: (Attachment & { isCover: boolean })[];
};
export type ItemWithCoverAndAttachments = Item & {
	cover: Cover | null;
	attachments: ItemFullPayload['attachments'];
};
export type ItemMutation = Required<
	Omit<typeof item.$inferInsert, 'content' | 'createdAt' | 'updatedAt'>
>;

export type ColumnWithItems = Column & {
	items: Item[];
};
