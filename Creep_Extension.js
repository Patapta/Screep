var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder');

// 自定义的 Creep 的拓展
const creepExtension = {
    work() {
        switch (this.memory.role ) {
            case ('harvester'):
                console.log(888);
                console.log(this);
                console.log(888);
                roleHarvester.run(this);
                break;
            default:
                roleHarvester.run(this);
                break;
            case ('upgrader'):
                roleUpgrader.run(this);
                break;
            case ('builder'):
                roleBuilder.run(this);
                break;
        }
    },
}

// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}