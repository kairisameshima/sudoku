const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/validate', (req, res) => {
  var spawn = require("child_process").spawn;
  var process = spawn('python', ["scripts/validate.py", req.body.cells]);

  // Takes stdout data from script which executed with arguments and send this data to res object 
  process.stdout.on('data', function (data) {
    res.json({ message: data.toString() });
  })
})

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);