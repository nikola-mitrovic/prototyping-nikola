<!-- Zookeepers List Page -->
<script>
    export let data;
</script>

<h1 class="page-title">Zookeepers</h1>

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
    {#if data.zookeepers && data.zookeepers.length > 0}
        {#each data.zookeepers as zookeeper}
            <div class="col">
                <div class="card h-100 border-0 rounded-4 shadow-sm bg-white">
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold text-dark mb-3">
                            {zookeeper.first_name} {zookeeper.last_name}
                        </h5>
                        <p class="card-text text-secondary mb-3">
                            <i class="bi bi-calendar me-2"></i>
                            Hired: {zookeeper.hire_date}
                        </p>
                        <a href="/zookeepers/{zookeeper._id}" class="btn btn-outline-primary rounded-3">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <div class="col-12">
            <div class="alert alert-info">
                No zookeepers found. Add some zookeepers to get started!
            </div>
        </div>
    {/if}
</div>

<div class="mt-4">
    <a href="/zookeepers/create" class="btn btn-primary rounded-3">
        <i class="bi bi-plus-circle me-2"></i>
        Add New Zookeeper
    </a>
</div>

<style>
    .card {
        transition: transform 0.2s;
    }
    .card:hover {
        transform: translateY(-5px);
    }
</style> 