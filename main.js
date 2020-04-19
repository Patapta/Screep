module.exports.loop = function () {
    //测试
    // console.log(Game.gcl.progressTotal);

    //引入相关模块
    var roleHarvester = require('role.harvester');
    var roleUpgrader = require('role.upgrader');
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // if(creep.memory.role == 'harvester') {
        //     roleHarvester.run(creep);
        // }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

