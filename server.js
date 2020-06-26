const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require("./data");

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true

})

server.get("/video", function(req, res) {
    const id= req.query.id;
    const video = videos.find(function(video) {
        if (video.id == id) {
            return true;
        }
    })
    if (!video) {
        return res.send("Video not found!")
    }
    return res.render("video", { item: video })

})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/50376581?s=460&u=209665a8fe4427fbe991b3a50bc6d47a3ea0b722&v=4",
        name: "Victor Monteiro",
        role: "m1nero - Junior Web Dev",
        description: "Estudante 4º semestre de Analise e desenvolvimento de sistemas buscando vaga de Junior Dev",
        links: [
            { name: "Twitter", url: "https://twitter.com/m1ner0" },
            { name: "Github", url: "https://github.com/m1nero" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/victor-montteiro/" },
        ]
    }
    return res.render("about", { about });
})

server.get("/portifolio", function(req, res) {
    return res.render("portifolio", { items: videos });
})

server.listen(5000, function() {
    console.log("server is running");
})