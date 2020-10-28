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
        if (Game.structures[key].structureType == STRUCTURE_EXTENSION ||
            Game.structures[key].structureType == STRUCTURE_SPAWN ||
            Game.structures[key].structureType == STRUCTURE_TOWER ||
            Game.structures[key].structureType == STRUCTURE_STORAGE){
            structures.push(Game.structures[key]);
            console.log(Game.structures[key]);
        }
        // console.log(Game.structures[key].store.getFreeCapacity(RESOURCE_ENERGY));
    }

    var structure = Game.spawns['Home1'].room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });

    //ergod the creeps and execute the work function
    for (let name in Game.creeps) {
        Game.creeps[name].work(structure);
    }
    console.log(1);
    console.log(structures.length);
    console.log(2);
    console.log(structure.length);
    console.log(3);

    //clear the memory of dead creeps
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('清除死去的弔虫数据: ' + name);
        }
    }

    creeps_create.create();


    //find towers in the room
    var tower = Game.spawns['Home1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_TOWER);
        }
    });


    //run it
    for(var value in tower){
        constructionTower.attack(tower[value]);
        constructionTower.repair(tower[value]);
    }

    // //ergod the towers and execute the work function
    // for(let key in structures){
    //     if (structures[key].structureType == STRUCTURE_TOWER){
    //         constructionTower.attack(structures[key]);
    //         constructionTower.repair(structures[key]);
    //     }
    // }

    //use the cpu
    Game.cpu.generatePixel();
}