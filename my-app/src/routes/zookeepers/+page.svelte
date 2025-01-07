<!-- Zookeepers List Page -->
<script>
    export let data;
    let searchQuery = '';
    
    console.log('Zookeepers data:', data.zookeepers);
    
    $: filteredZookeepers = data.zookeepers
        ? data.zookeepers.filter(zookeeper => 
            (zookeeper.first_name + ' ' + zookeeper.last_name)
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
        : [];
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</svelte:head>

<!-- Header Section -->
<div class="d-flex justify-content-between align-items-center mb-4">
    <div>
        <h1 class="h2 fw-semibold mb-1">Zookeepers</h1>
        <p class="text-muted mb-0">Manage and monitor all zookeepers in the zoo</p>
    </div>
    <a href="/zookeepers/create" class="btn btn-primary rounded-3 d-flex align-items-center gap-2">
        <i class="bi bi-plus-lg"></i>
        Add New Zookeeper
    </a>
</div>

<!-- Statistics Cards -->
<div class="row g-4 mb-4">
    <div class="col-md-4">
        <div class="card border-0 rounded-4 shadow-sm">
            <div class="card-body p-4">
                <h6 class="text-muted mb-2">Total Zookeepers</h6>
                <h2 class="h1 fw-bold mb-0">{data.zookeepers.length}</h2>
            </div>
        </div>
    </div>
</div>

<!-- Search Section -->
<div class="d-flex gap-3 mb-4">
    <div class="flex-grow-1 position-relative">
        <i class="bi bi-search position-absolute translate-middle-y text-muted search-icon"></i>
        <input
            type="text"
            class="form-control ps-5 rounded-3"
            placeholder="Search zookeepers..."
            bind:value={searchQuery}
        >
    </div>
</div>

<!-- Table Section -->
<div class="card border-0 rounded-4 shadow-sm mb-5">
    <div class="table-responsive">
        <table class="table align-middle mb-0">
            <thead>
                <tr>
                    <th class="ps-4">Name</th>
                    <th>Hire Date</th>
                    <th class="text-end pe-4">Details</th>
                </tr>
            </thead>
            <tbody>
                {#if filteredZookeepers.length === 0}
                    <tr>
                        <td colspan="3" class="text-center py-4 text-muted">
                            No zookeepers found matching your search criteria
                        </td>
                    </tr>
                {:else}
                    {#each filteredZookeepers as zookeeper}
                        <tr>
                            <td class="fw-medium ps-4">{zookeeper.first_name} {zookeeper.last_name}</td>
                            <td>{zookeeper.hire_date}</td>
                            <td class="text-end pe-4">
                                <a 
                                    href="/zookeepers/{zookeeper._id}" 
                                    class="text-secondary text-decoration-none"
                                    aria-label="View details for {zookeeper.first_name} {zookeeper.last_name}"
                                >
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

    .form-control {
        border-color: #e9ecef;
        padding: 0.625rem 1rem;
    }
    
    .form-control:focus {
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