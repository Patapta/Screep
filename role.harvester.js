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
        if(typeof creep.memory.status === "undefined"){
            creep.memory.status = false;
        }
        //状态为false则需要去取能量
	    if(creep.memory.status == false) {
            if(creep.harvest(Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.pos.findClosestByRange(FIND_SOURCES).id), {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        //当能量值达到50证明能量满了，把状态切换成去干活
        if(creep.store[RESOURCE_ENERGY] == 50){
            creep.memory.status = true;
        }
        if(creep.memory.status == true){
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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
