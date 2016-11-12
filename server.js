const express = require('express');
const app = express();

app.use('/', express.static(__dirname+'/app'));

const port = process.env.PORT || 3031;
app.listen(port);
console.log('Server is at port:'+port);
