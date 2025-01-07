<!-- Animals List Page -->
<script>
    export let data;
    let searchQuery = '';
    let selectedGender = 'all';
    
    $: filteredAnimals = data.animals
        .filter(animal => 
            animal.nickname.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedGender === 'all' || animal.gender === selectedGender)
        );
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</svelte:head>

<!-- Header Section -->
<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h1 class="h2 fw-semibold mb-1">Zoo Animals</h1>
        <p class="text-muted mb-0">Manage and monitor all animals in the zoo</p>
    </div>
    <a href="/animals/create" class="btn btn-primary rounded-3 d-flex align-items-center gap-2">
        <i class="bi bi-plus-lg"></i>
        Add New Animal
    </a>
</div>

<!-- Statistics Cards -->
<div class="row g-4 mb-4">
    <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm">
            <div class="card-body p-4">
                <h6 class="text-muted mb-2">Total Animals</h6>
                <h2 class="h1 fw-bold mb-0">{data.animals.length}</h2>
            </div>
        </div>
    </div>
</div>

<!-- Search and Filter Section -->
<div class="d-flex gap-3 mb-4">
    <div class="flex-grow-1 position-relative">
        <i class="bi bi-search position-absolute translate-middle-y text-muted search-icon"></i>
        <input
            type="text"
            class="form-control ps-5 rounded-3"
            placeholder="Search animals..."
            bind:value={searchQuery}
        >
    </div>
    <select 
        class="form-select rounded-3" 
        style="width: auto; min-width: 150px;"
        bind:value={selectedGender}
    >
        <option value="all">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
</div>

<!-- Table Section -->
<div class="card border-0 rounded-4 shadow-sm">
    <div class="table-responsive">
        <table class="table align-middle mb-0">
            <thead>
                <tr>
                    <th class="ps-4">Name</th>
                    <th>Species</th>
                    <th>Age</th>
                    <th>Diet</th>
                    <th>Gender</th>
                    <th>Arrived</th>
                    <th class="text-end pe-4">Details</th>
                </tr>
            </thead>
            <tbody>
                {#if filteredAnimals.length === 0}
                    <tr>
                        <td colspan="7" class="text-center py-4 text-muted">
                            No animals found matching your search criteria
                        </td>
                    </tr>
                {:else}
                    {#each filteredAnimals as animal}
                        <tr>
                            <td class="fw-medium ps-4">{animal.nickname}</td>
                            <td>{animal.name}</td>
                            <td>{animal.age} years</td>
                            <td>{animal.diet}</td>
                            <td>{animal.gender}</td>
                            <td>{animal.arrival_date}</td>
                            <td class="text-end pe-4">
                                <a href="/animals/{animal._id}" class="text-secondary text-decoration-none">
                                    <i class="bi bi-eye"></i>
                                </a>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>

<style>
    :global(body) {
        background-color: #f8f9fa;
    }

    .btn-primary {
        background-color: #4361ee;
        border: none;
        padding: 0.625rem 1.25rem;
    }
    
    .btn-primary:hover {
        background-color: #3a53d0;
    }

    .btn-light {
        background-color: #f8f9fa;
        border: 1px solid #e9ecef;
        color: #495057;
    }

    .btn-light:hover {
        background-color: #e9ecef;
        border-color: #dee2e6;
        color: #212529;
    }
    
    .table th {
        font-weight: 600;
        color: #6c757d;
        border-bottom-width: 1px;
        padding: 1rem;
        background-color: #f8f9fa;
        font-size: 0.875rem;
    }
    
    .table td {
        padding: 1rem;
        border-bottom-color: #f1f3f5;
    }

    .table tbody tr:hover {
        background-color: #f8f9fa;
    }

    .form-control, .form-select {
        border-color: #e9ecef;
        padding: 0.625rem 1rem;
    }
    
    .form-control:focus, .form-select:focus {
        border-color: #4361ee;
        box-shadow: 0 0 0 0.25rem rgba(67, 97, 238, 0.1);
    }

    .card {
        background-color: white;
    }

    .table tbody tr:last-child td {
        border-bottom: none;
    }

    h1 {
        color: #1a1e24;
    }

    .text-secondary {
        color: #6c757d !important;
    }
    
    .text-secondary:hover {
        color: #4361ee !important;
    }

    .search-icon {
        left: 1.25rem;
        top: 50%;
        font-size: 0.875rem;
    }
</style> 