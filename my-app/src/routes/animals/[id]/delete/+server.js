import { json } from '@sveltejs/kit';
import { deleteAnimal } from '$lib/db/animals.js';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
    try {
        const result = await deleteAnimal(params.id);
        
        if (!result) {
            return json(
                { error: 'Animal not found' },
                { status: 404 }
            );
        }

        return json(
            { message: 'Animal deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return json(
            { error: 'Failed to delete animal' },
            { status: 500 }
        );
    }
} 