const Batch = require('../Modal/Batch');

// Function to show the batch form and list all batches
exports.getCreateBatchForm = async (req, res) => {
    try{
     const batches = await Batch.find();
     res.render('batch/createBatch', { batches });
    }
    catch(error){
        res.status(500).send({ message: error.message });
    }
}

// Function to handle the creation of a new batch
exports.createBatch = async (req, res) => {
    try {
        const { batchName } = req.body;
        const newbatch = new Batch({ batchName });
        await newbatch.save();
        res.redirect('/batch/create');
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Function to list all batches
// exports.getAllBatches = async (req, res) => {
//     try {
//         const batches = await Batch.find();
//         res.render('batch/showBatches', { batches });
//     } catch (error) {
//         res.status(500).send({ message: error.message });   
//     }
// }