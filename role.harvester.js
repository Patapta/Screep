/**
 * harvester class
 * role.harvester 
 */



var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //status is null when the creep is born, defined its status be false make it get the source
        if(typeof creep.memory.status == null){
            creep.memory.status = false;
        }
        //status equal to false means that the creep should get the source
	    if(creep.memory.status == false) {
            let source_target = Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id);
            if(creep.harvest(source_target)== ERR_NOT_IN_RANGE) {
                creep.moveTo(source_target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        //when the creep have energy more than 50 means that it should go to work
        if(creep.store[RESOURCE_ENERGY] == 50){
            creep.memory.status = true;
        }
        if(creep.memory.status == true){
            var work_targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            //if there is not charge target
            if(creep.memory.targetId == null){
                creep.memory.targetId = work_targets[0].id;
                this.charge_order(work_targets, creep);
            }
            var work_target = Game.getObjectById(creep.memory.targetId);
            if(work_targets.length > 0) {
                if(creep.transfer(work_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(work_target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                //if the structure's energy is full
                if(work_target.store.getFreeCapacity(RESOURCE_ENERGY) == 0 || work_target.structureType == STRUCTURE_STORAGE){
                    creep.memory.targetId = work_targets[0].id;
                    this.charge_order(work_targets, creep);
                }
            }
        }
        //when the creep don't have energy means that it should go to get energy
        if(creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.status = false;
        }
	},
    //ergod all the structure and charge them in order
    charge_order : function (work_targets, creep) {
        //charge order extension>spawn>tower>storage
        for (let i = 0;i < work_targets.length;i++){
            if (work_targets[i].structureType == STRUCTURE_EXTENSION) {
                creep.memory.targetId = work_targets[i].id;
                return 1;
            }
        }
        for (let i = 0;i < work_targets.length;i++){
            if (work_targets[i].structureType == STRUCTURE_SPAWN) {
                creep.memory.targetId = work_targets[i].id;
                return 1;
            }
        }
        for (let i = 0;i < work_targets.length;i++){
            if (work_targets[i].structureType == STRUCTURE_TOWER) {
                creep.memory.targetId = work_targets[i].id;
                return 1;
            }
        }
        // for (let i = 0;i < work_targets.length;i++){
        //     if (work_targets[i].structureType == STRUCTURE_STORAGE) {
        //         creep.memory.targetId = work_targets[i].id;
        //         return 1;
        //     }
        // }
    }
};

module.exports = roleHarvester;