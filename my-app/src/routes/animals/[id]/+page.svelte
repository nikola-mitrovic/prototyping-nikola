<!-- Animal Detail View -->
<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    export let data;
    const { animal, assignedZookeepers, availableZookeepers } = data;

    let showDeleteModal = false;
    let deleteError = '';
    let selectedZookeeperId = '';

    async function handleDelete() {
        try {
            const response = await fetch(`/animals/${animal._id}/delete`, {
                method: 'DELETE'
            });

            const result = await response.json();
            
            if (response.ok) {
                await goto('/animals');
            } else {
                deleteError = result.error;
                showDeleteModal = false;
            }
        } catch (error) {
            deleteError = 'Failed to delete animal. Please try again.';
            showDeleteModal = false;
        }
    }

    async function handleAssignZookeeper() {
        if (!selectedZookeeperId) return;

        try {
            const response = await fetch(`/animals/${animal._id}/assign-zookeeper`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ zookeeper_id: selectedZookeeperId })
            });

            if (response.ok) {
                // Refresh the page to show updated assignments
                window.location.reload();
            } else {
                const result = await response.json();
                alert(result.error || 'Failed to assign zookeeper');
            }
        } catch (error) {
            alert('Failed to assign zookeeper. Please try again.');
        }
    }

    async function handleRemoveZookeeper(zookeeperId) {
        if (!confirm('Are you sure you want to remove this zookeeper?')) return;

        try {
            const response = await fetch(`/animals/${animal._id}/remove-zookeeper`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ zookeeper_id: zookeeperId })
            });

            if (response.ok) {
                // Refresh the page to show updated assignments
                window.location.reload();
            } else {
                const result = await response.json();
                alert(result.error || 'Failed to remove zookeeper');
            }
        } catch (error) {
            alert('Failed to remove zookeeper. Please try again.');
        }
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

    {#if deleteError}
        <div class="alert alert-danger mb-4">
            <p class="mb-0">{deleteError}</p>
        </div>
    {/if}

    <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
            <h1>{animal.nickname} the {animal.name}</h1>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-danger" on:click={() => showDeleteModal = true}>
                    <i class="bi bi-trash"></i> Delete Animal
                </button>
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
        <!-- Animal Information -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Animal Information</h5>
                </div>
                <div class="card-body">
                    <dl class="row">
                        <dt class="col-sm-4">Species</dt>
                        <dd class="col-sm-8">{animal.name}</dd>

                        <dt class="col-sm-4">Nickname</dt>
                        <dd class="col-sm-8">{animal.nickname}</dd>

                        <dt class="col-sm-4">Age</dt>
                        <dd class="col-sm-8">{animal.age} years</dd>

                        <dt class="col-sm-4">Gender</dt>
                        <dd class="col-sm-8">{animal.gender}</dd>

                        <dt class="col-sm-4">Diet</dt>
                        <dd class="col-sm-8">{animal.diet}</dd>

                        <dt class="col-sm-4">Arrival Date</dt>
                        <dd class="col-sm-8">{animal.arrival_date}</dd>

                        <dt class="col-sm-4">ID</dt>
                        <dd class="col-sm-8">{animal._id}</dd>
                    </dl>
                </div>
            </div>
        </div>

        <!-- Assigned Zookeepers -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Assigned Zookeepers</h5>
                    {#if availableZookeepers.length > 0}
                        <div class="input-group" style="max-width: 300px;">
                            <select 
                                class="form-select" 
                                bind:value={selectedZookeeperId}
                                aria-label="Select zookeeper">
                                <option value="">Select a zookeeper...</option>
                                {#each availableZookeepers as zookeeper}
                                    <option value={zookeeper._id}>
                                        {zookeeper.first_name} {zookeeper.last_name}
                                    </option>
                                {/each}
                            </select>
                            <button 
                                class="btn btn-outline-primary" 
                                on:click={handleAssignZookeeper}
                                disabled={!selectedZookeeperId}>
                                <i class="bi bi-plus-circle"></i> Assign
                            </button>
                        </div>
                    {/if}
                </div>
                <div class="card-body">
                    {#if assignedZookeepers.length === 0}
                        <div class="alert alert-info mb-0">
                            <span>No zookeepers currently assigned to this animal.</span>
                        </div>
                    {:else}
                        <div class="list-group">
                            {#each assignedZookeepers as zookeeper}
                                <div class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="mb-1">{zookeeper.first_name} {zookeeper.last_name}</h6>
                                        <small class="text-muted">
                                            {zookeeper.gender} • Hired: {zookeeper.hire_date}
                                        </small>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="/zookeepers/{zookeeper._id}" class="btn btn-outline-primary btn-sm">
                                            View
                                        </a>
                                        <button 
                                            class="btn btn-outline-danger btn-sm"
                                            on:click={() => handleRemoveZookeeper(zookeeper._id)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteModal}
    <div class="modal show" tabindex="-1">
        <div class="modal-backdrop show"></div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete Animal</h5>
                    <button type="button" class="btn-close" on:click={() => showDeleteModal = false} aria-label="Close modal"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Are you sure you want to delete {animal.nickname} the {animal.name}? This action cannot be undone.
                        {#if assignedZookeepers.length > 0}
                            <br><br>
                            <strong>Warning:</strong> This animal has {assignedZookeepers.length} assigned zookeeper{assignedZookeepers.length === 1 ? '' : 's'}. 
                            Deleting this animal will remove these assignments.
                        {/if}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" on:click={() => showDeleteModal = false}>Cancel</button>
                    <button type="button" class="btn btn-danger" on:click={handleDelete}>
                        <i class="bi bi-trash"></i> Delete Animal
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
    :global(body) {
        background-color: #f8f9fa;
    }

    .card {
        background-color: white;
    }

    :global(.modal.show) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1050;
    }

    :global(.modal-backdrop.show) {
        opacity: 0.5;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        z-index: 1040;
    }

    :global(.modal-dialog) {
        position: relative;
        z-index: 1060;
        margin: 1.75rem auto;
    }
</style> 