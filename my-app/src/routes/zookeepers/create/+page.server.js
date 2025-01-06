import { createZookeeper } from '$lib/db/zookeepers.js';
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        
        // Get form data
        const zookeeper = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            gender: formData.get('gender'),
            hire_date: formData.get('hire_date')
        };

        // Only add animal_id if it was provided
        const animal_id = formData.get('animal_id');
        if (animal_id) {
            zookeeper.animal_id = parseInt(animal_id);
        }

        try {
            // Validate required fields
            if (!zookeeper.first_name || !zookeeper.last_name || !zookeeper.gender || !zookeeper.hire_date) {
                return fail(400, {
                    error: 'First name, last name, gender, and hire date are required',
                    zookeeper
                });
            }

            // Convert date from YYYY-MM-DD to DD.MM.YYYY
            const [year, month, day] = zookeeper.hire_date.split('-');
            zookeeper.hire_date = `${day}.${month}.${year}`;

            // Create the zookeeper
            const id = await createZookeeper(zookeeper);
            
            if (id) {
                // Redirect to zookeepers list on success
                return { success: true };
            } else {
                return fail(500, {
                    error: 'Failed to create zookeeper',
                    zookeeper
                });
            }
        } catch (error) {
            console.error('Error creating zookeeper:', error);
            return fail(500, {
                error: 'Internal server error',
                zookeeper
            });
        }
    }
}; 