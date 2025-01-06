<!-- Animals List Page -->
<script>
    export let data;
</script>

<div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Zoo Animals</h1>
        <a href="/animals/create" class="btn btn-primary">Add New Animal</a>
    </div>

    {#if data.animals && data.animals.length > 0}
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {#each data.animals as animal}
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">{animal.nickname}</h5>
                            <p class="card-text">
                                <strong>Species:</strong> {animal.name}<br>
                                <strong>Age:</strong> {animal.age} years<br>
                                <strong>Diet:</strong> {animal.diet}<br>
                                <strong>Gender:</strong> {animal.gender}<br>
                                <strong>Arrived:</strong> {animal.arrival_date}
                            </p>
                            <a href="/animals/{animal._id}" class="btn btn-primary btn-sm">View Details</a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="alert alert-info">
            No animals found. Add some animals to get started!
        </div>
    {/if}
</div> 