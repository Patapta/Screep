const mountCreepExtension = require('Creep_Extension');

// mount the prototype and function
function mount() {
    global.hasExtension = true
    mountCreepExtension();
}

module.exports = function () {
    if (!global.hasExtension) {
        mount();
    }
}