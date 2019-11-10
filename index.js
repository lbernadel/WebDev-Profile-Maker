var axios = require('axios');
var inquirer = require('inquirer');
var fs = require('fs');

inquirer
.prompt([
    {
        type:"input",
        message: "What is your Github username?",
        name:"username"
    },
    {
        type:"list",
        message: "What is your favorite color?",
        name:"color",
        choices:["red", "blue", "pink", "green", "purple", "orange"]
    }

]).then(input => {
    axios
    .get('https://api.github.com/users/' + input.username)
    .then(response =>{
        console.log(response)
        let avatar ="![profile](" + response.data.avatar_url+")",
        displayName = "# <span style='color:" + input.color + ";'>" + response.data.name + "</span>",
        bio = "<span style='font-size:18pt;'>Bio: " + response.data.bio + "</span>";



        let results=displayName + "\n" + avatar + "\n\n" +bio;
        fs.writeFile("profile.md",results, error =>{
            if(error){
                console.log("failed")
                throw(error)
            }
            console.log("success")
        })
    })

})

// Profile image
// User name
// Link to User GitHub profile
// location 
// User bio
// Number of public repositories
// Number of followers
// Number of users following


