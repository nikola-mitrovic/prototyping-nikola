import { getZookeepers } from '$lib/db/zookeepers.js';
import { error } from '@sveltejs/kit';

export async function load() {
    try {
        console.log('Loading zookeepers page...');
        const zookeepers = await getZookeepers();
        console.log('Loaded zookeepers:', zookeepers);

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