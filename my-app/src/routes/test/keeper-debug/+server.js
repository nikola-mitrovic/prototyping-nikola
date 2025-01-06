import { getZookeepers, getAnimals, assignKeeperToAnimal } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Get all zookeepers and animals to check their state
        console.log('DEBUG: Getting all zookeepers and animals');
        const zookeepers = await getZookeepers();
        const animals = await getAnimals();

        // Log the current state
        console.log('DEBUG: Current zookeepers:', zookeepers);
        console.log('DEBUG: Current animals:', animals);

        // Find an unassigned keeper and an animal
        const unassignedKeeper = zookeepers.find(k => !k.animal_id);
        const firstAnimal = animals[0];

        if (!unassignedKeeper || !firstAnimal) {
            return json({
                error: 'No unassigned keeper or no animals available',
                zookeepers,
                animals
            });
        }

        // Try to assign them
        console.log(`DEBUG: Attempting to assign keeper ${unassignedKeeper._id} to animal ${firstAnimal._id}`);
        await assignKeeperToAnimal(firstAnimal._id, unassignedKeeper._id);

        // Get updated data
        const updatedZookeepers = await getZookeepers();

        return json({
            success: true,
            original: {
                zookeepers,
                animals
            },
            updated: {
                zookeepers: updatedZookeepers
            },
            test: {
                keeper: unassignedKeeper,
                animal: firstAnimal
            }
        });
    } catch (error) {
        console.error('DEBUG: Error during test:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 