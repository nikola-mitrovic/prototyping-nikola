<script>
    let result = '';
    let error = '';
    let loading = false;

    async function runValidation() {
        loading = true;
        error = '';
        result = '';
        
        try {
            const response = await fetch('/api/validate', {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                result = data.message;
            } else {
                error = data.error || 'Validation failed';
            }
        } catch (e) {
            error = 'Failed to run validation';
        } finally {
            loading = false;
        }
    }
</script>

<div class="container mt-4">
    <h1>Data Validation</h1>
    
    <div class="card">
        <div class="card-body">
            <p class="card-text">
                Click the button below to validate and fix the animal data structure.
                This will ensure all animals have the required fields properly initialized.
            </p>
            
            <button 
                class="btn btn-primary" 
                on:click={runValidation}
                disabled={loading}>
                {loading ? 'Running...' : 'Run Validation'}
            </button>
            
            {#if result}
                <div class="alert alert-success mt-3">
                    {result}
                </div>
            {/if}
            
            {#if error}
                <div class="alert alert-danger mt-3">
                    {error}
                </div>
            {/if}
        </div>
    </div>
</div> 