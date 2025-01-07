import { json } from '@sveltejs/kit';
import { addZookeeperToAnimal } from '$lib/db/animals.js';

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

        await addZookeeperToAnimal(params.id, zookeeper_id);

        return json(
            { message: 'Zookeeper assigned successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('API: Error assigning zookeeper:', error);
        return json(
            { error: error.message || 'Failed to assign zookeeper' },
            { status: 500 }
        );
    }
} 