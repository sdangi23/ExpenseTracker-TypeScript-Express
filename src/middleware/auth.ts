import jwt from 'jsonwebtoken';
import User from '../Models/users';
import { RequestHandler } from 'express';



const authenticate: RequestHandler = (req, res, next) => {

    try {
        const token = req.header('authorization');

        const userid = Number(jwt.verify(token, process.env.TOKEN_SECRET));

        User.findByPk(userid).then(user => {

            req.user = user;

            console.log('-------------------- Authentication Done ----------------------');

            next();
        })
        .catch((err: string | undefined) => { throw new Error(err)})

      } catch(err) {

        return res.status(401).json({success: false})
      }

}

const authenticatemiddleware ={
  authenticate
}

export default authenticatemiddleware;