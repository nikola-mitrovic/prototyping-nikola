<!-- Zookeepers List Page -->
<script>
    export let data;
</script>

<div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Zoo Keepers</h1>
        <a href="/zookeepers/create" class="btn btn-primary">Add New Keeper</a>
    </div>

    {#if data.zookeepers && data.zookeepers.length > 0}
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {#each data.zookeepers as keeper}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">{keeper.first_name} {keeper.last_name}</h5>
                            <p class="card-text">
                                <strong>Gender:</strong> {keeper.gender}<br>
                                <strong>Hire Date:</strong> {keeper.hire_date}<br>
                                <strong>Assigned Animal ID:</strong> {keeper.animal_id || 'None assigned'}
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="alert alert-info">
            No zookeepers found. Add some keepers to get started!
        </div>
    {/if}
</div> 