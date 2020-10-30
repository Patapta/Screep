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
        var min_distance = 100000;
        console.log(123);
        console.log(targets_Arr.length);
        for (let i = 0;i < targets_Arr.length;i++){
            let distance = this.getDistanceByPos(creep.pos.x, creep.pos.y, targets_Arr[i].pos.x, targets_Arr[i].pos.y);
            console.log(min_distance);
            console.log(1);
            console.log(distance);
            console.log(2);
            if (distance < min_distance){
                min_distance = distance;
                result = targets_Arr[i];
            }
        }
        console.log(123);
        return result;
    }
}
module.exports = common;