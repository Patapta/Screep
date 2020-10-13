

// 自定义的 Creep 的拓展
const creepExtension = {
    work() {
        switch (this.memory.role ) {
            case ('harvester'):
                console.log('i am harvester');
                break;
            default:
                console.log('i am harvester');
                break;
            case ('upgrader'):
                console.log('i am upgrader');
                break;
            case ('builder'):
                console.log('i am builder');
                break;
        }
    },
}

// 将拓展签入 Creep 原型
module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}