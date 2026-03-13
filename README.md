## Twitch Farts Bot

A simple, yet powerful, browser source for OBS and other streaming software. It plays a random fart sound and can display an animated GIF when a specified command is used in your Twitch chat. It's a fun way to add some humor and interaction to your stream!

### Try it
- [https://twitch-fart-bot.pages.dev](https://twitch-fart-bot.pages.dev)
- [https://twitch-fart-bot.teklynk.com](https://twitch-fart-bot.teklynk.com)

### Features
- Plays one of 21, random fart sounds.
- Optionally displays an animated GIF along with the sound.
- Customizable chat command (default: `!fart`).
- Adjustable global cooldown to prevent spam.
- Option to restrict the command to moderators and the broadcaster.
- Customize the GIF's size and rotation.
- Easy-to-use web-based configuration tool.

### How to Use
1.  **Configure:** Go to the Twitch Fart Bot configuration page.
2.  **Generate:** Fill in your channel name and customize the settings to your liking. Click the "Generate Overlay Link" button.
3.  **Copy:** Copy the full URL that appears.
4.  **Add to OBS:**
    - In OBS, right-click in the "Sources" panel and go to `Add` -> `Browser`.
    - Give it a name (e.g., "Fart Alert").
    - In the properties window, paste the copied URL into the `URL` field.
    - Set the `Width` and `Height` to match your stream canvas (e.g., `1920` x `1080`).
    - Click `OK`.
5.  **Test:** Go to your Twitch chat and type the command you configured. You should hear the sound and see the GIF (if you enabled one) on your stream!

### Configuration Options

All options can be set using the configuration page.

*   **Twitch Account:** Your Twitch username (required).
*   **Custom Command:** The command viewers will type in chat (e.g., `fart`, `stinky`). Do not include the `!`.
*   **Cool Down:** The number of seconds before the command can be used again. The broadcaster is not affected by the cooldown.
*   **Animated GIF:** Choose from a list of animations to play with the sound, or select "None".
*   **Image Size:** Adjust the width of the GIF in pixels. (Only enabled if a GIF is selected).
*   **Image Rotation:** Rotate the GIF in degrees from 0 to 360. (Only enabled if a GIF is selected).
*   **Mods Only:** If checked, only moderators and the broadcaster can use the command.

### Manual URL Parameters

For more advanced control, you can manually add the following parameters to the generated URL:

| Parameter | Description | Example |
| :--- | :--- | :--- |
| `channel` | Your Twitch username. | `channel=teklynk` |
| `command` | The chat command without the `!`. | `command=toot` |
| `cooldown` | Cooldown in seconds. | `cooldown=30` |
| `modsonly` | `true` or `false`. | `modsonly=true` |
| `animation`| The number of the GIF to play (0-10). `0` is none. | `animation=3` |
| `size` | The width of the GIF in pixels. | `size=300` |
| `rotation` | The rotation of the GIF in degrees. | `rotation=90` |
| `sound` | A number from 1-21 to play a specific sound. | `sound=5` |
