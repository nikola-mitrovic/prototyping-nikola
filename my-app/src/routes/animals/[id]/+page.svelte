<!-- Animal Detail View -->
<script>
    import { page } from '$app/stores';
    export let data;
    const { animal, assignedZookeepers, zookeeperError } = data;
</script>

<div class="container mt-4">
    <!-- Error Alert -->
    {#if $page.error}
        <div class="alert alert-danger mb-4">
            <h4 class="alert-heading">Error</h4>
            <p class="mb-0">{$page.error.message}</p>
        </div>
    {/if}

    <!-- Zookeeper Load Error Warning -->
    {#if zookeeperError}
        <div class="alert alert-warning mb-4">
            <p class="mb-0">
                Unable to load zookeeper information. The data might be temporarily unavailable.
            </p>
        </div>
    {/if}

    <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h1>{animal.nickname}</h1>
                <p class="text-muted mb-0">{animal.name}</p>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-primary" disabled>
                    <i class="bi bi-pencil"></i> Edit Animal
                </button>
                <a href="/animals" class="btn btn-secondary">
                    <i class="bi bi-arrow-left"></i> Back to Animals
                </a>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Image Section -->
        <div class="col-md-4 mb-4">
            <div class="card">
                <div class="card-body text-center">
                    {#if animal.image}
                        <img 
                            src={animal.image} 
                            alt={animal.name}
                            class="img-fluid rounded"
                            style="max-height: 300px; object-fit: cover;"
                        >
                    {:else}
                        <div class="alert alert-info mb-0">
                            No image available
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Information Section -->
        <div class="col-md-8 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Animal Information</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <!-- Basic Information -->
                        <div class="col-md-6">
                            <h6 class="border-bottom pb-2 mb-3">Basic Details</h6>
                            <dl>
                                <dt>Species</dt>
                                <dd>{animal.name}</dd>

                                <dt>Nickname</dt>
                                <dd>{animal.nickname}</dd>

                                <dt>Age</dt>
                                <dd>{animal.age} years</dd>

                                <dt>Gender</dt>
                                <dd>{animal.gender}</dd>
                            </dl>
                        </div>

                        <!-- Care Information -->
                        <div class="col-md-6">
                            <h6 class="border-bottom pb-2 mb-3">Care Details</h6>
                            <dl>
                                <dt>Diet</dt>
                                <dd>{animal.diet}</dd>

                                <dt>Arrival Date</dt>
                                <dd>{animal.arrival_date || 'Not specified'}</dd>

                                <dt>ID Number</dt>
                                <dd><small class="text-muted">{animal._id}</small></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Assigned Zookeepers Section -->
        <div class="col-12 mb-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Assigned Zookeepers</h5>
                    <button class="btn btn-outline-primary btn-sm" disabled>
                        <i class="bi bi-person-plus-fill"></i> Add Keeper
                    </button>
                </div>
                <div class="card-body">
                    {#if assignedZookeepers && assignedZookeepers.length > 0}
                        <div class="row g-3">
                            {#each assignedZookeepers as keeper}
                                <div class="col-12">
                                    <div class="border rounded p-3">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-1">{keeper.first_name} {keeper.last_name}</h6>
                                                <p class="text-muted mb-0">
                                                    <small>
                                                        {keeper.gender} • Hired: {keeper.hire_date}
                                                    </small>
                                                </p>
                                            </div>
                                            <div>
                                                <a href="/zookeepers/{keeper._id}" class="btn btn-primary btn-sm">
                                                    <i class="bi bi-person-badge"></i> View Details
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="alert alert-info mb-0 d-flex justify-content-between align-items-center">
                            <span>No zookeepers currently assigned to this animal.</span>
                            <button class="btn btn-outline-primary btn-sm" disabled>
                                <i class="bi bi-person-plus-fill"></i> Assign First Keeper
                            </button>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Add Bootstrap Icons -->
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</svelte:head> 