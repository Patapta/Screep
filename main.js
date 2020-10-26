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

    // //get the structure_targets in the room
    // Game.rooms.memory.structure_targets = creep.room.find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    //     }
    // });

    //ergod the creeps and execute the work function
    for (let name in Game.creeps) {
        Game.creeps[name].work();
    }

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


    //调用
    for(var value in tower){
        constructionTower.attack(tower[value]);
        constructionTower.repair(tower[value]);
    }
    //回头研究一下怎么不用设置spawns名字直接获取防御塔
    // //统一管理功能性建筑当前工作
    // //寻找当前房间内的防御塔
    // var towerID = [];
    // for(var id in Game.structures){
    //     if(Game.structures[id].structureType == 'tower'){
    //         towerID.push(id);
    //     }
    // }
    // var tower = [];
    // $.each(towerID, function (k, v) {
    //      tower.push(Game.getObjectById(v));
    // });
    //
    //
    // //调用
    // if(tower){
    //     constructionTower.attack(tower);
    //     constructionTower.repair(tower);
    // }
    Game.cpu.generatePixel();
}