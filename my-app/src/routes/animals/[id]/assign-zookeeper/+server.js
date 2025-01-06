import { assignZookeeperToAnimal } from '$lib/db/zookeepers.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, params }) {
    try {
        const { zookeeper_id } = await request.json();
        const animal_id = params.id;
        
        if (!zookeeper_id) {
            return json({ error: 'Zookeeper ID is required' }, { status: 400 });
        }
        
        console.log(`API: Assigning zookeeper ${zookeeper_id} to animal ${animal_id}`);
        await assignZookeeperToAnimal(animal_id, zookeeper_id);
        
        return json({ success: true });
    } catch (error) {
        console.error('API: Error assigning zookeeper:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 