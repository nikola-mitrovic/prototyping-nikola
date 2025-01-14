import { json } from '@sveltejs/kit';
import { removeZookeeperFromAnimal } from '$lib/db/animals.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
    try {
        const { zookeeper_id } = await request.json();
        
        if (!zookeeper_id) {
            return json(
                { error: 'Zookeeper ID is required' },
                { status: 400 }
            );
        }

        await removeZookeeperFromAnimal(params.id, zookeeper_id);

        return json(
            { message: 'Zookeeper removed successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('API: Error removing zookeeper:', error);
        return json(
            { error: error.message || 'Failed to remove zookeeper' },
            { status: 500 }
        );
    }
} 