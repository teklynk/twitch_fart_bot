$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);

    const coolDown = (parseInt(urlParams.get('cooldown'), 10) || 5) * 1000; // in ms
    const channelName = (urlParams.get('channel') || '').toLowerCase();
    const modsOnly = urlParams.get('modsonly') === 'true';
    const rotation = urlParams.get('rotation') || '0';
    const animation = urlParams.get('animation') || '0';
    const command = (urlParams.get('command') || 'fart').trim().toLowerCase();
    const size = urlParams.get('size') || '0';
    const sound = urlParams.get('sound');
    const numOfFiles = 21;

    if (!channelName) {
        $('#container').html('<p style="color: red; font-family: sans-serif;">Error: Twitch channel not specified. Please add ?channel=your_channel_name to the URL.</p>');
        return;
    }

    let lastFartTimestamp = 0;

    let customSize = "width: auto;";
    
    if (size !== "0") {
        customSize = `width: ${size}px;`;
    }

    // Preload all sound files
    for (let i = 1; i <= numOfFiles; i++) {
        $("<audio>", {
            id: `audio-${i}`,
            preload: "auto"
        }).append(`<source src="./media/fart${i}.mp3" type="audio/mpeg">`).appendTo('#container');
    }

    // create img element. dummy 1x1 pixel gif as a placeholder
    const $fartImage = $("<img>", {
        src: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D',
        style: customSize
    }).css("transform", `rotate(${rotation}deg)`).appendTo('#container');

    function createSound() {
        lastFartTimestamp = Date.now();

        let soundFart;

        if (sound) {
            soundFart = sound;
        } else {
            soundFart = Math.floor((Math.random() * numOfFiles) + 1);
        }

        let audio = $("#audio-" + soundFart)[0];
        audio.play();

        let audioDuration = (audio.duration || 1) * 1000;

        if (animation !== "0") {
            $fartImage.attr("src", `./media/fart${animation}.gif`);

            $fartImage.fadeIn(100).delay(audioDuration).fadeOut(500, function () {
                // dummy 1x1 pixel gif as a placeholder
                $(this).attr("src", "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D");
            });
        }
    }

    // Connect to Twitch chat using TMIjs
    const client = new tmi.Client({
        options: {
            debug: true,
            skipUpdatingEmotesets: true
        },
        connection: {
            reconnect: true,
            maxReconnectAttempts: 3
        },
        channels: [channelName]
    });

    client.connect().catch((err) => {
        console.error(err);
    });

    client.on("maxreconnect", () => {
        $("<div class='msg-error'>Failed to connect to Twitch Chat. Please refresh to try again. Twitch Access Token may have also expired.</div>").prependTo('body');
    });

    client.on('chat', (channel, user, message, self) => {
        if (self || user['message-type'] !== 'chat') return;

        if (message.toLowerCase().startsWith("!" + command)) {
            const isStreamer = user.username.toLowerCase() === channelName;
            const isMod = user.mod;
            const canFart = !modsOnly || isMod || isStreamer;
            const isOnCooldown = (Date.now() - lastFartTimestamp) < coolDown;

            if (canFart && (isStreamer || !isOnCooldown)) {
                createSound();
            }
        }
    });
});