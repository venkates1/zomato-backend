const MealType = require('../Models/MealTypes');

exports.getMealTypes = (req, res) => {
    MealType.find()
    .then(response =>  {
        res.status(200).json({message:"MealTypes Fetched Successfully", mealTypes: response})
    }) 
    .catch(err => res.status(500).json(err))
}