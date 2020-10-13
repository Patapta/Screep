const mountCreepExtension = require('Creep_Extension');

// 挂载所有的额外属性和方法
function mount() {
    global.hasExtension = true
    mountCreepExtension();
}

module.exports = function () {
    if (!global.hasExtension) {
        mount();
    }
}