
const fs = require('fs');

// READ THE JSON DATA & THEN CONVERT IT INOT JAVASCRIPT OBJECT DATA
let users = fs.readFileSync("./data/users.json");
users = JSON.parse(users);

// Param Middleware to check what to do if id doesn't found
exports.checkId=(req,res,next,value)=>{
    value = value * 1;
    let user = users.find((user) =>  {
        if(user.id === value)
        return user;
    });
    
    if(!user){
        return res.status(404).json({
            status: "fail",
            message : `User with id ${value} is not found here`
        })
    }
    console.log(`Param middleware working fine and id is ${value}`)
    next();
    }

    exports.validateBody = (req,res,next)=>{
if(!req.body.name || !req.body.password){
    return res.status(404).json({
        status: 'fail',
        message:`Yod didn't pass all the values need`
    })
}


        next();
    };


// ROUTE HANDLER FUNCTIONS ----------------------------------------------------------------------------------------------------------------------------------
exports.getUsers = (req, res) => {
    res.status(200).json({
      status: "success",
      count : users.length,
      data: {
        users: users,
      },
    });
  };


  exports.addUser = (req , res)=>{
    const newId = users[users.length - 1].id + 1;
    const newUser = Object.assign({id:newId},req.body);
    users.push(newUser);
    fs.writeFile('./data/users.json',JSON.stringify(users) , (err)=>{
        res.status(201).json({
            status : "success",
            data : {
                user : newUser
            }
        })
    });
};


exports.getUser = (req,res)=>{
    let reqId = req.params.id * 1;
    // FOREACH CAN ALSO BE USED HERE (FIND OR FOREACH )
    let user = users.find((user) =>  {
        if(user.id === reqId)
        return user;
    });

res.status(200).json({
    status:"success",
    data:{
        user:user
    }
})
};

exports.patchUser = (req,res)=>{
    const reqId = req.params.id * 1;
    const user = users.find((user)=> {
        if(user.id === reqId){
            return user;
        }
    });

    // if(!user){
    //     return res.status(404).json({
    //         status: "fail",
    //         message : `User with id ${reqId} is not found`
    //     })
    // }
    const userIndex = users.indexOf(user);
    const updateToUser = Object.assign (user , req.body);
    users[userIndex] = updateToUser;
    console.log(users);
    fs.writeFile('./data/users.json', JSON.stringify(users) , (err)=>{
        res.status(200).json({
            status:"success",
            data:{
                user:updateToUser
            }
        })
    });
    };


    exports.putUser = (req,res)=>{
        const reqId = req.params.id * 1;
        const user = users.find((user)=>{
            if(user.id === reqId){
                return user;
            }
        });
        // if(!user){
        //     return res.status(404).json({
        //         status : "fail",
        //         message : `User with id ${reqId} is not found`
        //     })
        // };
        
        
        const userIndex = users.indexOf(user);
        const updateToUser = Object.assign(user , req.body);
        users[userIndex] = updateToUser;
        
        fs.writeFile('./data/users.json', JSON.stringify(users) , (err)=>{
            res.status(200).json({
                status : "success",
                data:{
                    user:updateToUser
                }
            })
        })
        
            };

            exports.deleteUser = (req,res)=>{
                const reqId = req.params.id * 1;
                const user = users.find((user)=>{
                    if(user.id === reqId){
                        return user;
                    }
                });
                // if(!user){
                //     return res.status(404).json({
                //         status : "fail",
                //         message : `User with id ${reqId} is not found`
                //     })
                // };
                const userIndex = users.indexOf(user);
                
        users.splice(userIndex,1);
        
        fs.writeFile('./data/users.json', JSON.stringify(users) , (err)=>{
            res.status(204).json({
                status : "success",
                data:{
                    user:null
                }
            })
        })
        
            };