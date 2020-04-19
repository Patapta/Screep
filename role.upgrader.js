/**
 * 升级控制器相关模块
 * role.upgrader
 */
var roleUpgrader = {
    run: function(creep){

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('🚧 upgrade');
        }

        if(creep.memory.upgrading){
            if(creep.room.controller){
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
        }
        else{
            var sources = creep.room.find(FIND_SOURCES);
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
    }
}

module.exports = roleUpgrader;








//自己写得取能量代码
// var roleUpgrader = { 

//     /** @param {Creep} creep **/
//     run: function(creep) {
//         //首次进入status未定义，赋值给他状态是0让他去取能量
//         if(typeof creep.memory.status === "undefined"){
//             creep.memory.status = 0;
//         }
//         //当前状态是去取能量
// 	    if(creep.memory.status == 0) {
//             var sources = creep.room.find(FIND_SOURCES);
//             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[0]);
//             }
//         }
//         //当能量值达到50证明能量满了，把状态切换成去建造
//         if(creep.store[RESOURCE_ENERGY] == 50){
//             creep.memory.status = 1;
//         }
//         //当前状态是去建造
//         if(creep.memory.status == 1) {
//             if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(creep.room.controller);
//                 creep.upgradeController(creep.room.controller);
//             }
//         }
//         //身上能量为0证明能量空了，把状态切换成去取能量
//         if(creep.store[RESOURCE_ENERGY] == 0){
//             creep.memory.status = 0;
//         }
// 	}
// };