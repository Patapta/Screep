/**
 * builder class
 * role.harvester 
 */
var roleBuilder = {

    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(Game.getObjectById(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES).id)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES).id), {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
	    }
	    else {
            // var sources = creep.room.find(FIND_SOURCES);
            // if(creep.harvest(Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id)) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id), {visualizePathStyle: {stroke: '#00ff00'}});
            // }
            var storage = Game.spawns['Home1'].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if(creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#00ff00'}});
            }
	    }
	}
};

module.exports = roleBuilder;