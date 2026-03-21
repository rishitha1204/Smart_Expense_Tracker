import Expense from "../models/expense.model.js";

export const createExpense = async (req,res)=>{

  try{

    const {title,amount,category,type,date} = req.body;

    const expense = await Expense.create({

      user:req.user._id,   // important
      title,
      amount,
      category,
      type,
      date

    });

    res.status(201).json(expense);

  }catch(err){

    res.status(500).json({message:err.message});

  }

};

export const getExpenses = async (req,res)=>{

  try{

    const expenses = await Expense.find({

      user:req.user._id

    }).sort({date:-1});

    res.json(expenses);

  }catch(err){

    res.status(500).json({message:err.message});

  }

};

export const addExpense = async (req, res) => {

  try {

    const { title, amount, category, type, date } = req.body;

    const expense = new Expense({
      title,
      amount,
      category,
      type,
      date
    });

    const savedExpense = await expense.save();

    res.status(201).json(savedExpense);

  } catch (error) {

    console.error(error);

    res.status(500).json({ message: error.message });

  }

};