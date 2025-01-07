import { json } from '@sveltejs/kit';
import { deleteZookeeper } from '$lib/db/zookeepers.js';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    try {
        const result = await deleteZookeeper(params.id);
        
        if (!result) {
            return json(
                { error: 'Zookeeper not found' },
                { status: 404 }
            );
        }

        return json(
            { message: 'Zookeeper deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return json(
            { error: 'Failed to delete zookeeper' },
            { status: 500 }
        );
    }
} 