var _a;
import { system, world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { TickFunctions } from "staticScripts/tickFunctions";
const activeBan = false;
world.afterEvents.playerSpawn.subscribe((eventData) => {
    const player = eventData.player;
    if (player.hasTag("banned")) {
        world.sendMessage(`${player.name} has been banned from the server`);
        if (activeBan) {
            player.dimension.runCommand(`kick ${player.name}`);
        }
        else {
            world.sendMessage("banned player kicked but since this is dev not");
        }
    }
});
export class BannedManager {
}
_a = BannedManager;
BannedManager.banPlayer = (player) => {
    system.run(() => {
        player.addTag("banned");
        world.sendMessage(`${player.name} has been banned from the server`);
        //player.dimension.runCommand(`kick ${player.name}`);
    });
};
BannedManager.banTimers = new Map();
BannedManager.queueBan = (player, Seconds) => {
    world.sendMessage(`Quing ban for ${Seconds} seconds on ${player.name}`);
    if (_a.banTimers.has(player)) {
        if (_a.banTimers.get(player) > Seconds) {
            _a.banTimers.set(player, Seconds);
        }
        return;
    }
    _a.banTimers.set(player, Seconds);
};
BannedManager.tickDownBanTimer = () => {
    for (const player of GlobalVars.players) {
        if (_a.banTimers.has(player)) {
            if (_a.banTimers.get(player) > 0) {
                _a.banTimers.set(player, _a.banTimers.get(player) - 1);
                world.sendMessage(`Seconds: ${_a.banTimers.get(player)}`);
            }
            else {
                _a.banTimers.delete(player);
                _a.banPlayer(player);
            }
        }
    }
};
TickFunctions.addFunction(BannedManager.tickDownBanTimer, 20);
