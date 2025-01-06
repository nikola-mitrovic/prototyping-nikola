<!-- Create Zookeeper Form -->
<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    export let form;

    function handleSubmit() {
        return async ({ result }) => {
            if (result.type === 'success') {
                await goto('/zookeepers');
            }
        };
    }
</script>

<div class="container mt-4">
    <div class="mb-4">
        <h1>Add a New Zookeeper</h1>
        <a href="/zookeepers" class="btn btn-secondary">Back to Zookeepers</a>
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
                    <label for="first_name" class="form-label">First Name</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="first_name" 
                        name="first_name" 
                        value={form?.zookeeper?.first_name || ''} 
                        required
                    >
                </div>

                <div class="mb-3">
                    <label for="last_name" class="form-label">Last Name</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="last_name" 
                        name="last_name" 
                        value={form?.zookeeper?.last_name || ''} 
                        required
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
                        <option value="Male" selected={form?.zookeeper?.gender === 'Male'}>Male</option>
                        <option value="Female" selected={form?.zookeeper?.gender === 'Female'}>Female</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="hire_date" class="form-label">Hire Date</label>
                    <input 
                        type="date" 
                        class="form-control" 
                        id="hire_date" 
                        name="hire_date" 
                        value={form?.zookeeper?.hire_date || ''} 
                        required
                    >
                </div>

                <div class="mb-3">
                    <label for="animal_id" class="form-label">Assigned Animal ID</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        id="animal_id" 
                        name="animal_id" 
                        value={form?.zookeeper?.animal_id || ''} 
                        min="1"
                    >
                    <div class="form-text">Optional: Enter the ID of the animal this keeper will be responsible for</div>
                </div>

                <button type="submit" class="btn btn-primary">Add Zookeeper</button>
            </form>
        </div>
    </div>
</div> 