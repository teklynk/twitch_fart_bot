$(document).ready(function () {
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    let coolDown = getUrlParameter('cooldown');
    let channelName = getUrlParameter('channel').toLowerCase();
    let modsonly = getUrlParameter('modsonly');
    let rotation = getUrlParameter('rotation');
    let animation = getUrlParameter('animation');
    let size = getUrlParameter('size');
    let idleTime = 0;
    let audioDuration = 1;
    let numOfFiles = 21;

    if (!rotation) {
        rotation = "0";
    }

    if (!animation) {
        animation = "0";
    }

    if (!size) {
        size = "0";
    }

    let timer = setInterval(timeSleep, 1000); //seconds

    function loadSounds() {
        let audioElements = "";

        for (let i = 1; i <= numOfFiles; i++) {
          audioElements += "<audio id='audio-" + i + "' preload='auto'><source src='./media/fart" + i + ".mp3' type='audio/mpeg'></audio>";
        }

        $(audioElements).appendTo('#container');
    }

    // Preload all sound files
    loadSounds();

    function play(item) {
        let audioPlay = document.getElementById("audio-" + item);
        audioPlay.play();
    }

    function timeSleep() {
        idleTime = idleTime + 1;
    }

    let customSize = "width: auto;";

    if (size !== "0") {
        customSize = "width: " + size + "px;"
    }

    // create img element. dummy 1x1 pixel gif as a placeholder
    let fartAnimation = "<img class='responsive' style='"+customSize+"' src='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'>";
    $(fartAnimation).appendTo('#container');

    if (rotation) {
        $("img").css("transform", "rotate(" + rotation + "deg)");
    }

    // load TMI js
    const client = new tmi.Client({
        channels: [channelName]
    });

    client.connect().catch(console.error);

    client.on('chat', (channel, user, message, self) => {

        
        if (user['message-type'] === 'chat') {

            if (modsonly === 'true' && (user.mod || user.username === channelName)) {
                playSound(); //mods only
            } else if (modsonly === 'false') {
                playSound(); //everyone
            }

            function createSound(){
                idleTime = 0;
                timer = 0;
                clearInterval(timer);

                let randomFart = Math.floor((Math.random() * numOfFiles) + 1);

                let audio = $("#audio-" + randomFart)[0];

                let audioDuration = audio.duration;

                play(randomFart);

                if (animation !== "0") {
                    $("#container img").attr("src","./media/fart" + animation + ".gif");

                    $("#container img").fadeIn(100).delay(audioDuration.toFixed(1) * 1000).fadeOut(500, function () {
                        // dummy 1x1 pixel gif as a placeholder
                        $(this).attr("src","data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D");
                    });
                }
            }

            function playSound() {

                if (message.startsWith("!fart")) {

                    if (user.username === channelName){
                        createSound(); //streamer only - no cooldown. plays on demand
                    } else if(idleTime >= parseInt(coolDown)) {
                        createSound(); //cooldown for everyone else including mods
                    }

                }
            }

        }
    });
});