require("dotenv").config();

const config ={
    githubClient: process.env.GITHUB_CLIENT_ID,
    githubSecret: process.env.GITHUB_CLIENT_SECRET
}

module.exports = {config}