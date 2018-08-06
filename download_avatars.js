var request = require("request");
const fs = require("fs");
var myArgs = process.argv.slice(2);
require("dotenv").config();

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){
  if(!repoOwner || !repoName){
    console.log("Request denied.");
    console.log("Usage: node download_avatars.js <repository owner> <repository name>");
    return;
  }
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      "User-Agent": "request",
      "Authorization": process.env.GITHUB_TOKEN
    }
  };

  request(options, (err, res, body) => {
    if (err){
      throw err;
    }

    var buffer = JSON.parse(body);
    cb(err, buffer);

  });
}

function downloadImageByURL(url, filePath){
  request(url)
    .on("error", (err) => {
      throw err;
    })
    .pipe(fs.createWriteStream(`./${filePath}`));
}

getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
  console.log("Errors:", err);

  if(!fs.existsSync("./avatars")){
    fs.mkdirSync("./avatars");
  }

  result.forEach((e) => {
    downloadImageByURL(e.avatar_url, `./avatars/${e.login}`);
  });

});

