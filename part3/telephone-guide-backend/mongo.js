const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://divierremedios:${password}@phonebookcluster.j7runvj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 5){
  const newContact = new Contact(
    {
      name: process.argv[3],
      number: process.argv[4]
    }
  )
  newContact.save().then(result =>{
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  })
}
else if(process.argv.length === 3){
  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(contact => console.log(contact.name, contact.number))
    mongoose.connection.close()
  })
}
else {
  console.log('faltan parametros')
  mongoose.connection.close()
}