import { createAnimal } from '$lib/db.js';
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        
        // Get form data
        const animal = {
            name: formData.get('name'),
            nickname: formData.get('nickname'),
            age: parseInt(formData.get('age')),
            gender: formData.get('gender'),
            diet: formData.get('diet'),
            arrival_date: formData.get('arrival_date'),
            image: "/images/placeholder.jpg" // Default image
        };

        try {
            // Validate required fields
            if (!animal.name || !animal.nickname || !animal.age || !animal.gender || !animal.diet || !animal.arrival_date) {
                return fail(400, {
                    error: 'All fields are required',
                    animal
                });
            }

            // Convert date from YYYY-MM-DD to DD.MM.YYYY
            const [year, month, day] = animal.arrival_date.split('-');
            animal.arrival_date = `${day}.${month}.${year}`;

            // Create the animal
            const id = await createAnimal(animal);
            
            if (id) {
                // Redirect to animals list on success
                return { success: true };
            } else {
                return fail(500, {
                    error: 'Failed to create animal',
                    animal
                });
            }
        } catch (error) {
            console.error('Error creating animal:', error);
            return fail(500, {
                error: 'Internal server error',
                animal
            });
        }
    }
}; 