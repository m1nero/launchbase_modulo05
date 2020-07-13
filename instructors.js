const fs = require('fs');
const data = require('./data.json');
const {age, date, created_at} = require('./utils');

exports.show = function (req, res) {
    const { id } = req.params;

    const foundIntructor = data.instructors.find(function (instructor){
        return instructor.id == id;
    })

    if (!foundIntructor) {
        return res.send("Instructor not found!")
    }

    const instructor = {
        ...foundIntructor,
        age: age(foundIntructor.birth),
        services: foundIntructor.services.split(","),
        created_at: created_at(foundIntructor.created_at)/*new Intl.DateTimeFormat("UTC").format(foundIntructor.created_at)*/
    }
    return res.render("instructors/show", {instructor});
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
        return res.redirect("/instructors")
    });

    //return res.send(keys);
}

exports.edit = function (req, res) {
    const { id } = req.params;

    const foundIntructor = data.instructors.find(function (instructor){
        return instructor.id == id;
    })

    if (!foundIntructor) {
        return res.send("Instructor not found!")
    }

    const instructor = {
        ...foundIntructor,
        birth: date(foundIntructor.birth)
    }

    return res.render('instructors/edit', {instructor})
}

exports.put = function (req, res) {
    const { id } = req.body;
    let index = 0;

    const foundIntructor = data.instructors.find(function (instructor, foundIndex){
        if (id == instructor.id){
            index = foundIndex;
            return true;
        }
    })

    if (!foundIntructor) {
        return res.send("Instructor not found!")
    }

    const instructor = { 
        ...foundIntructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.instructors[index];
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) {
            return res.send("Write error!")
        }
        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body;
    
    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id;
    })

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) {
            return res.send("Write file error")
         }
         return res.redirect("/instructors");
    })
}