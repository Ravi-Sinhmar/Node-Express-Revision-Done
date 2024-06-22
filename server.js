const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');
// LISTENING TO THE SERVER --
const PORT = 5000 || process.config.env.PORT;
 app.listen(PORT, () => {
  console.log(`Server is running at Port : ${PORT}`);
});


