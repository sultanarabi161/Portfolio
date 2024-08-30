async function loadChannels() {
    const url = document.getElementById('m3uUrl').value;
    const loadingIndicator = document.getElementById('loading');
    try {
        loadingIndicator.style.display = 'block';
        const response = await fetch(url);
        const data = await response.text();
        parseM3U(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load channels. Please check the URL.');
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function parseM3U(data) {
    const lines = data.split('\n');
    const channelBox = document.getElementById('channelBox');
    channelBox.innerHTML = '';

    let channelName = '';
    let logoUrl = '';
    let streamUrl = '';
    lines.forEach(line => {
        if (line.startsWith('#EXTINF')) {
            const nameMatch = line.match(/,(.*)$/);
            const logoMatch = line.match(/tvg-logo="(.*?)"/);

            channelName = nameMatch ? nameMatch
  <button className="select-none no-underline">
  <a className="" href="" target="_blank">
        <span className="relative -top-[0rem] inline-flex">
          <span className="h-[1rem] min-w-[1rem] items-center justify-center rounded-full  text-center px-1 text-xs font-mono bg-muted text-[0.60rem] text-muted-foreground">
            1
          </span>
        </span>
      </a>
    </button> : '';
            logoUrl = logoMatch ? logoMatch
  <button className="select-none no-underline">
  <a className="" href="" target="_blank">
        <span className="relative -top-[0rem] inline-flex">
          <span className="h-[1rem] min-w-[1rem] items-center justify-center rounded-full  text-center px-1 text-xs font-mono bg-muted text-[0.60rem] text-muted-foreground">
            1
          </span>
        </span>
      </a>
    </button> : '';
        } else if (line.startsWith('http') || line.startsWith('https')) {
            streamUrl = line.trim();

            const channelElement = document.createElement('div');
            channelElement.classList.add('channel');
            channelElement.setAttribute('data-channel-name', channelName.toLowerCase());

            const imgElement = document.createElement('img');
            imgElement.src = logoUrl || 'https://via.placeholder.com/180x120?text=No+Logo';
            imgElement.alt = channelName;

            const nameElement = document.createElement('p');
            nameElement.textContent = channelName;

            channelElement.appendChild(imgElement);
            channelElement.appendChild(nameElement);

            channelElement.addEventListener('click', () => {
                playChannel(streamUrl);
            });

            channelBox.appendChild(channelElement);
        }
    });
}

function playChannel(url) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');

    videoSource.src = url;
    videoPlayer.load();
    videoPlayer.play();
}

function searchChannels() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const channels = document.querySelectorAll('.channel');

    channels.forEach(channel => {
        const channelName = channel.getAttribute('data-channel-name');
        if (channelName.includes(searchInput)) {
            channel.style.display = 'block';
        } else {
            channel.style.display = 'none';
        }
    });
}
