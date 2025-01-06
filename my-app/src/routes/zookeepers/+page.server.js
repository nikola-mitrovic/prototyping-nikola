import db from '$lib/db.js';

export async function load() {
    try {
        const zookeepers = await db.getZookeepers();
        return {
            zookeepers
        };
    } catch (error) {
        console.error('Error loading zookeepers:', error);
        return {
            zookeepers: []
        };
    }
} 