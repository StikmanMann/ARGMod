import { Logger } from "staticScripts/Logger";
//IMPORT
import "./Rules/DoorRule";
import "./Rules/CameraRule";
import "./Rules/SilenceRule";
import { world } from "@minecraft/server";
//IMPORT
Logger.log("Loading in rules", "RulesManager");
world.sendMessage("Loading in rules");
