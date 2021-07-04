const User = require('../Models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email})
    .exec((error, user) => {
        if(user) 
        return res.status(400).json({
            message:'User already registered'
        });

        //object destructuring
        const { firstname, lastname, email, password } = req.body;
        const _user = new User({
            firstname, 
            lastname, 
            email, 
            password, 
            username: Math.random().toString(),
            
        });

        _user.save((error, data)=> {
            if (error) {
                return res.status(400).json({
                    message:'Something went wrong'
                });
            }
            if (data) {
                return res.status(201).json({
                    message:'User Created Successfully',
                    user: data
                })
            }
        })

    }) 
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user) {
          if (user.authenticate(req.body.password)){
              const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'});
              const { _id, firstname, lastname, email} = user;
              res.status(200).json({
                  message:'User Login Successful',
                  token:token,
                  user:{
                      _id, firstname, lastname, email
                  }
              })

    }
        } else {
        return res.status(400).json({ message:'Something went wrong' });
        }
});
}

