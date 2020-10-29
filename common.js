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
     * @returns {number} the distance of A and B
     */
    getDistanceByPos(ax, ay, bx, by){
        let distance = Math.pow(ax-bx,2)+Math.pow(ay-by,2);
        return distance;
    }
}