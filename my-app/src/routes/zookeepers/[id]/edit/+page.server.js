import { getZookeeper, updateZookeeper } from '$lib/db/zookeepers.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const zookeeper = await getZookeeper(params.id);
    if (!zookeeper) {
        return {
            status: 404,
            error: 'Zookeeper not found'
        };
    }
    return { zookeeper };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const first_name = formData.get('first_name');
        const last_name = formData.get('last_name');
        const gender = formData.get('gender');
        const hire_date = formData.get('hire_date');

        // Basic validation
        if (!first_name || !last_name || !gender || !hire_date) {
            return {
                status: 400,
                error: 'All required fields must be filled out'
            };
        }

        // Convert hire_date from YYYY-MM-DD to DD.MM.YYYY
        const [year, month, day] = hire_date.split('-');
        const formattedDate = `${day}.${month}.${year}`;

        try {
            const updatedZookeeper = await updateZookeeper(params.id, {
                first_name,
                last_name,
                gender,
                hire_date: formattedDate
            });

            return {
                status: 200,
                type: 'success',
                zookeeper: updatedZookeeper
            };
        } catch (error) {
            return {
                status: 500,
                error: 'Failed to update zookeeper'
            };
        }
    }
}; 