const http = require("http");
const fs = require("fs");

let homePage = "";
let projectsPage = "";
let registrationPage = "";

let input = require("minimist")(process.argv.slice(2))
let port = input.port;


fs.readFile("home.html", (err, home) => {
    if (err)
    {
        throw err;
    }
    homePage = home;
})

fs.readFile("project.html", (err, projects) => {
    if(err)
    { 
        throw err;
    }
    projectsPage = projects
});

fs.readFile("registration.html", (err, register) => {
    if (err) throw err;
    registrationPage = register;
})

http.createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, {"Content-Type": "text/html"});
    switch(url)
    {
        case "/project":
            response.write(projectsPage);
            response.end()
            break;
        case "/registration":
            response.write(registrationPage);
            response.end();
            break;
        default:
            response.write(homePage)
            response.end();
            break;
    }
}).listen(port);