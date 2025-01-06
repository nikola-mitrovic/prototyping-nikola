import { getZookeepers, getAnimals } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Get all data
        const zookeepers = await getZookeepers();
        const animals = await getAnimals();

        // Analyze keeper assignments
        const assigned = zookeepers.filter(k => k.animal_id);
        const available = zookeepers.filter(k => !k.animal_id);

        // Create a summary
        const summary = {
            total_keepers: zookeepers.length,
            total_animals: animals.length,
            assigned_keepers: assigned.length,
            available_keepers: available.length,
            keeper_details: zookeepers.map(k => ({
                id: k._id,
                name: `${k.first_name} ${k.last_name}`,
                animal_id: k.animal_id || 'none'
            }))
        };

        console.log('DEBUG: Keeper summary:', summary);
        
        return json(summary);
    } catch (error) {
        console.error('DEBUG: Error checking keepers:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 