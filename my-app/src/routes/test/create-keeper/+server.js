import { createZookeeper } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        // Create an unassigned keeper
        const testKeeper = {
            first_name: "Available",
            last_name: "Keeper",
            gender: "Female",
            hire_date: "01.02.2024"
            // Note: no animal_id set, so they will be available
        };
        
        console.log('TEST: Creating unassigned keeper');
        const keeperId = await createZookeeper(testKeeper);
        console.log('TEST: Created keeper with ID:', keeperId);
        
        return json({
            message: 'Created unassigned keeper',
            keeper_id: keeperId
        });
    } catch (error) {
        console.error('TEST: Error creating keeper:', error);
        return json({ error: error.message }, { status: 500 });
    }
} 