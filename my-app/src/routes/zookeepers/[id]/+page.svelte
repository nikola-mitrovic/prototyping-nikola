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

    <div class="mb-4">
        <h1>{zookeeper.first_name} {zookeeper.last_name}</h1>
        <a href="/zookeepers" class="btn btn-secondary">Back to Zookeepers</a>
    </div>

    <div class="row">
        <!-- Zookeeper Information -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Zookeeper Information</h5>
                </div>
                <div class="card-body">
                    <dl class="row">
                        <dt class="col-sm-4">Name</dt>
                        <dd class="col-sm-8">{zookeeper.first_name} {zookeeper.last_name}</dd>

                        <dt class="col-sm-4">Gender</dt>
                        <dd class="col-sm-8">{zookeeper.gender}</dd>

                        <dt class="col-sm-4">Hire Date</dt>
                        <dd class="col-sm-8">{zookeeper.hire_date}</dd>

                        <dt class="col-sm-4">ID</dt>
                        <dd class="col-sm-8">{zookeeper._id}</dd>
                    </dl>
                </div>
            </div>
        </div>

        <!-- Assigned Animal -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Assigned Animal</h5>
                </div>
                <div class="card-body">
                    {#if animalError}
                        <div class="alert alert-warning">
                            Unable to load animal information. The data might be temporarily unavailable.
                        </div>
                    {:else if assignedAnimal}
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 class="mb-1">{assignedAnimal.nickname}</h6>
                                <p class="text-muted mb-2">{assignedAnimal.name}</p>
                                <p class="mb-0">
                                    <small>
                                        {assignedAnimal.gender} • {assignedAnimal.age} years old
                                    </small>
                                </p>
                            </div>
                            <a href="/animals/{assignedAnimal._id}" class="btn btn-primary btn-sm">
                                View Animal
                            </a>
                        </div>
                    {:else}
                        <div class="alert alert-info mb-0">
                            <span>No animal currently assigned to this zookeeper.</span>
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