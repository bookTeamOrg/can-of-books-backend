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

  const updateBook = async (req, res) => {

    const bookId = req.params.id; // the passed cat ID in the params
  
    const {
        title,
        description,
        status,

    } = req.body;
  
    // by default the findByIdAndUpdate method will return the old data even if it got updated
    // therefore we need to provide a flag to tell the method to return the new updated data
    userModel.findByIdAndUpdate(
      { _id: bookId }, // the id of the item we want to find
      {
        title: title,
        description: description,
        status: status,
      }, // will be the list of new data we want to update
      { new: true }, // the flag to tell the method to return the new updated data
      (err, data) => {
        res.json(data);
      }
    )
  
  }
  
module.exports ={getBooks,
    createBook,
    deleteBook,
    updateBook,

};
