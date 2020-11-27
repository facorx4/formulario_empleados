const mongoose = require('mongoose')
const { FORMULARIO_MONGODB_HOST, FORMULARIO_MONGODB_DATABASE } = process.env

const MONGODB_URI = `mongodb+srv://${FORMULARIO_MONGODB_HOST}/${FORMULARIO_MONGODB_DATABASE}`

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err))
