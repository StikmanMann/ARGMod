import { system, world } from "@minecraft/server";

world.sendMessage("Door Rule Loaded");

world.beforeEvents.playerInteractWithBlock.subscribe((eventData) => {
  system.run(() => {
    const player = eventData.player;
    const block = eventData.block;
    const blockType = block.typeId;

    if (blockType.includes("door")) {
      world.sendMessage(
        `${player.name} Interacted with Block Type: ${blockType}
      Hes gonna die now buh bye`
      );
      player.addTag("banned");
      //player.dimension.runCommand(`kick ${player.name}`);
      eventData.cancel = true;
    }
  });
});
