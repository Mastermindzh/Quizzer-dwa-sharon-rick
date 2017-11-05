var config = {
  db: "Quizzer",
  dbhost: "mongodb://mongo/"
}

if(process.env.NODE_ENV === 'test'){
  config.db = "Quizzer-test"
  config.dbhost = "localhost:8009"
}

module.exports = config
