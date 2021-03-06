/**
 * harvester class
 * role.harvester 
 */
var common = require('common');


var roleHarvester = {

    /** @param {Creep} creep **/
    /**
     * the work function of each creep
     * @param creep
     * @param structures all the structures in the room
     */
    run: function(creep, structures) {
        //status is null when the creep is born, defined its status be false make it get the source
        if(typeof creep.memory.status == null){
            creep.memory.status = false;
        }
        //when the creep have enough energy means that it should go to work
        if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
            creep.memory.status = true;
        }
        //when the creep don't have energy means that it should go to get energy
        if(creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.status = false;
        }
        switch (creep.memory.status) {
            case(false):
            default:
                let source_active = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (source_active != null){
                    let source_target = Game.getObjectById(source_active.id);
                    if(creep.harvest(source_target)== ERR_NOT_IN_RANGE) {
                        creep.moveTo(source_target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                break;
            case(true):
                this.charge_order(structures, creep);
                let work_target = Game.getObjectById(creep.memory.targetId);
                if(creep.transfer(work_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(work_target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
        }
	},
    /**
     * ergod all the structure and charge them in order
     * @param work_targets
     * @param creep
     * @returns {number}
     */
    charge_order : function (work_targets, creep) {
        // charge order extension>spawn>tower>storage
        let check = this.filter_structure(work_targets, 'extension', creep);
        if (check == 1){
            return 1;
        }

        // var sort = [];
        // for (let i = 0;i < work_targets.length;i++){
        //     if (work_targets[i].structureType == STRUCTURE_EXTENSION) {
        //         // creep.memory.targetId = work_targets[i].id;
        //         // return 1;
        //         sort.push(work_targets[i]);
        //     }
        // }
        // if (sort.length > 0){
        //     let closest_structure = common.closest_structure(sort, creep);
        //     creep.memory.targetId = closest_structure.id;
        //     return 1;
        // }

        check = this.filter_structure(work_targets, 'spawn', creep);
        if (check == 1){
            return 1;
        }
        // sort = [];
        // for (let i = 0;i < work_targets.length;i++){
        //     if (work_targets[i].structureType == STRUCTURE_SPAWN) {
        //         // creep.memory.targetId = work_targets[i].id;
        //         // return 1;
        //         sort.push(work_targets[i]);
        //     }
        // }
        // if (sort.length > 0){
        //     let closest_structure = common.closest_structure(sort, creep);
        //     creep.memory.targetId = closest_structure.id;
        //     return 1;
        // }

        check = this.filter_structure(work_targets, 'tower', creep);
        if (check == 1){
            return 1;
        }
        // sort = [];
        // for (let i = 0;i < work_targets.length;i++){
        //     if (work_targets[i].structureType == STRUCTURE_TOWER) {
        //         // creep.memory.targetId = work_targets[i].id;
        //         // return 1;
        //         sort.push(work_targets[i]);
        //     }
        // }
        // if (sort.length > 0){
        //     let closest_structure = common.closest_structure(sort, creep);
        //     creep.memory.targetId = closest_structure.id;
        //     return 1;
        // }

        check = this.filter_structure(work_targets, 'storage', creep);
        if (check == 1){
            return 1;
        }
        // sort = [];
        // for (let i = 0;i < work_targets.length;i++){
        //     if (work_targets[i].structureType == STRUCTURE_STORAGE) {
        //         // creep.memory.targetId = work_targets[i].id;
        //         // return 1;
        //         sort.push(work_targets[i]);
        //     }
        // }
        // if (sort.length > 0){
        //     let closest_structure = common.closest_structure(sort, creep);
        //     creep.memory.targetId = closest_structure.id;
        //     return 1;
        // }
    },
    /**
     * find the closest structure with a designative type of the creep
     * @param work_targets  the array of all the structures
     * @param type  the type of structure
     * @param creep the creep
     * @returns {number} 1 means find the closest structure it want, 0 means there is no such a structure with the designative type
     */
    filter_structure : function (work_targets, type, creep) {
        let sort = [];
        for (let i = 0;i < work_targets.length;i++){
            if (work_targets[i].structureType == type) {
                sort.push(work_targets[i]);
            }
        }
        if (sort.length > 0){
            let closest_structure = common.closest_structure(sort, creep);
            creep.memory.targetId = closest_structure.id;
            return 1;
        }else {
            return 0;
        }
    }
};

module.exports = roleHarvester;