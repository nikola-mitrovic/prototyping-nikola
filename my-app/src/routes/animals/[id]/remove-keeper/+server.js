import { json } from '@sveltejs/kit';
import { getZookeeper, updateZookeeper } from '$lib/db/zookeepers.js';

export async function POST({ request, params }) {
    try {
        const body = await request.json();
        console.log('Request body:', body);
        const { keeper_id } = body;
        
        if (!keeper_id) {
            console.error('No keeper_id provided');
            return json({ error: 'No keeper_id provided' }, { status: 400 });
        }
        
        console.log('Removing keeper with ID:', keeper_id);
        
        try {
            // Get the keeper
            const keeper = await getZookeeper(keeper_id);
            console.log('Found keeper:', keeper);
            
            if (!keeper) {
                console.log('Keeper not found');
                return json({ error: 'Keeper not found' }, { status: 404 });
            }

            // Remove the animal_id from the keeper
            const updatedKeeper = { ...keeper };
            delete updatedKeeper.animal_id;
            console.log('Updating keeper with data:', updatedKeeper);
            
            const result = await updateZookeeper(keeper_id, updatedKeeper);
            console.log('Update result:', result);

            if (result.modifiedCount === 1) {
                return json({ message: 'Keeper removed successfully' });
            } else {
                return json({ error: 'Failed to update keeper' }, { status: 500 });
            }
        } catch (dbError) {
            console.error('Database operation failed:', dbError);
            return json({ error: 'Database operation failed' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return json({ error: 'Failed to process request' }, { status: 500 });
    }
} 