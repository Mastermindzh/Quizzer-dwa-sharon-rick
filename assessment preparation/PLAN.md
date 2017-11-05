# Showing the quizzer app
Make sure you are on the **latest** master branch and that you ran `npm install` in the root folder before running the demo.

<!-- toc -->

- [Setting up](#setting-up)
- [Testing](#testing)
  * [1. Register a team](#1-register-a-team)
  * [2. Create a quiz](#2-create-a-quiz)
  * [3. Apply both teams for the quiz](#3-apply-both-teams-for-the-quiz)
  * [4. Accept both teams for the quiz](#4-accept-both-teams-for-the-quiz)
  * [5. Show that both team apps have started](#5-show-that-both-team-apps-have-started)
  * [6. Start the quizz](#6-start-the-quizz)
  * [7. Select 3 categories](#7-select-3-categories)
  * [8. Start round](#8-start-round)
  * [9. Add a question to the round](#9-add-a-question-to-the-round)
  * [10. Run the ` node fillDatabase.js` command](#10-run-the--node-filldatabasejs-command)
  * [11. Start a question](#11-start-a-question)
  * [12. Go to the tab with the `sharon` team and enter a **wrong** answer](#12-go-to-the-tab-with-the-sharon-team-and-enter-a-wrong-answer)
  * [13. Go to the tab with the `rick` team and enter the correct answer](#13-go-to-the-tab-with-the-rick-and-enter-the-correct-answer)
  * [14. Show that the scoreboard updated (yellow boxes)](#14-show-that-the-scoreboard-updated-yellow-boxes)
  * [15. Close Question](#15-close-question)
  * [16. Approve the wrong answer team `sharon` gave.](#16-approve-the-wrong-answer-team-sharon-gave)
  * [17. Start the new question and show that everything updated](#17-start-the-new-question-and-show-that-everything-updated)
  * [18. Explain that we have a sample dataset which shows that we can resume a quiz + show that we can win a quiz.](#18-explain-that-we-have-a-sample-dataset-which-shows-that-we-can-resume-a-quiz--show-that-we-can-win-a-quiz)
  * [19. Run the ` npm run seed ` command in the root directory](#19-run-the--npm-run-seed--command-in-the-root-directory)
  * [20. Log the scoreboard in to the avengers quiz (code: 1a2b3c)](#20-log-the-scoreboard-in-to-the-avengers-quiz-code-1a2b3c)
  * [21. Log Team1 in to the avengers quiz (Team1, 1234, 1a2b3c)](#21-log-team1-in-to-the-avengers-quiz-team1-1234-1a2b3c)
  * [21. Close the currently running quizz](#21-close-the-currently-running-quizz)
  * [22. Team3 should have won, Team1 should be second and the third place goes to team2.](#22-team3--should-have-won-team1-should-be-second-and-the-third-place-goes-to-team2)
  * [23. Run the `npm test` command in the server directory to show that all tests pass.](#23-run-the-npm-test-command-in-the-server-directory-to-show-that-all-tests-pass)

<!-- tocstop -->

## Setting up

1. Open up the project in your code editor
2. in the root folder execute: `npm run docs`
3. in the root folder execute: `docker-compose up`
4. in the preparation folder execute: `node clearDatabase.js`
5. register a team called `sharon` with the password `123` and use the [images/team1.jpg](images/team1.jpg) image.
6. Start Robo3T and connect to `localhost:8009`
7. Open up the following browser tabs:

    - [Spectacle](http://localhost:8008)
    - [Scoreboard](http://localhost:8002)
    - [Quiz-master app](http://localhost:8003)
    - [Team app 1](http://localhost:8004)
    - [Team app 2](http://localhost:8004)

## Testing

### 1. Register a team

Use the following credentials:
- rick
- 1234
- [images/team2.png](images/team2.png)

- sharon
- 1234
- [images/team1.png](images/team1.png)

### 2. Create a quiz with code - quizzer
### 3. Apply both teams for the quiz
### 4. Accept both teams for the quiz
### 5. Start the quizz
### 6. Show that both team apps have started -> NO! websocket message is not send, send it from quizmaster ViewAppliedTeamsComponent.
### 7. Select 3 categories
### 8. Start round
### 9. Add a question to the round
### 10. Start a question
### 11. Go to the tab with the `sharon` team and enter a **wrong** answer
### 12. Go to the tab with the `Rick` and enter the correct answer
### 13. Show that the scoreboard updated (yellow boxes)
### 14. Close Question
### 15. Approve the wrong answer team `sharon` gave.
### 16. Start the new question and show that everything updated

====

### 18. Explain that we have a sample dataset which shows that we can resume a quiz + show that we can win a quiz.
### 19. Run the ` npm run seed ` command in the root directory
### 20. Log the scoreboard in to the avengers quiz (code: 1a2b3c)
### 21. Log Team1 in to the avengers quiz (Team1, 1234, 1a2b3c)
### 21. Close the currently running quizz
### 22. Team3  should have won, Team1 should be second and the third place goes to team2.
### 23. Run the `npm test` command in the server directory to show that all tests pass.
