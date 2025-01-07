<!-- Zookeeper Detail View -->
<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    export let data;
    const { zookeeper, assignedAnimals, availableAnimals } = data;

    let showDeleteModal = false;
    let deleteError = '';
    let selectedAnimalId = '';

    async function handleDelete() {
        try {
            const response = await fetch(`/zookeepers/${zookeeper._id}/delete`, {
                method: 'DELETE'
            });

            const result = await response.json();
            
            if (response.ok) {
                await goto('/zookeepers');
            } else {
                deleteError = result.error;
                showDeleteModal = false;
            }
        } catch (error) {
            deleteError = 'Failed to delete zookeeper. Please try again.';
            showDeleteModal = false;
        }
    }

    async function handleAssignAnimal() {
        if (!selectedAnimalId) return;

        try {
            const response = await fetch(`/zookeepers/${zookeeper._id}/assign-animal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ animal_id: selectedAnimalId })
            });

            if (response.ok) {
                // Refresh the page to show updated assignments
                window.location.reload();
            } else {
                const result = await response.json();
                alert(result.error || 'Failed to assign animal');
            }
        } catch (error) {
            alert('Failed to assign animal. Please try again.');
        }
    }

    async function handleRemoveAnimal(animalId) {
        if (!confirm('Are you sure you want to remove this animal?')) return;

        try {
            const response = await fetch(`/zookeepers/${zookeeper._id}/remove-animal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ animal_id: animalId })
            });

            if (response.ok) {
                // Refresh the page to show updated assignments
                window.location.reload();
            } else {
                const result = await response.json();
                alert(result.error || 'Failed to remove animal');
            }
        } catch (error) {
            alert('Failed to remove animal. Please try again.');
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
            <h1>{zookeeper.first_name} {zookeeper.last_name}</h1>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-danger" on:click={() => showDeleteModal = true}>
                    <i class="bi bi-trash"></i> Delete Zookeeper
                </button>
                <a href="/zookeepers/{zookeeper._id}/edit" class="btn btn-outline-primary">
                    <i class="bi bi-pencil"></i> Edit Zookeeper
                </a>
                <a href="/zookeepers" class="btn btn-secondary">
                    <i class="bi bi-arrow-left"></i> Back to Zookeepers
                </a>
            </div>
        </div>
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

        <!-- Assigned Animals -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Assigned Animals</h5>
                    {#if availableAnimals.length > 0}
                        <div class="input-group" style="max-width: 300px;">
                            <select 
                                class="form-select" 
                                bind:value={selectedAnimalId}
                                aria-label="Select animal">
                                <option value="">Select an animal...</option>
                                {#each availableAnimals as animal}
                                    <option value={animal._id}>
                                        {animal.nickname} the {animal.name}
                                    </option>
                                {/each}
                            </select>
                            <button 
                                class="btn btn-outline-primary" 
                                on:click={handleAssignAnimal}
                                disabled={!selectedAnimalId}>
                                <i class="bi bi-plus-circle"></i> Assign
                            </button>
                        </div>
                    {/if}
                </div>
                <div class="card-body">
                    {#if assignedAnimals.length === 0}
                        <div class="alert alert-info mb-0">
                            <span>No animals currently assigned to this zookeeper.</span>
                        </div>
                    {:else}
                        <div class="list-group">
                            {#each assignedAnimals as animal}
                                <div class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="mb-1">{animal.nickname} the {animal.name}</h6>
                                        <small class="text-muted">
                                            {animal.gender} • {animal.age} years old • {animal.diet}
                                        </small>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <a href="/animals/{animal._id}" class="btn btn-outline-primary btn-sm">
                                            View
                                        </a>
                                        <button 
                                            class="btn btn-outline-danger btn-sm"
                                            on:click={() => handleRemoveAnimal(animal._id)}>
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
                    <h5 class="modal-title">Delete Zookeeper</h5>
                    <button type="button" class="btn-close" on:click={() => showDeleteModal = false} aria-label="Close modal"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-warning">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Are you sure you want to delete {zookeeper.first_name} {zookeeper.last_name}? This action cannot be undone.
                        {#if assignedAnimals.length > 0}
                            <br><br>
                            <strong>Warning:</strong> This zookeeper is currently assigned to {assignedAnimals.length} animal{assignedAnimals.length === 1 ? '' : 's'}. 
                            Deleting this zookeeper will remove these assignments.
                        {/if}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" on:click={() => showDeleteModal = false}>Cancel</button>
                    <button type="button" class="btn btn-danger" on:click={handleDelete}>
                        <i class="bi bi-trash"></i> Delete Zookeeper
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