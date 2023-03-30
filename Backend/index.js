const connect = require('./mainDB')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
connect();
const port = 5000
const app = express()




//Routes
//to use req body we need this middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());

//This is Exposed Folder For Images
app.use('/images',express.static('./Uploads/Images/'))
app.use('/images',express.static('./Uploads/Carousel/'))
app.use('/images',express.static('./Uploads/FacultyImages/'))


app.use('/api/images', require('./Routes/images_route'))
app.use('/api/announcement',require('./Routes/announcement_route'))
app.use('/auth',require('./Routes/auth_route'))
app.use('/api/carousel', require('./Routes/carousel_route'))
app.use('/api/faculty', require('./Routes/faculty_route'))


  app.listen(port, () => {
    console.log(`Data Base is On Port ${port}`)
  })
