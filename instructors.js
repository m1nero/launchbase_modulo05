const fs = require('fs');
const data = require('./data.json');

exports.show = function (req, res) {
    const { id } = req.params;

    const foundIntructor = data.instructors.find(function (instructor){
        return instructor.id == id;
    })

    if (!foundIntructor) {
        return res.send("Instructor not found!")
    }
    return res.render("instructors/show", {instructor: foundIntructor});
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    for(key of keys) {
        if(req.body[key] == "") {
            return res.send('Complete tudo');
        }
    }

    let {avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(req.body.birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (){
        if (err) {
            return res.send("Write file error!");
        }
        return res.redirect("/nstructors")
    });

    //return res.send(keys);
}