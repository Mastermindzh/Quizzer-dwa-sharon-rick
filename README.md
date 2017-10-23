
<h1>fall2017-quizz-SharonEnRick</h1>
This repo holds all the code for the Quizzer app made by <a href = "https://github.com/sharonfranke">Sharon Franke</a> and <a href = "http://mastermindzh.com">Rick van Lieshout</a>.


<h2>Tracking our work</h2>
To make working on this app together easier we work with a method similar to Kanban. To do this we use a <a href = "https://trello.com/b/6IQNr0Xl/quizzer">Trello Board</a>

This repo contains a `package.json` file instead of a Makefile to easily start several repo related tasks (e.g generate, run in Docker etc.) The commands include:

| Command | Description                   |
|---------|-------------------------------|
| start   | Runs all apps in docker       |
| docs    | Exposes api spec on port 7999 |

<h2>Table of contents</h2>
<!--  use markdown styled headers below -->
<!-- TOC -->

- [1. Introduction](#1-introduction)
- [2. Architecture](#2-architecture)
- [3. Design decisions / rationale](#3-design-decisions--rationale)
    - [3.1 Containerization](#31-containerization)
    - [3.2 Websockets](#32-websockets)
        - [3.2.1. Websocket endpoints](#321-websocket-endpoints)
    - [3.3 Why multi tier](#33-why-multi-tier)
    - [3.x Technologies](#3x-technologies)
    - [3.x Api specification](#3x-api-specification)
    - [4. Format specification](#4-format-specification)
    - [Websocket communication](#websocket-communication)
    - [mongo](#mongo)
    - [mongoose schemas](#mongoose-schemas)
    - [5. Mockups & Screenshots](#5-mockups--screenshots)

<!-- /TOC -->

# 1. Introduction

The Quizzer is a web application that can be used in bars, sports canteens and maybe even prisons to play quizzes as a team. A pub quiz, basically.

<!-- INSERT PUB QUIZ EXPLANATION -->

Some of the rules:
* Players are placed in teams. A typical team would consist of anywhere between three and eight players.
* A Quizz Night consists of multiple rounds, each round contains twelve questions, chosen from three categories.
* Besides the teams there is also a Quizz Master who selects questions, approves or disproves answers and keeps the mood up using humour and enthusiasm.
* Every team shares a table.
* Finally, a large screen is used to display everyone's score, the current question and the teams that have answered this question.

# 2. Architecture

<!-- This chapter describes what we're doing -->

1. Websockets -> msg "hey we've got an update" -> fetch data

2. Containerized software

3. multi-tiered -> include image

4. pub/sub

# 3. Design decisions / rationale

<!-- This chapter describes why (and why not something else). -->

## 3.1 Containerization

explanation

## 3.2 Websockets

Separation of concerns -> data logic over http -> limited amount of data

### 3.2.1. Websocket endpoints

How to connect, why.

## 3.3 Why multi tier

## 3.x Technologies

- docker
- swagger
- [redux]('http://redux.js.org/')
- [socket.io]('https://socket.io/')

## 3.x Api specification
We have decided to use the OpenAPI specification a.k.a [Swagger](https://swagger.io/) to define our REST endpoints and models. We'll give an overview of the endpoints and why we chose them below. To see the entire specification check out the [swagger file](definitions/swagger.yml) or run the "npm run docs" command.

## 4. Format specification


## Websocket communication

According to the [Architecture]('#Architecture') section

An example message:
```js
{
    topic: 'question',
    quizId: 'mongoid',
    sender: 'quizz master',
}
```

Available topics:

<!-- TABLE -->

- question
- score

## 4.1 MongoDB

To structure our MongoDB we have decided to use five collections. The collection names, description and a link to an example document withing the collection can be viewed in the table below.
<!--rounds niet in quizzes object omdat je er heel vaak bij moet (e.g "get last question from current round in current quiz" -> select LAST(*) from rounds where quizid = 5) + groot ding, wordt veel data-->

| Collection 	|           Description           	| Example document                                                                          	|
|------------	|:-------------------------------:	|-------------------------------------------------------------------------------------------	|
| questions  	|            a question           	| question, answer, category                                                                	|
| categories 	|            a category           	| id, categoryname                                                                          	|
| quizzes    	| The main object which will contain all the data of a quiz 	| id - password - teams (id) - status                                                       	|
| teams      	| a team                     	| id , name, picture                                                                        	|
| rounds     	| a round belonging to a quiz                    	| round: {categories,  question: { question(id) , status, asnwers: [teamid+answer]}, ...  } 	|


The following picture visualizes the relations between the collections and documents.[Relations example](./pictures/DataModel.png) In the picture, embedded documents have a blue header.

### Relationships
**Question**
***Question to Category*** This is a many-to-one relationship. A Question has one Category. A category can have multiple questions associated with it. <!-- todo In Question there is a link to the category because categories need to be accessed on their own.-->
**Quiz**
***Quiz to Round*** This is a one-to-many relationship. A Quiz contains multiple rounds. This is done by linking to rounds within the Quiz document. The reason behind this is that there are multiple rounds whithin a Quiz. A round is a complicated document and embedding this within a Quiz would make it unnecessarily difficult, and a round needs to be available for access by itself. If the round were embedded within the Quiz document, each time you need to access a round you need to query the whole quiz document. This produces a lot of overhead.
***Quiz to Team*** This is a one-to-many relationship. A Quiz contains multiple teams. Like rounds, teams need to be able to be accessed independently. This is why there is a reference to a Team within the Quiz document.
**Round**
***Round to Category***
***Round to Question***
***Question to Answer*** this concerns the embedded question field
***Answer to Team***



<!-- table -->

## mongoose schemas

Ik ben een korte voorbeeldbeschrijving

```js
  var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```


## 5. Mockups & Screenshots

BEHOLD our beautiful application:


