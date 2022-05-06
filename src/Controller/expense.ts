import Expense from '../Models/expense';
import UserServices from '../Services/UserServices';
import S3Services from '../Services/S3Services';
import AWS from 'aws-sdk';
import { RequestHandler } from 'express';


const addExpense: RequestHandler = (req, res) => {
    const expenseAmount = req.body.expenseAmount;
    const description = req.body.description;
    const category = req.body.category;

    req.user.createExpense({
        expenseAmount: expenseAmount,
        description: description,
        category: category
    }).then(expense => {
        return res.status(201).json({expense, success: true, message: 'Expense Added successfully to DB'})
    }).catch(err => {
        return res.status(403).json({err, success:false , message: 'Error Occured while adding to DB'});
    })
}
const getexpenses: RequestHandler = async (req, res, next) => {

    const items_perpage = Number(req.query.row);    
    
    const page= req.query.page || 1 ;
    let totalitems=0
    const userId=req.user.id;
    const expcount=await Expense.count({where:{UserId:userId}})
    const hasnextpage=items_perpage*page<expcount;
    const haspreviouspage=page>1;
    const nextpage=Number(page)+1;
    const previouspage=Number(page)-1;
    const lastpage=Math.ceil(expcount/items_perpage)
    let obj={
      currentpage:Number(req.query.page),
      hasnextpage:hasnextpage,
      haspreviouspage:haspreviouspage,
      nextpage:nextpage,
      previouspage:previouspage,
      lastpage:lastpage
  }



req.user.getExpenses({offset:(page-1)*items_perpage,limit:items_perpage}).then((expenses)=>{
        res.json({expenses,success:true,obj})

    }).catch(err=>console.log(err))
}

const deleteexpense: RequestHandler = (req, res) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({where:{id:expenseid}}).then(() => {
        return res.status(204).json({success:true, message:"Deleted Successfully"});
    }).catch(err => {
        console.log(err);
        return res.status(403).json({success:true,message:'Failed'});
    })
}

const download: RequestHandler = async (req,res) => {
    const expenses = await UserServices.getExpenses(req);
    const SringifyExpense = JSON.stringify(expenses);
    const filename=`Expense${req.user.dataValues.id}/${new Date()}.txt`
    const fileURL = await S3Services.uploadtoS3(SringifyExpense, filename);
    res.status(200).json({fileURL:fileURL, success:true, message:'Download is Ready'});
}

const expenseController = {
    addExpense,
    getexpenses,
    deleteexpense,
    download
}

export default expenseController;