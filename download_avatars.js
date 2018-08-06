var request = require("request");
var myArgs = process.argv.slice(2);

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors_url`,
    headers: {
      'User-Agent': 'application/json'
    }
  };

  request(options, (err, res, body) => {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

