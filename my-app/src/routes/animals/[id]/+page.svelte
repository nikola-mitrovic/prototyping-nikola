<!-- Animal Detail View -->
<script>
    import { page } from '$app/stores';
    export let data;
    const { animal, assignedZookeepers, availableZookeepers, zookeeperError } = data;

    let showModal = false;
    let selectedZookeeperId = '';
    let assignmentError = '';

    // Add debug logging
    console.log('Available zookeepers:', availableZookeepers);
    console.log('Button should be disabled:', !availableZookeepers || availableZookeepers.length === 0);

    async function handleAssignZookeeper() {
        console.log('Assigning zookeeper:', selectedZookeeperId, 'to animal:', animal._id);
        try {
            const response = await fetch(`/animals/${animal._id}/assign-zookeeper`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ zookeeper_id: selectedZookeeperId })
            });

            const result = await response.json();
            
            if (response.ok) {
                console.log('Assignment successful');
                // Reload the page to show updated assignments
                window.location.reload();
            } else {
                console.error('Assignment failed:', result.error);
                assignmentError = result.error;
            }
        } catch (error) {
            console.error('Error assigning zookeeper:', error);
            assignmentError = 'Failed to assign zookeeper. Please try again.';
        }
    }

    async function handleRemoveZookeeper(zookeeperId) {
        console.log('Removing zookeeper:', zookeeperId, 'from animal:', animal._id);
        try {
            const response = await fetch(`/animals/${animal._id}/remove-zookeeper`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ zookeeper_id: zookeeperId })
            });

            const result = await response.json();
            
            if (response.ok) {
                console.log('Removal successful');
                window.location.reload();
            } else {
                console.error('Removal failed:', result.error);
                assignmentError = result.error;
            }
        } catch (error) {
            console.error('Error removing zookeeper:', error);
            assignmentError = 'Failed to remove zookeeper. Please try again.';
        }
    }

    function handleSelectZookeeper(event) {
        selectedZookeeperId = event.target.value;
    }
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
                <a href="/animals/{animal._id}/edit" class="btn btn-outline-primary">
                    <i class="bi bi-pencil"></i> Edit Animal
                </a>
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
                    <button class="btn btn-outline-primary btn-sm" 
                            on:click={() => showModal = true}
                            disabled={!availableZookeepers || availableZookeepers.length === 0}
                            aria-label="Add new zookeeper">
                        <i class="bi bi-person-plus-fill"></i> Add Zookeeper
                    </button>
                </div>
                <div class="card-body">
                    {#if assignedZookeepers && assignedZookeepers.length > 0}
                        <div class="row g-3">
                            {#each assignedZookeepers as zookeeper}
                                <div class="col-12">
                                    <div class="border rounded p-3">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-1">{zookeeper.first_name} {zookeeper.last_name}</h6>
                                                <p class="text-muted mb-0">
                                                    <small>
                                                        {zookeeper.gender} • Hired: {zookeeper.hire_date}
                                                    </small>
                                                </p>
                                            </div>
                                            <div>
                                                <button class="btn btn-danger btn-sm me-2" 
                                                        on:click={() => handleRemoveZookeeper(zookeeper._id)}
                                                        aria-label="Remove zookeeper">
                                                    <i class="bi bi-x-circle"></i>
                                                </button>
                                                <a href="/zookeepers/{zookeeper._id}" class="btn btn-primary btn-sm">
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
                            <button class="btn btn-outline-primary btn-sm" 
                                    on:click={() => showModal = true}
                                    disabled={!availableZookeepers || availableZookeepers.length === 0}
                                    aria-label="Assign first zookeeper">
                                <i class="bi bi-person-plus-fill"></i> Assign First Zookeeper
                            </button>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Add Zookeeper Modal -->
{#if showModal}
    <div class="modal show d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Assign Zookeeper to {animal.nickname}</h5>
                    <button type="button" class="btn-close" on:click={() => showModal = false} aria-label="Close modal"></button>
                </div>
                <div class="modal-body">
                    {#if assignmentError}
                        <div class="alert alert-danger">
                            {assignmentError}
                        </div>
                    {/if}
                    
                    {#if availableZookeepers.length === 0}
                        <div class="alert alert-info">
                            No available zookeepers. All zookeepers are currently assigned to animals.
                        </div>
                    {:else}
                        <div class="mb-3">
                            <label for="zookeeper" class="form-label">Select Zookeeper</label>
                            <select id="zookeeper" class="form-select" on:change={handleSelectZookeeper}>
                                <option value="">Choose a zookeeper...</option>
                                {#each availableZookeepers as zookeeper}
                                    <option value={zookeeper._id}>
                                        {zookeeper.first_name} {zookeeper.last_name} ({zookeeper.gender})
                                    </option>
                                {/each}
                            </select>
                        </div>
                    {/if}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" on:click={() => showModal = false}>Cancel</button>
                    <button type="button" 
                            class="btn btn-primary" 
                            disabled={!selectedZookeeperId}
                            on:click={handleAssignZookeeper}>
                        Assign Zookeeper
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<!-- Add Bootstrap Icons -->
<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</svelte:head>

<style>
    :global(.modal.show) {
        background-color: rgba(0,0,0,0.5);
    }
</style> 