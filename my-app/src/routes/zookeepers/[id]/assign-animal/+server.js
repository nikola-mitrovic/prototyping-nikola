import { assignZookeeperToAnimal } from '$lib/db/zookeepers.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, params }) {
    try {
        const { animal_id } = await request.json();
        const zookeeper_id = params.id;
        
        if (!animal_id) {
            return json({ error: 'Animal ID is required' }, { status: 400 });
        }
        
        console.log(`API: Assigning animal ${animal_id} to zookeeper ${zookeeper_id}`);
        await assignZookeeperToAnimal(animal_id, zookeeper_id);
        
        return json({ success: true });
    } catch (error) {
        console.error('API: Error assigning animal:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 