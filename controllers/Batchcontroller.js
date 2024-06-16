const Batch = require("../models/Batch");

exports.createBatch = (req, res) => {
  const { batchname } = req.body;  // Destructuring to extract 'batchname'
  
  if (!batchname) {
    return res.status(400).json({ error: 'Batch name is required' });
  }
  
  const batch = new Batch({ name: batchname });  // Using 'name' as per schema
  
  batch.save()
    .then((savedBatch) => {
      res.status(201).json({
        message: 'Batch created successfully',
        batch: savedBatch
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};
