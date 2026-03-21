import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  title:{
    type:String,
    required:true
  },

  amount:{
    type:Number,
    required:true
  },

  category:{
    type:String
  },

  type:{
    type:String,
    enum:["income","expense"],
    default:"expense"
  },

  date:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.model("Expense",expenseSchema);