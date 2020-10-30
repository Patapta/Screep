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
        let distance = 0,
            result = targets_Arr[0];
        for (let i = 0;i < targets_Arr.length;i++){
            distance = this.getDistanceByPos(creep.pos.x, creep.pos.y, targets_Arr[i].pos.x, targets_Arr[i].pos.y);
            if (distance > result){
                result = targets_Arr[i];
            }
        }
        return result;
    }
}