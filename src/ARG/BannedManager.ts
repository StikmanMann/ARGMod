import { Player, world } from "@minecraft/server";
import { GlobalVars } from "globalVars";
import { TickFunctions } from "staticScripts/tickFunctions";

const activeBan = false;

world.afterEvents.playerSpawn.subscribe((eventData) => {
  const player = eventData.player;
  if (player.hasTag("banned")) {
    world.sendMessage(`${player.name} has been banned from the server`);
    if (activeBan) {
      player.dimension.runCommand(`kick ${player.name}`);
    } else {
      world.sendMessage("banned player kicked but since this is dev not");
    }
  }
});

export class BannedManager {
  static banPlayer = (player: Player) => {
    player.addTag("banned");
    world.sendMessage(`${player.name} has been banned from the server`);
    //player.dimension.runCommand(`kick ${player.name}`);
  };

  static banTimers: Map<Player, number> = new Map();

  static queueBan = (player: Player, Seconds: number) => {
    world.sendMessage(`Quing ban for ${Seconds} seconds on ${player.name}`);
    if (BannedManager.banTimers.has(player)) {
      if (BannedManager.banTimers.get(player) > Seconds) {
        BannedManager.banTimers.set(player, Seconds);
      }
      return;
    }
    BannedManager.banTimers.set(player, Seconds);
  };

  static tickDownBanTimer = () => {
    for (const player of GlobalVars.players) {
      if (BannedManager.banTimers.has(player)) {
        if (BannedManager.banTimers.get(player) > 0) {
          BannedManager.banTimers.set(
            player,
            BannedManager.banTimers.get(player) - 1
          );
          world.sendMessage(`Seconds: ${BannedManager.banTimers.get(player)}`);
        } else {
          BannedManager.banTimers.delete(player);
          this.banPlayer(player);
        }
      }
    }
  };
}

TickFunctions.addFunction(BannedManager.tickDownBanTimer, 20);
