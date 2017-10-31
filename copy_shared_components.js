var fs = require("fs-extra");

let source = './apps/shared_components'
let destinations = [
  './apps/team-app/src/components/shared',
  './apps/scoreboard/src/components/shared',
  './apps/quiz-master/src/components/shared'
]

destinations.forEach((dest) => {
  fs.copy(source, dest, function (err) {
    if (err) return console.error(err)
    console.log('success!')
  });
})


