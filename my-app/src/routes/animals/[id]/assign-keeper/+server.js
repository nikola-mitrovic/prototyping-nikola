import { assignKeeperToAnimal } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, params }) {
    try {
        const { keeper_id } = await request.json();
        const animal_id = params.id;
        
        if (!keeper_id) {
            return json({ error: 'Keeper ID is required' }, { status: 400 });
        }
        
        console.log(`API: Assigning keeper ${keeper_id} to animal ${animal_id}`);
        await assignKeeperToAnimal(animal_id, keeper_id);
        
        return json({ success: true });
    } catch (error) {
        console.error('API: Error assigning keeper:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 