var roleHarvester = require('role.harvester'),
    roleUpgrader = require('role.upgrader'),
    roleBuilder = require('role.builder');

// define the prototype of creep
const creepExtension = {
    work() {
        switch (this.memory.role ) {
            case ('harvester'):
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

// sign the extension into creep prototype
module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}