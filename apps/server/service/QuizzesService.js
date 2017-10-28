'use strict';


/**
 * Get a specific quiz by id
 * Get a specific quiz by id
 *
 * id String id of the quiz you want
 * returns Quiz
 **/
exports.getQuizById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "teams" : [ {
    "password" : "password",
    "name" : "name",
    "_id" : "_id",
    "picture" : "picture"
  }, {
    "password" : "password",
    "name" : "name",
    "_id" : "_id",
    "picture" : "picture"
  } ],
  "name" : "name",
  "_id" : "_id",
  "rounds" : [ {
    "questions" : [ {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    }, {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    } ],
    "_id" : "_id",
    "categories" : [ {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    } ]
  }, {
    "questions" : [ {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    }, {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    } ],
    "_id" : "_id",
    "categories" : [ {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    } ]
  } ],
  "status" : "Open"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all quizzes
 * Get all quizzes
 *
 * returns List
 **/
exports.getQuizzes = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "password" : "password",
  "teams" : [ {
    "password" : "password",
    "name" : "name",
    "_id" : "_id",
    "picture" : "picture"
  }, {
    "password" : "password",
    "name" : "name",
    "_id" : "_id",
    "picture" : "picture"
  } ],
  "name" : "name",
  "_id" : "_id",
  "rounds" : [ {
    "questions" : [ {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    }, {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    } ],
    "_id" : "_id",
    "categories" : [ {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    } ]
  }, {
    "questions" : [ {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    }, {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    } ],
    "_id" : "_id",
    "categories" : [ {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    } ]
  } ],
  "status" : "Open"
}, {
  "password" : "password",
  "teams" : [ {
    "password" : "password",
    "name" : "name",
    "_id" : "_id",
    "picture" : "picture"
  }, {
    "password" : "password",
    "name" : "name",
    "_id" : "_id",
    "picture" : "picture"
  } ],
  "name" : "name",
  "_id" : "_id",
  "rounds" : [ {
    "questions" : [ {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    }, {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    } ],
    "_id" : "_id",
    "categories" : [ {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    } ]
  }, {
    "questions" : [ {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    }, {
      "questionId" : {
        "question" : "question",
        "answer" : "answer",
        "_id" : "_id",
        "category" : {
          "name" : "name",
          "_id" : "_id"
        }
      },
      "answers" : [ {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      }, {
        "approved" : true,
        "answer" : "answer",
        "teamId" : {
          "password" : "password",
          "name" : "name",
          "_id" : "_id",
          "picture" : "picture"
        }
      } ],
      "status" : "Open"
    } ],
    "_id" : "_id",
    "categories" : [ {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    }, {
      "name" : "name",
      "_id" : "_id"
    } ]
  } ],
  "status" : "Open"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

