const batchController = require('../controllers/BatchController');
const express = require('express');
const router = express.Router();




// GET request to show the form to create a batch and list all batches
router.get('/batch/create', batchController.getCreateBatchForm);

// POST request to handle form submission to create a batch
router.post('/batch/create', batchController.createBatch);


module.exports = router;
