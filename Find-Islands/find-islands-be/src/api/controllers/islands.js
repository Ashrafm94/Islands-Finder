
//finding islands in given matrix
const findIslands = (matrix) => {
    try{
        let islandsCount = 0;
        let visited = {};
        let islandsCoords = {};

        for (let i = 0; i < matrix.length; i++){
            for (let j = 0; j < matrix[i].length; j++){
                if (matrix[i][j] === 1 && !visited[`${i},${j}`]){
                    islandsCount++;
                    findIslandsRec(matrix, i, j, visited, islandsCoords, islandsCount);
                }
            }
        }
        
        return {
            success: true,
            count: islandsCount,
            coords: islandsCoords
        } 

    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: e
        }
    }
}

//recursive function which loop throgh all possible 
//options of the given cell
const findIslandsRec = (matrix, i, j, visited, coords, id) => {
    /**
     * ALL POSSIBLE OPTIONS
     * 
     * (i - 1, j - 1) , (i - 1, j) , (i - 1, j + 1)
     * (i, j - 1) , (i, j) , (i, j + 1)
     * (i + 1, j - 1) , (i + 1, j) , (i + 1, j + 1)
     */
    let allPossibles = [
        [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
        [i, j - 1], [i, j + 1],
        [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
    ];

    //set visited to current coordinates
    visited[`${i},${j}`] = true;

    let relatedCoords = [];

    //check if we have visit this island before
    //if yes, get all coordinates of this island
    if (coords[`${id}`]) {
        relatedCoords = coords[`${id}`];
    }

    //modify the islands coordinates
    relatedCoords.push({i, j});
    coords[`${id}`] = relatedCoords;
    
    //loop through all possible options
    for (let i = 0; i < allPossibles.length; i++){
        if (isNeedToVisitThisCell(matrix, allPossibles[i][0], allPossibles[i][1], visited)) {
            findIslandsRec(matrix, allPossibles[i][0], allPossibles[i][1], visited, coords, id)
        }
    }
}

//check if the given cell need to be visited 
const isNeedToVisitThisCell = (matrix, i, j, visited) => {
    //check if i, j is invalid boundries 
    //and the current cell has 1
    //and this cell has not been visited yet
    return i >= 0 && j >= 0 && i < matrix.length && j < matrix[0].length && matrix[i][j] === 1 && !visited[`${i},${j}`]
}

module.exports = {
    findIslands
}