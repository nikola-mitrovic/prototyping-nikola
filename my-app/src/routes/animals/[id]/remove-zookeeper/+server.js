import { json } from '@sveltejs/kit';
import { getZookeeper, updateZookeeper } from '$lib/db/zookeepers.js';

export async function POST({ request, params }) {
    try {
        const body = await request.json();
        console.log('Request body:', body);
        const { zookeeper_id } = body;
        
        if (!zookeeper_id) {
            console.error('No zookeeper_id provided');
            return json({ error: 'No zookeeper_id provided' }, { status: 400 });
        }
        
        console.log('Removing zookeeper with ID:', zookeeper_id);
        
        try {
            // Get the zookeeper
            const zookeeper = await getZookeeper(zookeeper_id);
            console.log('Found zookeeper:', zookeeper);
            
            if (!zookeeper) {
                console.log('Zookeeper not found');
                return json({ error: 'Zookeeper not found' }, { status: 404 });
            }

            // Remove the animal_id from the zookeeper
            const updatedZookeeper = { ...zookeeper };
            delete updatedZookeeper.animal_id;
            console.log('Updating zookeeper with data:', updatedZookeeper);
            
            const result = await updateZookeeper(zookeeper_id, updatedZookeeper);
            console.log('Update result:', result);

            if (result.modifiedCount === 1) {
                return json({ message: 'Zookeeper removed successfully' });
            } else {
                return json({ error: 'Failed to update zookeeper' }, { status: 500 });
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