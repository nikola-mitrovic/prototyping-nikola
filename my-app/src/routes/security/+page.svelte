<script>
    // Get current timestamp in HH:MM:SS format
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour12: false });
    }

    // Update timestamp every second
    let timestamp = getCurrentTime();
    setInterval(() => {
        timestamp = getCurrentTime();
    }, 1000);
</script>

<div class="security-dashboard">
    <div class="container-fluid p-4">
        <div class="row mb-4">
            <div class="col">
                <h1 class="h2 fw-semibold mb-1">
                    <i class="bi bi-camera-video-fill me-2"></i>
                    Zoo Security Dashboard
                </h1>
                <p class="text-muted mb-0">Live Camera Feeds</p>
            </div>
        </div>

        <div class="row g-4">
            <!-- Camera 1 -->
            <div class="col-md-6">
                <div class="camera-feed">
                    <div class="camera-header">
                        <span class="camera-title">Security Camera 1</span>
                        <span class="camera-status">
                            <span class="status-dot"></span>
                            LIVE
                        </span>
                    </div>
                    <img src="/images/image1.jpg" alt="Security Camera 1" class="camera-image">
                    <div class="camera-footer">
                        <span class="timestamp">{timestamp}</span>
                        <span class="location">North Gate</span>
                    </div>
                </div>
            </div>

            <!-- Camera 2 -->
            <div class="col-md-6">
                <div class="camera-feed">
                    <div class="camera-header">
                        <span class="camera-title">Security Camera 2</span>
                        <span class="camera-status">
                            <span class="status-dot"></span>
                            LIVE
                        </span>
                    </div>
                    <img src="/images/image2.jpg" alt="Security Camera 2" class="camera-image">
                    <div class="camera-footer">
                        <span class="timestamp">{timestamp}</span>
                        <span class="location">East Wing</span>
                    </div>
                </div>
            </div>

            <!-- Camera 3 -->
            <div class="col-md-6">
                <div class="camera-feed">
                    <div class="camera-header">
                        <span class="camera-title">Security Camera 3</span>
                        <span class="camera-status">
                            <span class="status-dot"></span>
                            LIVE
                        </span>
                    </div>
                    <img src="/images/image3.webp" alt="Security Camera 3" class="camera-image">
                    <div class="camera-footer">
                        <span class="timestamp">{timestamp}</span>
                        <span class="location">South Gate</span>
                    </div>
                </div>
            </div>

            <!-- Camera 4 -->
            <div class="col-md-6">
                <div class="camera-feed">
                    <div class="camera-header">
                        <span class="camera-title">Security Camera 4</span>
                        <span class="camera-status">
                            <span class="status-dot"></span>
                            LIVE
                        </span>
                    </div>
                    <img src="/images/image4.avif" alt="Security Camera 4" class="camera-image">
                    <div class="camera-footer">
                        <span class="timestamp">{timestamp}</span>
                        <span class="location">West Wing</span>
                    </div>
                </div>
            </div>

            <!-- Camera 5 - YouTube Feed -->
            <div class="col-md-6">
                <div class="camera-feed">
                    <div class="camera-header">
                        <span class="camera-title">Security Camera 5</span>
                        <span class="camera-status">
                            <span class="status-dot"></span>
                            LIVE
                        </span>
                    </div>
                    <div class="video-container">
                        <iframe 
                            width="100%" 
                            height="315" 
                            src="https://www.youtube.com/embed/Oh2jORwSAE0?si=xjDvtvYknZYqUGD0" 
                            title="Indoor Exhibit Security Feed"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div class="camera-footer">
                        <span class="timestamp">{timestamp}</span>
                        <span class="location">Indoor Exhibit</span>
                    </div>
                </div>
            </div>

            <!-- Camera 6 - Giphy Feed -->
            <div class="col-md-6">
                <div class="camera-feed">
                    <div class="camera-header">
                        <span class="camera-title">Security Camera 6</span>
                        <span class="camera-status">
                            <span class="status-dot"></span>
                            LIVE
                        </span>
                    </div>
                    <div class="video-container">
                        <img 
                            src="https://media1.giphy.com/media/3og0IN11dPetK88q7C/200.gif?cid=6c09b952tp2uyjeenxhcrclvopondcz7d4tp6v2ztk4ddvwv&ep=v1_internal_gif_by_id&rid=200.gif&ct=g"
                            alt="Night Vision Security Feed"
                            class="camera-image"
                        >
                    </div>
                    <div class="camera-footer">
                        <span class="timestamp">{timestamp}</span>
                        <span class="location">Night Vision Feed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :global(body) {
        background-color: white !important;
    }

    .security-dashboard {
        min-height: 100vh;
    }

    .camera-feed {
        background-color: white;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        margin-bottom: 1rem;
    }

    .camera-header {
        padding: 10px 15px;
        background-color: #f8f9fa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e9ecef;
    }

    .camera-title {
        font-weight: 500;
        color: #212529;
    }

    .camera-status {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8rem;
        color: #198754;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        background-color: #198754;
        border-radius: 50%;
        display: inline-block;
    }

    .camera-image {
        width: 100%;
        height: 315px;
        object-fit: cover;
    }

    .video-container {
        width: 100%;
        background-color: #f8f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .camera-footer {
        padding: 10px 15px;
        background-color: #f8f9fa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        color: #212529;
        border-top: 1px solid #e9ecef;
    }

    .timestamp {
        letter-spacing: 1px;
    }

    .location {
        color: #6c757d;
    }
</style>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</svelte:head> 