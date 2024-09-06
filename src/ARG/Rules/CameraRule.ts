import { world } from "@minecraft/server";
import { BannedManager } from "ARG/BannedManager";
import { GlobalVars } from "globalVars";
import { TickFunctions } from "staticScripts/tickFunctions";

const tickFunction = () => {
  for (const player of GlobalVars.players) {
    player.getDynamicProperty("cameraSeconds") ??
      player.setDynamicProperty("cameraSeconds", 0);
    const block = player.getBlockFromViewDirection();

    if (!block) return;
    //world.sendMessage(`Block Type: ${block.block.type.id}`);
    if (block.block.typeId.includes("cobblestone_wall")) {
      player.setDynamicProperty(
        "cameraSeconds",
        (player.getDynamicProperty("cameraSeconds") as number) + 1
      );

      world.sendMessage(
        `Seconds: ${player.getDynamicProperty("cameraSeconds")}`
      );
      if ((player.getDynamicProperty("cameraSeconds") as number) >= 5) {
        BannedManager.queueBan(player, 10);
        //player.dimension.runCommand(`kick ${player.name}`);
      }
    } else {
      player.setDynamicProperty("cameraSeconds", 0);
    }
  }
};

TickFunctions.addFunction(tickFunction, 20);
