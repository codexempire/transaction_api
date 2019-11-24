import Mongoose from 'mongoose';
const uri = "mongodb+srv://codexempire:bardoe%123@cluster0-8kzpk.mongodb.net/test?retryWrites=true&w=majority";
export default Mongoose.connect('mongodb+srv://codexempire:bardoe123@cluster0-8kzpk.mongodb.net/test?retryWrites=true&w=majority', (err, database) => {
  if(err) console.log(err.message);
  else console.log(`Database: ${database}`)
})
