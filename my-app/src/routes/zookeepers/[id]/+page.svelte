<!-- Zookeeper Detail View -->
<script>
    import { page } from '$app/stores';
    export let data;
    const { zookeeper, assignedAnimal, animalError } = data;
</script>

<div class="container mt-4">
    <!-- Error Alert -->
    {#if $page.error}
        <div class="alert alert-danger mb-4">
            <h4 class="alert-heading">Error</h4>
            <p class="mb-0">{$page.error.message}</p>
        </div>
    {/if}

    <!-- Animal Load Error Warning -->
    {#if animalError}
        <div class="alert alert-warning mb-4">
            <p class="mb-0">
                Unable to load animal information. The data might be temporarily unavailable.
            </p>
        </div>
    {/if}

    <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
            <h1>{zookeeper.first_name} {zookeeper.last_name}</h1>
            <a href="/zookeepers" class="btn btn-secondary">Back to Zookeepers</a>
        </div>
    </div>

    <div class="row">
        <!-- Keeper Information -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Keeper Information</h5>
                </div>
                <div class="card-body">
                    <dl class="row">
                        <dt class="col-sm-4">Full Name</dt>
                        <dd class="col-sm-8">{zookeeper.first_name} {zookeeper.last_name}</dd>

                        <dt class="col-sm-4">Gender</dt>
                        <dd class="col-sm-8">{zookeeper.gender}</dd>

                        <dt class="col-sm-4">Hire Date</dt>
                        <dd class="col-sm-8">{zookeeper.hire_date}</dd>

                        <dt class="col-sm-4">Employee ID</dt>
                        <dd class="col-sm-8">{zookeeper._id}</dd>
                    </dl>
                </div>
            </div>
        </div>

        <!-- Assigned Animal -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Assigned Animal</h5>
                    <button class="btn btn-outline-primary btn-sm" disabled>
                        <i class="bi bi-arrow-left-right"></i> Change Assignment
                    </button>
                </div>
                <div class="card-body">
                    {#if assignedAnimal}
                        <div class="text-center mb-3">
                            {#if assignedAnimal.image}
                                <img 
                                    src={assignedAnimal.image} 
                                    alt={assignedAnimal.name}
                                    class="img-fluid rounded"
                                    style="max-height: 200px; object-fit: cover;"
                                >
                            {/if}
                        </div>
                        <dl class="row mb-3">
                            <dt class="col-sm-4">Species</dt>
                            <dd class="col-sm-8">{assignedAnimal.name}</dd>

                            <dt class="col-sm-4">Nickname</dt>
                            <dd class="col-sm-8">{assignedAnimal.nickname}</dd>

                            <dt class="col-sm-4">Age</dt>
                            <dd class="col-sm-8">{assignedAnimal.age} years</dd>

                            <dt class="col-sm-4">Gender</dt>
                            <dd class="col-sm-8">{assignedAnimal.gender}</dd>

                            <dt class="col-sm-4">Diet</dt>
                            <dd class="col-sm-8">{assignedAnimal.diet}</dd>
                        </dl>
                        <div class="text-end">
                            <a href="/animals/{assignedAnimal._id}" class="btn btn-primary btn-sm">
                                <i class="bi bi-eye"></i> View Animal Details
                            </a>
                        </div>
                    {:else}
                        <div class="alert alert-info mb-0 d-flex justify-content-between align-items-center">
                            <span>No animal currently assigned to this keeper.</span>
                            <button class="btn btn-outline-primary btn-sm" disabled>
                                <i class="bi bi-plus-circle"></i> Assign Animal
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