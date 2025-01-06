<!-- Zookeeper Detail View -->
<script>
    export let data;
    const { zookeeper, assignedAnimal } = data;
</script>

<div class="container mt-4">
    <div class="mb-4">
        <div class="d-flex justify-content-between align-items-center">
            <h1>{zookeeper.first_name} {zookeeper.last_name}</h1>
            <a href="/zookeepers" class="btn btn-secondary">Back to Zookeepers</a>
        </div>
    </div>

    <div class="row">
        <!-- Zookeeper Details Card -->
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

        <!-- Assigned Animal Card -->
        <div class="col-md-6 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Assigned Animal</h5>
                </div>
                <div class="card-body">
                    {#if assignedAnimal}
                        <div class="text-center mb-3">
                            <img 
                                src={assignedAnimal.image} 
                                alt={assignedAnimal.name}
                                class="img-fluid rounded"
                                style="max-height: 200px;"
                            >
                        </div>
                        <dl class="row">
                            <dt class="col-sm-4">Name</dt>
                            <dd class="col-sm-8">{assignedAnimal.name}</dd>

                            <dt class="col-sm-4">Nickname</dt>
                            <dd class="col-sm-8">{assignedAnimal.nickname}</dd>

                            <dt class="col-sm-4">Age</dt>
                            <dd class="col-sm-8">{assignedAnimal.age} years</dd>

                            <dt class="col-sm-4">Diet</dt>
                            <dd class="col-sm-8">{assignedAnimal.diet}</dd>

                            <dt class="col-sm-4">Gender</dt>
                            <dd class="col-sm-8">{assignedAnimal.gender}</dd>
                        </dl>
                        <a href="/animals/{assignedAnimal._id}" class="btn btn-primary btn-sm">View Animal Details</a>
                    {:else}
                        <div class="alert alert-info mb-0">
                            No animal currently assigned to this keeper.
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div> 