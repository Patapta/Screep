var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var constructionTower = require('construction.tower');

module.exports.loop = function () {
    
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-exiting creeps: ' + name);
        }
    }
    
    //统计劳作型劳工
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvester: ' + harvesters.length);

    //统计升级型劳工
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgrader.length);

    //统计建造型劳工
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builder.length);

    //自动创建劳作型劳工
    if(harvesters.length < 9) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }

    //只有在劳作型劳工足够的情况下再创建其他劳工
    if(harvesters.length >= 5){
        //如果升级型劳工多余3个，创建剪造型劳工，否则升级型劳工
        //自动创建升级型型劳工
            if(upgrader.length < 10) {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'upgrader'}});        
            }

            //判断一下当前有没有建造点（constructionSite)，动态决定需要的builder最大值
            var neededBuilders = 1;
            if(harvesters[0].room.find(FIND_CONSTRUCTION_SITES) != ''){
                //有建造点
                neededBuilders = 5;
            }
            else{
                neededBuilders = 1;
            }
            console.log('Needed Builders: ' + neededBuilders);
            //自动创建建造型劳工
            if(builder.length < neededBuilders) {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'builder'}});        
            }
    }
    if(Game.spawns['Home'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Home'].spawning.name];
        Game.spawns['Home'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Home'].pos.x + 1, 
            Game.spawns['Home'].pos.y, 
            {align: 'left', opacity: 0.8});
    }


    //统计管理劳工当前工作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
    }

    //统一管理功能性建筑当前工作
    //寻找当前房间内的防御塔
    var towerID = '';
    for(var id in Game.structures){
        if(Game.structures[id].structureType == 'tower'){
            towerID = id;
        }
    }
    var tower = Game.getObjectById(towerID);
    
    //调用
    if(tower){
        constructionTower.attack(tower);
        constructionTower.repair(tower);
    }
}