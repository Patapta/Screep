/**
 * creat creeps automatically
 * role.harvester
 */

const config = require('config');


var creeps_create = {
    /** @param {Creep} creep **/
    create: function() {
        //census harvester
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvester: ' + harvesters.length);

        //census upgraders
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader: ' + upgraders.length);

        //census builders
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder: ' + builders.length);

        //create harvester automatically
        if(harvesters.length < config.harvesters_number) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Home1'].spawnCreep(this.get_creep_components('harvester', harvesters.length), newName,
                {memory: {role: 'harvester'}});
        } else {//create the upgrader and builder when harvesters are enough
            //create upgrader automatically
            if(upgraders.length < config.upgraders_number) {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Home1'].spawnCreep(this.get_creep_components('upgrader'), newName,
                    {memory: {role: 'upgrader'}});
            }else {
                //create builder dynamically
                var neededBuilders = 0;
                if(harvesters[0].room.find(FIND_CONSTRUCTION_SITES) != ''){
                    //if there is building in need
                    neededBuilders = config.builders_in_need;
                }
                else{
                    neededBuilders = config.buliders_idle;
                }
                console.log('Needed Builders: ' + neededBuilders);
                //create builder automatically
                if(builders.length < neededBuilders) {
                    var newName = 'Builder' + Game.time;
                    console.log('Spawning new builder: ' + newName);
                    Game.spawns['Home1'].spawnCreep(this.get_creep_components('builder'), newName,
                        {memory: {role: 'builder'}});
                }
            }
        }

        //Show infomation about producing creeps which is doing by spawn
        if(Game.spawns['Home1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Home1'].spawning.name];
            Game.spawns['Home1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Home1'].pos.x + 1,
                Game.spawns['Home1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    },

    //ergod the different creep's components
    get_creep_components: function(role, harvesters_number) {
        templateResult = [];
        switch (role){
            case 'harvester':
            default:
                if (harvesters_number < 3){//emergency
                    template = [[WORK],[CARRY],[MOVE]];
                    break;
                }
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
                templateResult.push(template[i][0]);
            }
        }
        return templateResult;
    }
};

module.exports = creeps_create;
