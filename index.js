const axios = require('axios'),
    inquirer = require('inquirer'),
    fs = require('fs');

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
        let avatar ="![profile](" + response.data.avatar_url+")",
        displayName = "# <span style='color:" + input.color + ";'>" + response.data.name + "</span>",
        bio = "Bio: " + response.data.bio,
        userLoc = "Location: " + response.data.location,
        userRepo = "GitHub Repo: [" +response.data.name+ "'s Repo](" + response.data.html_url+")",
        publicRepos = "Public Repos: " + response.data.public_repos,
        followers = "Followers: " + response.data.followers,
        following = "Following: " + response.data.following;

        const spanStart = "<span style='font-size:14pt;'>",
        spanClose = "</span>";

        let results=displayName + "\n" + avatar + "\n\n" +spanStart + userLoc + spanClose + "\n\n"+ spanStart +bio +spanClose + "\n\n" +spanStart + userRepo + spanClose +"\n\n" + spanStart+ publicRepos + spanClose+"\n\n"+ spanStart+ followers+spanClose+"\n\n"+ spanStart + following + spanClose;
        
        fs.writeFile("profile.md",results, error =>{
            if(error){
                console.log("Unfortunately, an error occurred.")
            }else {console.log("Found a profile with that username!")}
        })
    })

})


