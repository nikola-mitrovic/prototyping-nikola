import { getAnimal, updateAnimal } from '$lib/db/animals.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        console.log('DB: Getting animal with ID:', params.id);
        const animal = await getAnimal(params.id);
        
        if (!animal) {
            throw error(404, {
                message: 'Animal not found'
            });
        }

        return {
            animal
        };
    } catch (err) {
        console.error('Error loading animal:', err);
        throw error(500, {
            message: 'Failed to load animal'
        });
    }
}

export const actions = {
    default: async ({ request, params }) => {
        try {
            const formData = await request.formData();
            console.log('Form data received:', Object.fromEntries(formData));

            // Convert form data to object and handle type conversions
            const updates = {
                name: formData.get('name'),
                nickname: formData.get('nickname'),
                age: parseInt(formData.get('age')),
                gender: formData.get('gender'),
                diet: formData.get('diet'),
                arrival_date: formData.get('arrival_date'),
                image: formData.get('image')
            };

            console.log('Processed updates:', updates);

            // Convert date from YYYY-MM-DD to DD.MM.YYYY
            const [year, month, day] = updates.arrival_date.split('-');
            const formattedDate = `${day}.${month}.${year}`;
            updates.arrival_date = formattedDate;

            console.log('Attempting to update animal with ID:', params.id);
            const result = await updateAnimal(params.id, updates);
            console.log('Update result:', result);

            // Redirect to animal details page on success
            throw redirect(303, `/animals/${params.id}`);
        } catch (err) {
            console.error('Detailed error:', err);
            
            // If it's a redirect, let it pass through
            if (err.status === 303) throw err;
            
            // Otherwise, return the error to display in the form
            return {
                error: 'Failed to update animal. Please try again.'
            };
        }
    }
}; 