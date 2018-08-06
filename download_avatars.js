var request = require("request");
const secret = require("./secrets")
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
    var buffer = JSON.parse(body);
    cb(err, buffer);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach((e) => {
    console.log(e.avatar_url);
  });
});

