<script>
    import TimelineChart from '$lib/components/TimelineChart.svelte';
    export let data;
    
    // Format the counts for display
    $: animalCount = data?.animals?.length || 0;
    $: zookeeperCount = data?.zookeepers?.length || 0;
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<div class="container py-4">
    <div class="mb-4">
        <h1 class="display-4">Welcome to Zoo Manager</h1>
        <p class="lead text-muted">Manage your zoo's operations efficiently</p>
    </div>

    <div class="row g-4">
        <!-- Total Animals Card -->
        <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-primary bg-opacity-10 p-3 rounded">
                            <i class="fa fa-paw fs-4 text-primary" aria-hidden="true"></i>
                        </div>
                    </div>
                    <h3 class="fs-1 fw-bold mb-2">{animalCount}</h3>
                    <p class="text-muted mb-0">Total Animals</p>
                </div>
            </div>
        </div>

        <!-- Active Zookeepers Card -->
        <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="bg-success bg-opacity-10 p-3 rounded">
                            <i class="bi bi-person-badge fs-4 text-success"></i>
                        </div>
                    </div>
                    <h3 class="fs-1 fw-bold mb-2">{zookeeperCount}</h3>
                    <p class="text-muted mb-0">Active Zookeepers</p>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-6">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Quick Actions</h5>
                    <div class="list-group list-group-flush">
                        <a href="/animals/create" class="list-group-item list-group-item-action d-flex align-items-center">
                            <i class="bi bi-plus-circle me-2"></i>
                            Add New Animal
                            <i class="bi bi-chevron-right ms-auto"></i>
                        </a>
                        <a href="/zookeepers/create" class="list-group-item list-group-item-action d-flex align-items-center">
                            <i class="bi bi-person-plus me-2"></i>
                            Add New Zookeeper
                            <i class="bi bi-chevron-right ms-auto"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Growth Timeline</h5>
                    <TimelineChart 
                        animalData={data.animals} 
                        zookeeperData={data.zookeepers}
                    />
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        transition: transform 0.2s;
    }
    .card:hover {
        transform: translateY(-5px);
    }
    .list-group-item {
        border: none;
        padding: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 0.5rem !important;
    }
    .list-group-item:hover {
        background-color: var(--bs-light);
    }
</style>
