import { getAnimal, updateAnimal } from '$lib/db/animals.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const animal = await getAnimal(params.id);
    if (!animal) {
        return {
            status: 404,
            error: 'Animal not found'
        };
    }
    return { animal };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const nickname = formData.get('nickname');
        const age = formData.get('age');
        const gender = formData.get('gender');
        const diet = formData.get('diet');
        const arrival_date = formData.get('arrival_date');

        // Basic validation
        if (!name || !nickname || !age || !gender || !diet || !arrival_date) {
            return {
                status: 400,
                error: 'All required fields must be filled out'
            };
        }

        // Convert arrival_date from YYYY-MM-DD to DD.MM.YYYY
        const [year, month, day] = arrival_date.split('-');
        const formattedDate = `${day}.${month}.${year}`;

        try {
            const updatedAnimal = await updateAnimal(params.id, {
                name,
                nickname,
                age: parseInt(age),
                gender,
                diet,
                arrival_date: formattedDate
            });

            return {
                status: 200,
                type: 'success',
                animal: updatedAnimal
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Failed to update animal'
            };
        }
    }
}; 