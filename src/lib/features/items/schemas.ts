import { cover, item } from '$lib/drizzle/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const createItemSchema = z.object({
	id: z.string(),
	title: z.string(),
	columnId: z.string(),
	order: z.union([z.string(), z.number()]).transform((val) => Number(val)),
	boardId: z.number()
});

export const updateItemTitleSchema = createInsertSchema(item, {
	title: (schema) => schema.title
}).pick({ title: true });

export const updateItemContentSchema = createInsertSchema(item, {
	content: (schema) => schema.content
}).pick({ content: true });

export const moveItemToColumnSchema = createInsertSchema(item, {
	columnId: (schema) => schema.columnId
}).pick({ columnId: true });

export const moveOrCopyItemToDestinationSchema = createInsertSchema(item, {
	boardId: z.string(),
	columnId: (schema) => schema.columnId,
	title: (schema) => schema.title
})
	.extend({
		posIndex: z.string()
	})
	.pick({ boardId: true, columnId: true, title: true, posIndex: true });

export const makeCoverSchema = createInsertSchema(cover, {
	attachmentId: z.string()
}).pick({ attachmentId: true });
