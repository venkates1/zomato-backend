const locationsData = require('../Models/Locations');

exports.getLocations = (req,res) => {
    locationsData.find().then(response => {
        res.status(200).json({
            message:'Locations Fetched Successfully', locations: response
        });
    })
    .catch(err => {
        res.status(500).json(err)
    })
    
}