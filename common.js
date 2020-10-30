/**
 * common class
 * common functions
 */
var common = {
    /**
     *
     * @param ax  pos.x of coordinateA
     * @param ay  pos.y of coordinateA
     * @param bx  pos.x of coordinateB
     * @param by  pos.y of coordinateB
     * @returns {number} return the distance of A and B
     */
    getDistanceByPos : function (ax, ay, bx, by){
        let distance = Math.pow(ax-bx,2)+Math.pow(ay-by,2);
        return distance;
    },

    /**
     *
     * @param targets_Arr
     * @param creep
     * @returns {number} return the closest structure by distance with the creep
     */
    closest_structure : function (targets_Arr, creep) {
        let result = targets_Arr[0];
        var min_distance = 99999;
        for (let i = 0;i < targets_Arr.length;i++){
            let distance = this.getDistanceByPos(creep.pos.x, creep.pos.y, targets_Arr[i].pos.x, targets_Arr[i].pos.y);
            if (distance < min_distance){
                min_distance = distance;
                result = targets_Arr[i];
            }
        }
        return result;
    },
    /**
     *Statistics
     */
    stateScanner : function () {
        // run it each 20 ticks
        if (Game.time % 20) return

        if (!Memory.stats) Memory.stats = {}

        // get gcl and gpl
        Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100
        Memory.stats.gclLevel = Game.gcl.level
        Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100
        Memory.stats.gplLevel = Game.gpl.level
        // get cpu
        Memory.stats.cpu = Game.cpu.getUsed()
        // get bucket
        Memory.stats.bucket = Game.cpu.bucket
    }
}
module.exports = common;