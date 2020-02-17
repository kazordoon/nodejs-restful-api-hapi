const mongoose = require('mongoose')

module.exports = (url) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`))
}
