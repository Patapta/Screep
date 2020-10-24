//tower class

var constructionTower = {
    attack: function(tower){
        //attack the closest enemy
        var hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(hostile){
            tower.attack(hostile);
        }

    },

    repair: function(tower){
        //repaid the closest building
        if(tower.store[RESOURCE_ENERGY] > 0){
            var damage = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < (0.9*structure.hitsMax)
            });
            if(damage){
                tower.repair(damage);
            }
        }

    }
}

module.exports = constructionTower;