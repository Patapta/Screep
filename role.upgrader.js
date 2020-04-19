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