import { world } from "@minecraft/server";
const capitalLetters = /[A-Z]/g;
world.beforeEvents.chatSend.subscribe((eventData) => {
    const message = eventData.message;
    if (message.match(capitalLetters)) {
        world.sendMessage(`§c${eventData.sender.nameTag}§r: ${message}`);
        eventData.cancel = true;
    }
    else {
        world.sendMessage(`§a${eventData.sender.nameTag}§r: ${message}`);
    }
});
