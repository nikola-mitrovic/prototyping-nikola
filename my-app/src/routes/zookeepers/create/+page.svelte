<!-- Create Zookeeper Form -->
<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';

    export let form;

    function handleSubmit() {
        return async ({ result }) => {
            console.log('Form submission result:', result);
            if (result.type === 'success') {
                console.log('Form submission successful');
                await goto('/zookeepers');
            } else if (result.type === 'failure') {
                console.error('Form submission failed:', result.data);
            } else {
                console.log('Unknown result type:', result);
            }
        };
    }
</script>

<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h1>Add a New Zookeeper</h1>
            <a href="/zookeepers" class="btn btn-secondary mb-4">Back to Zookeepers</a>

            {#if form?.error}
                <div class="alert alert-danger">
                    {form.error}
                </div>
            {/if}

            <div class="card">
                <div class="card-body">
                    <form method="POST" use:enhance={handleSubmit}>
                        <!-- First Name -->
                        <div class="mb-3">
                            <label for="first_name" class="form-label">First Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="first_name"
                                name="first_name"
                                required
                                value={form?.zookeeper?.first_name || ''}
                            >
                        </div>

                        <!-- Last Name -->
                        <div class="mb-3">
                            <label for="last_name" class="form-label">Last Name</label>
                            <input
                                type="text"
                                class="form-control"
                                id="last_name"
                                name="last_name"
                                required
                                value={form?.zookeeper?.last_name || ''}
                            >
                        </div>

                        <!-- Gender -->
                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" name="gender" required>
                                <option value="">Select gender...</option>
                                <option value="Male" selected={form?.zookeeper?.gender === 'Male'}>Male</option>
                                <option value="Female" selected={form?.zookeeper?.gender === 'Female'}>Female</option>
                            </select>
                        </div>

                        <!-- Hire Date -->
                        <div class="mb-3">
                            <label for="hire_date" class="form-label">Hire Date</label>
                            <input
                                type="date"
                                class="form-control"
                                id="hire_date"
                                name="hire_date"
                                required
                                value={form?.zookeeper?.hire_date || ''}
                            >
                        </div>

                        <!-- Animal ID (Optional) -->
                        <div class="mb-3">
                            <label for="animal_id" class="form-label">Animal ID (Optional)</label>
                            <input
                                type="number"
                                class="form-control"
                                id="animal_id"
                                name="animal_id"
                                value={form?.zookeeper?.animal_id || ''}
                            >
                            <div class="form-text">Optional: Enter the ID of the animal this zookeeper will be responsible for</div>
                        </div>

                        <button type="submit" class="btn btn-primary">Add Zookeeper</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div> 