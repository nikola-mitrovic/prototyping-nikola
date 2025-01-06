<!-- Create Animal Form -->
<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    export let form;

    function handleSubmit() {
        return async ({ result }) => {
            if (result.type === 'success') {
                await goto('/animals');
            }
        };
    }
</script>

<div class="container mt-4">
    <div class="mb-4">
        <h1>Add a New Animal</h1>
        <a href="/animals" class="btn btn-secondary">Back to Animals</a>
    </div>

    <div class="card">
        <div class="card-body">
            {#if form?.error}
                <div class="alert alert-danger" role="alert">
                    {form.error}
                </div>
            {/if}

            <form method="POST" use:enhance={handleSubmit}>
                <div class="mb-3">
                    <label for="name" class="form-label">Animal Type</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="name" 
                        name="name" 
                        value={form?.animal?.name || ''} 
                        required
                        placeholder="e.g., Monkey, Elephant, Zebra"
                    >
                </div>

                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="nickname" 
                        name="nickname" 
                        value={form?.animal?.nickname || ''} 
                        required
                    >
                </div>

                <div class="mb-3">
                    <label for="age" class="form-label">Age (years)</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        id="age" 
                        name="age" 
                        value={form?.animal?.age || ''} 
                        required 
                        min="0"
                    >
                </div>

                <div class="mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <select 
                        class="form-select" 
                        id="gender" 
                        name="gender" 
                        required
                    >
                        <option value="">Select gender...</option>
                        <option value="Male" selected={form?.animal?.gender === 'Male'}>Male</option>
                        <option value="Female" selected={form?.animal?.gender === 'Female'}>Female</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="diet" class="form-label">Diet</label>
                    <select 
                        class="form-select" 
                        id="diet" 
                        name="diet" 
                        required
                    >
                        <option value="">Select diet...</option>
                        <option value="herbivore" selected={form?.animal?.diet === 'herbivore'}>Herbivore</option>
                        <option value="carnivore" selected={form?.animal?.diet === 'carnivore'}>Carnivore</option>
                        <option value="omnivore" selected={form?.animal?.diet === 'omnivore'}>Omnivore</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="arrival_date" class="form-label">Arrival Date</label>
                    <input 
                        type="date" 
                        class="form-control" 
                        id="arrival_date" 
                        name="arrival_date" 
                        value={form?.animal?.arrival_date || ''} 
                        required
                    >
                </div>

                <button type="submit" class="btn btn-primary">Add Animal</button>
            </form>
        </div>
    </div>
</div> 