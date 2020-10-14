/**
 * 自动生产弔虫相关模块
 * role.harvester
 */

const config = require('config');


var creeps_create = {
    /** @param {Creep} creep **/
    create: function() {
        //统计劳作型劳工
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvester: ' + harvesters.length);

        //统计升级型劳工
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader: ' + upgrader.length);

        //统计建造型劳工
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder: ' + builder.length);

        //统计运输型劳工
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        console.log('Transporter: ' + transporter.length);

        //自动创建劳作型劳工
        if(harvesters.length < config.harvesters_number) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Home1'].spawnCreep(this.get_creep_components('harvester'), newName,
                {memory: {role: 'harvester'}});
        } else {//只有在劳作型劳工足够的情况下再创建其他劳工
            //自动创建升级型型劳工
            if(upgrader.length < config.upgraders_number) {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Home1'].spawnCreep(this.get_creep_components('upgrader'), newName,
                    {memory: {role: 'upgrader'}});
            }else {
                //判断一下当前有没有建造点（constructionSite)，动态决定需要的builder最大值
                var neededBuilders = 0;
                if(harvesters[0].room.find(FIND_CONSTRUCTION_SITES) != ''){
                    //有建造点
                    neededBuilders = config.builders_in_need;
                }
                else{
                    neededBuilders = config.buliders_idle;
                }
                console.log('Needed Builders: ' + neededBuilders);
                //自动创建建造型劳工
                if(builder.length < neededBuilders) {
                    var newName = 'Builder' + Game.time;
                    console.log('Spawning new builder: ' + newName);
                    Game.spawns['Home1'].spawnCreep(this.get_creep_components('builder'), newName,
                        {memory: {role: 'builder'}});
                }
            }
        //自动创运输造型劳工
        // if(upgrader.length < 10) {
        //     var newName = 'Transporter' + Game.time;
        //     console.log('Spawning new Transporter: ' + newName);
        //     Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE], newName,
        //         {memory: {role: 'transporter'}});
        // }
        }

        //母巢生产弔虫显示
        if(Game.spawns['Home1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Home1'].spawning.name];
            Game.spawns['Home1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Home1'].pos.x + 1,
                Game.spawns['Home1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },

    get_creep_components: function(role) {
        switch (role){
            case 'harvester':
            default:
                template = config.harvesters_components;
                break;
            case 'upgrader':
                template = config.upgraders_components;
                break;
            case 'builder':
                template = config.builders_components;
                break;
        }
        for (let i = 0; i < template.length; i++) {
            for (let j = 0; j < template[i][1]; j++) {
                this.templateResult.push(template[i][0]);
            }
        }
        return this.templateResult;
    }
};

module.exports = creeps_create;
