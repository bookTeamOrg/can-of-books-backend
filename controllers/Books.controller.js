const {userModel} =require('../model/Customer.model');

const getBooks = async (req, res)=>{
    const {email} = req.query;

    userModel.findOne({email:email},(e,customer)=>{
        // findOne will find  a user data that matches the email 
        customer===null?res.send('No Data'): res.json(customer.books);
    });

};
module.exports ={getBooks};
