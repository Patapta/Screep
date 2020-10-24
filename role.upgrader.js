/**
 * upgrader class
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
            //upgrader get energy temporarily
            var storage = Game.spawns['Home1'].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            var target = Game.getObjectById(storage[0].id);
            console.log(storage[0]);
            if(creep.harvest(Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id), {visualizePathStyle: {stroke: '#ff0000'}});
            }
            // if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources);
            // }

        }
    }
}

module.exports = roleUpgrader;