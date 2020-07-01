const fs = require('fs');
const data = require('./data.json');

exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send('Complete tudo');
        }
    }

    data.instructors.push(req.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (){
        if (err) {
            return res.send("Write file error!");
        }
        return res.redirect("/nstructors")
    });

    //return res.send(keys);
}