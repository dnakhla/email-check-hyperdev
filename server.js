// server.js
// where your node app starts

// init project
const express = require('express');
const verifier = require('email-verify');
const app = express();
const bodyParser = require('body-parser');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.post('/check', function (request, response) {
    var emailAddress = request.body.email;
    var result = {
        email: emailAddress
    };
    if (typeof emailAddress == 'undefined') {
        return response.json(Object.assign(result, {
            result: false,
            error: "no email"
        }));
    }
    return verifier.verify(emailAddress, function (err, data) {
        if (err) {
            return response.json(Object.assign(result, {
                result: false,
                error: err
            }));
        } else {
            return response.json(Object.assign(result, {
                result: data.success
            }));
        }
    });
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, function () {
    console.log('Your app is listening on port ' + listener.address()
        .port);
});
