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
    let idleTime = 0;

    let timer = setInterval(timeSleep, 1000); //seconds

    function timeSleep() {
        idleTime = idleTime + 1;
    }

    const client = new tmi.Client({
        channels: [channelName]
    });

    client.connect().catch(console.error);

    client.on('chat', (channel, user, message, self) => {

        //alert message
        if (user['message-type'] === 'chat') {

            if (modsonly === 'true' && (user.mod || user.username === channelName)) {
                playSound(); //mods only
            } else if (modsonly === 'false') {
                playSound(); //everyone
            }

            function playSound() {

                if (message.startsWith("!fart")) {

                    if (idleTime >= coolDown) {

                        console.log(idleTime);

                        idleTime = 0;
                        timer = 0;
                        clearInterval(timer);

                        console.log(user.username + " just farted :)");

                        let randomFart = Math.floor((Math.random() * 21) + 1);

                        let audioPlayer = "<audio autoplay><source src='./media/fart" + randomFart + ".mp3' type='audio/mpeg'></audio>";

                        $(audioPlayer).appendTo('#container');

                        $("#container audio").fadeIn(500).delay(5000).fadeOut(500, function () {
                            $(this).remove();
                        });
                    }

                }
            }

        }
    });
});