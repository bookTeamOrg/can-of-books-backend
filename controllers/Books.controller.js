const {userModel} =require('../model/Customer.model');

const getBooks = async (req, res)=>{
    const {email} = req.query;

    userModel.findOne({email:email},(e,customer)=>{
        // findOne will find  a user data that matches the email 
        customer===null?res.send('No Data'): res.json(customer.books);
    });

};

const createBook = async (req, res) => {
    // console.log("=======");
    // To access the body data you will first need to decode the body data
    // console.log(req.body);
    // after decoding we need to assign the values to variables from the request body
    const {
      
      title,
      description,
      status
    } = req.body;
  
    // create the new cat 
    const newBookObj = new userModel({
        title: title,
        description:description,
        status:status,
    });
    newBookObj.save();
  
    res.json(newBookObj);
  }

  const deleteBook = async (req,res) =>{
      const bookId = req.params.id;
      userModel.deleteOne({_id:bookId},(error,deleted)=>{
          res.send(deleted);
      });
  }
module.exports ={getBooks,
    createBook,
    deleteBook

};
