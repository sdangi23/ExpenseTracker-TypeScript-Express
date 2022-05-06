import { RequestHandler } from 'express';


import User from '../Models/users';
// import Expense from '../Models/expense';
import Order from '../Models/order';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function generateAccessToken(id: Number){
    return jwt.sign(id, "secretkey");
}

const signUp: RequestHandler = (req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const password = req.body.password;

    const saltRounds = 10;
    

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            if(err){
                res.json({message: 'Unable to create new user'})
            }
            User.create({ name, email, contact, password: hash }).then(() => {
                res.status(201).json({message: 'Successfuly created new user'})

            }).catch((err: { errors: { message: any; }[]; }) => {

                res.status(403).json(err.errors[0].message);
            })

        });
    });
}

const login = (req: { body: { email: any; password: any; }; }, res: { json: (arg0: { success: boolean; message: string; token?: string; user?: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): any; new(): any; }; }; }, next: any) => {
    
    const email= req.body.email;
    const password = req.body.password;
    User.findAll({where: {email:email}}).then((user: { id: Number; }[]) => {
        if(user[0] != undefined){
            bcrypt.compare(password, user[0].password, (err, response) => {
                if(err){
                    return res.json({success: false, message: 'Something went wrong'});
                }
                if(response){

                    const jwtToken = generateAccessToken(user[0].id);

                    res.json({token: jwtToken, success: true, message: 'Successfully logged In' , user: user})
                }
                else{
                    return res.status(401).json({success: false, message: 'Password does not match'});
                }
            })
        }
        else{
            return res.status(404).json({success: false, message: 'User Not Found'})
        }
    })
    .catch((err: any) => {
        console.log(err);
    })
    
}

const checkPremium = async (req: { user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: any) => {

        const id = req.user.id;
        Order.findAll( {where: {userId: id}} )
        .then( (user: undefined[]) => {
            if(user[0] != undefined){
                return res.status(200).json({ message: "premium user" });
            }else{
                return res.status(404).json( {message: 'This User is Not a Premium Member yet'});
            }
        }).catch ((err: any) => {
        console.log(err);
         });
}

const getUserExpenses = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { finalarr: any[]; }): void; new(): any; }; }; }, next: any) => {

    try {
        const dbusers = await User.findAll();

        var finalarr: any[][]=[];
        let i=0;

        await Promise.all(

            dbusers.map(async (user: { getExpenses: () => any; }) => {
                
                let eachUserArr: any[] = [];

                try {
                    console.log("----------------inside 2nd try block...")

                    const dbexpenses = await user.getExpenses();
                    dbexpenses.forEach((expense: any) => {
                        eachUserArr.push(expense);
                    });
                } catch (err) {
                    console.log(err);
                }
                finalarr.push(eachUserArr);
            }
            
            ));

        res.status(200).json({ finalarr });
    }
    catch (err) {
        console.log('err >> ', err);
    }
}

exports.getPassword = (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; }): any; new(): any; }; }; }, next: any) => {
    return res.status(200).json( {success: true , message: 'Nahi Bataunga Password'});
}

const userController = {
    signUp,
    login,
    checkPremium,
    getUserExpenses
}

export default userController;
