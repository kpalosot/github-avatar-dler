var request = require("request");
const secret = require("./secrets");
const fs = require("fs");
var myArgs = process.argv.slice(2);

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
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
    .on('error', (err) => {
      throw err;
    })
    .pipe(fs.createWriteStream(`./${filePath}`));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach((e) => {
    console.log(e.avatar_url);
  });
});

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg");

