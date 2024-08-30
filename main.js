const player = new Plyr('#videoPlayer', {
            controls: [
                'play-large', 'restart', 'rewind', 'play', 'fast-forward', 
                'progress', 'current-time', 'duration', 'mute', 
                'volume', 'captions', 'settings', 'pip', 'airplay', 
                 'fullscreen'
            ]
        });

        document.querySelectorAll('.channel').forEach(function(channel) {
            channel.addEventListener('click', function() {
                var videoSrc = this.getAttribute('data-video-src');
                player.source = {
                    type: 'video',
                    sources: [
                        {
                            src: videoSrc,
                            type: 'application/x-mpegURL'
                        }
                    ]
                };
                player.play();
            });
        });

        document.querySelectorAll('.category').forEach(function(category) {
            category.addEventListener('click', function() {
                var selectedCategory = this.getAttribute('data-category');
                document.querySelectorAll('.channel').forEach(function(channel) {
                    if (channel.getAttribute('data-category') === selectedCategory) {
                        channel.style.display = 'block';
                    } else {
                        channel.style.display = 'none';
                    }
                });
            });
        });
