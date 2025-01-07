<script>
  import "./styles.css";
</script>

<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold text-white" href="/">ZooManager</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link text-white" href="/animals">Animals</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="/zookeepers">Zookeepers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-white" href="/security">Security</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  <slot />
</div>

<style>
  :global(html), :global(body) {
    background-color: #f5f5f5 !important;
    min-height: 100vh;
  }
  
  .navbar {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .nav-link {
    font-weight: 500;
    opacity: 0.9;
    transition: opacity 0.2s;
  }
  .nav-link:hover {
    opacity: 1;
  }
  :global(h1) {
    color: #212529;
    font-weight: bold;
  }
  :global(.page-title) {
    color: #212529;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
</style>
