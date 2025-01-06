<!-- Zookeepers List Page -->
<script>
    export let data;
</script>

<div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Zookeepers</h1>
        <a href="/zookeepers/create" class="btn btn-primary">Add New Zookeeper</a>
    </div>

    {#if data.zookeepers && data.zookeepers.length > 0}
        <div class="row g-4">
            {#each data.zookeepers as zookeeper}
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">{zookeeper.first_name} {zookeeper.last_name}</h5>
                            <p class="card-text">
                                <strong>Gender:</strong> {zookeeper.gender}<br>
                                <strong>Hire Date:</strong> {zookeeper.hire_date}<br>
                                <strong>Assigned Animal ID:</strong> {zookeeper.animal_id || 'None assigned'}
                            </p>
                            <a href="/zookeepers/{zookeeper._id}" class="btn btn-primary btn-sm">View Details</a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="alert alert-info">
            No zookeepers found. Add some zookeepers to get started!
        </div>
    {/if}
</div> 