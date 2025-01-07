<!-- Edit Zookeeper Form -->
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
                await goto(`/zookeepers/${data.zookeeper._id}`);
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

    <h1>Edit Zookeeper</h1>
    <p class="text-muted">Editing {data.zookeeper.first_name} {data.zookeeper.last_name}</p>

    <div class="card">
        <div class="card-body">
            <h2 class="card-title">Basic Information</h2>
            <form method="POST" use:enhance={handleSubmit}>
                <div class="mb-3">
                    <label for="first_name" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="first_name" name="first_name" value={data.zookeeper.first_name} required>
                </div>

                <div class="mb-3">
                    <label for="last_name" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="last_name" name="last_name" value={data.zookeeper.last_name} required>
                </div>

                <div class="mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <select class="form-select" id="gender" name="gender" required>
                        <option value="">Select gender...</option>
                        <option value="Male" selected={data.zookeeper.gender === 'Male'}>Male</option>
                        <option value="Female" selected={data.zookeeper.gender === 'Female'}>Female</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="hire_date" class="form-label">Hire Date</label>
                    <input 
                        type="date" 
                        class="form-control" 
                        id="hire_date" 
                        name="hire_date" 
                        value={formatDateForInput(data.zookeeper.hire_date)}
                        required
                    >
                </div>

                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <a href="/zookeepers/{data.zookeeper._id}" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div> 