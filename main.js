var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder'),
    roleTransporter = require('role.transporter'),
    constructionTower = require('construction.tower'),
    creeps_create = require('creeps_create');
const mount = require('utils.mount');
const config = require('config');

module.exports.loop = function () {
    //挂载原型扩展
    mount();

    //Creeps 工作
    for (let name in Game.creeps) {
        Game.creeps[name].work();
    }

    //清除死去虫子的内存数据
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('清除死去的弔虫数据: ' + name);
        }
    }

    creeps_create.create();

    //统一管理功能性建筑当前工作
    //寻找当前房间内的防御塔
    var towerID = [];
    for(var id in Game.structures){
        if(Game.structures[id].structureType == 'tower'){
            towerID.push(id);
        }
    }
    var tower = [];
    each(towerID, function (k, v) {
         tower.push(Game.getObjectById(v));
    });

    
    //调用
    each(tower, function (k, v) {
        constructionTower.attack(v);
        constructionTower.repair(v);
    });
    Game.cpu.generatePixel();
}