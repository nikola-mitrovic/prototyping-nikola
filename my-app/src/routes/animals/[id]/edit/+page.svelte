<!-- Edit Animal Form -->
<script>
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    export let data;
    export let form;

    // Convert date from DD.MM.YYYY to YYYY-MM-DD for input
    function formatDateForInput(dateStr) {
        if (!dateStr) return '';
        const [day, month, year] = dateStr.split('.');
        return `${year}-${month}-${day}`;
    }

    function handleSubmit() {
        return async ({ result }) => {
            if (result.type === 'success') {
                await goto(`/animals/${data.animal._id}`);
            }
        };
    }
</script>

<div class="container mt-4">
    {#if form?.error}
        <div class="alert alert-danger" role="alert">
            {form.error}
        </div>
    {/if}

    <h1>Edit Animal</h1>
    <p class="text-muted">Editing {data.animal.nickname} the {data.animal.name}</p>

    <div class="card">
        <div class="card-body">
            <h2 class="card-title">Basic Information</h2>
            <form method="POST" use:enhance={handleSubmit}>
                <div class="mb-3">
                    <label for="name" class="form-label">Species</label>
                    <input type="text" class="form-control" id="name" name="name" value={data.animal.name} required>
                </div>

                <div class="mb-3">
                    <label for="nickname" class="form-label">Nickname</label>
                    <input type="text" class="form-control" id="nickname" name="nickname" value={data.animal.nickname} required>
                </div>

                <div class="mb-3">
                    <label for="age" class="form-label">Age (years)</label>
                    <input type="number" class="form-control" id="age" name="age" value={data.animal.age} required min="0">
                </div>

                <div class="mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <select class="form-select" id="gender" name="gender" required>
                        <option value="">Select gender...</option>
                        <option value="Male" selected={data.animal.gender === 'Male'}>Male</option>
                        <option value="Female" selected={data.animal.gender === 'Female'}>Female</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="diet" class="form-label">Diet</label>
                    <input type="text" class="form-control" id="diet" name="diet" value={data.animal.diet} required>
                </div>

                <div class="mb-3">
                    <label for="arrival_date" class="form-label">Arrival Date</label>
                    <input 
                        type="date" 
                        class="form-control" 
                        id="arrival_date" 
                        name="arrival_date" 
                        value={formatDateForInput(data.animal.arrival_date)}
                        required
                    >
                </div>

                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <a href="/animals/{data.animal._id}" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Add Bootstrap Icons -->
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</svelte:head> 