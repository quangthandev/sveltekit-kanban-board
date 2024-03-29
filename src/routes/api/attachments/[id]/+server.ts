import { checkAuthUser } from '$lib/server/auth.js';
import { error, json } from '@sveltejs/kit';
import { deleteAttachment } from '../../../items/[id]/queries.js';

export async function DELETE({ params, locals }) {
	checkAuthUser(locals);

	if (!params.id) {
		throw error(422, 'Attachment ID is required');
	}

	const data = await deleteAttachment(params.id, locals.user.id);

	return json(data);
}
