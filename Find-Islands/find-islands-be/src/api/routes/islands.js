const express = require('express');
const { findIslands } = require('../controllers/islands');
const router = express.Router();

/**
 * This Router responsible for finding the amount 
 * of islands and return the indexes of each island
 */
router.post("/find", (req, res) => {
    try{
        let matrix = req.body.matrix || [];
        const result = findIslands(matrix);
        res.status(200).json(result)
    } catch(e){
        console.log(e)

        res.status(200).json({
            success: false,
            message: e
        })
    }
});

module.exports = router;