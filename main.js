var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder'),
    roleTransporter = require('role.transporter'),
    constructionTower = require('construction.tower'),
    creeps_create = require('creeps_create');
const mount = require('utils.mount');
const config = require('config');

module.exports.loop = function () {
    //mount the prototype extension
    mount();

    //get the structure_targets in the room
    var structures = [];
    for(let key in Game.structures){
        if (Game.structures[key].structureType == STRUCTURE_SPAWN ||
            Game.structures[key].structureType == STRUCTURE_TOWER ||
            Game.structures[key].structureType == STRUCTURE_STORAGE ||
            Game.structures[key].structureType == STRUCTURE_EXTENSION){
            if (Game.structures[key].store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                structures.push(Game.structures[key]);
            }
        }
    }

    //ergod the creeps and execute the work function
    for (let name in Game.creeps) {
        Game.creeps[name].work(structures);
    }

    //clear the memory of dead creeps
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('清除死去的弔虫数据: ' + name);
        }
    }

    //create the creep
    creeps_create.create();

    //ergod the towers and execute the work function
    for(let key in structures){
        if (structures[key].structureType == STRUCTURE_TOWER){
            console.log(structures[key]);
            constructionTower.attack(structures[key]);
            constructionTower.repair(structures[key]);
        }
    }

    //use the cpu
    Game.cpu.generatePixel();
}