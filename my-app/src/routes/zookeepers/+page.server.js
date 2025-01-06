import { getZookeepers } from '$lib/db/zookeepers.js';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        const zookeepers = await getZookeepers();
        return {
            zookeepers
        };
    } catch (err) {
        console.error('Error loading zookeepers:', err);
        throw error(500, {
            message: 'Failed to load zookeepers'
        });
    }
} 