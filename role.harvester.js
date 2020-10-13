/**
 * 搬运工人相关模块
 * role.harvester 
 */



var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //寻找房间所有资源
        var sources = creep.room.find(FIND_SOURCES);
        //首次进入status未定义，赋值给他状态是0让他去取能量
        if(typeof creep.memory.status == null){
            creep.memory.status = false;
        }
        //状态为false则需要去取能量
	    if(creep.memory.status == false) {
            let source_target = Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id);
            if(creep.harvest(source_target)== ERR_NOT_IN_RANGE) {
                creep.moveTo(source_target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        //当能量值达到50证明能量满了，把状态切换成去干活
        if(creep.store[RESOURCE_ENERGY] == 50){
            creep.memory.status = true;
        }
        if(creep.memory.status == true){
            var work_targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            console.log(work_targets[0].structureType);
            //如果没有充能目标
            if(creep.memory.targetId == null){
                creep.memory.targetId = work_targets[0].id;
            }
            var work_target = Game.getObjectById(creep.memory.targetId);
            if(work_targets.length > 0) {
                if(creep.transfer(work_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(work_target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                //如果目标建筑物能量满了
                if(work_target.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
                    creep.memory.targetId = work_targets[0].id;
                }
            }
        }
        //身上能量为0证明能量空了，把状态切换成去取能量
        if(creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.status = false;
        }
	}
};

module.exports = roleHarvester;
