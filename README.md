
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

Quizzer is a web application that can be used for Quiz nights with your friends, colleagues or even strangers. A Quizz night consits of two parties: a Quizz master and the teams that want to compete. The Quizz master is the all-powerfull leader of the Quizz night. He uses a tablet determine what categories will be played, what questions will be answered, how many rounds will be played and even score the answers. Teams can choose their own name and must work together to achieve victory. A team plays together on one SmartPhone. Together they submit their answer to the current question of the round. After each round points are awarded to top three teams who have the most correct answers in the round. Scores are displayed real time on a big screen. There teams can see the current score, number of correct answers and the ranking of each team.

# 2. Architecture
The Quizzer app combines server side and client side techniques. These techniques are elaborated upon below. An explenation of why certain techniques have been chosen can be read in the Design decisions chapter.

<!-- This chapter describes what we're doing -->

1. Websockets -> msg "hey we've got an update" -> fetch data

2. Containerized software


### 2.3 Multi-tiered application
The Quizzer app will be a multi-tiered application, this means that presentation, application processing and data management functions will be separated physically. The picture below illustrates this.\
![Three-Tiered Architecture](./pictures/Three-Tiered-Architecture.png)

The Data-Tier will contain the MongoDB database. There is a data acces layer in between the Data and Application tiers. This will be fulfilled by the Mongoose NodeJs library.\
The Application-Tier will contain all the application logic. \
The Presentation-Tier will contain the front-end for the Quiz master app, Team app and Scoreboard app.

### 2.4 Publish/Subscriber pattern
The Publish/Subscriber pattern is a messaging pattern in which senders, called publishers send messages without knowing who will receive the messages. Listeners, or Subscribers, express interest in a certain type of content and receive messages about it. \
The variant that will be used in Quizzer is a topic based Publish/Subscriber pattern. This allows Subscribers to subscribe to a certain or multiple topics and receive messages about them. Messages are filtered through the topics, which means that Subscribers will only receive messages of their interest. They will receive all messages published to those topics. \
This type of communication will be implemented using WebSockets. See WebSocket sections for more details.

# 3. Design decisions / rationale

<!-- This chapter describes why (and why not something else). -->

## 3.1 Containerization

explanation

## 3.2 Websockets

Separation of concerns -> data logic over http -> limited amount of data

### 3.2.1. Websocket endpoints

How to connect, why.

## 3.3 Multi Tier


Scalability and deployment flexibility—concentrating different kinds of logic into specialized components makes it easier to deploy application components in a distributed, scalable environment, reducing network traffic and I/O overheads.
Maintainability—isolating functionality into specialized components reduces code complexity and makes debugging easier. It also provides a good basis for component-based development and reusability.
Stateless communication—XML is used to communicate between components in the presentation tier and those in the business logic tier.
Enhanced infrastructure independence—the presentation and data access, which are often infrastructure-dependent, are separated from the application’s business logic.
A specific set of skills is required for the development of each tier, so tiers can be developed independently of each other. For example, the thin presentation tier allows front-end experts to do their work without being affected by developments taking place in the business logic tier.

## 3.x Technologies

- docker
- swagger
- [redux]('http://redux.js.org/')
- [socket.io]('https://socket.io/')

## 3.x Api specification
We have decided to use the OpenAPI specification a.k.a [Swagger](https://swagger.io/) to define our REST endpoints and models. We'll give an overview of the endpoints and why we chose them below. To see the entire specification check out the [swagger file](definitions/swagger.yml) or run the "npm run docs" command.

## 4. Format specification


## Websocket communication

According to the [Architecture]('#Architecture') section, WebSockets will be used in a Publish/Subscriber pattern, which focuses on topics.
This entails that in each message at least a topic must be present. Because multiple quizzes can be played at the time, a quizId must also be present. For traceability we have decided to also add the sender to the message. The following example message shows this:
```js
{
    topic: 'question',
    quizId: '123',
    sender: 'quizz master',
}
```

Available topics:

<!-- TODO, na overleg verder uitwerken. -->

- question
- answer
- team

## 4.1 MongoDB

To structure our MongoDB we have decided to use five collections. The collection names, description and a link to an example document within the collection can be viewed in the table below.

| Collection 	|           Description           	| Example document                                                                          	|
|------------	|:-------------------------------:	|-------------------------------------------------------------------------------------------	|
| questions  	|            a question           	| [Question](./definitions/mongo%20examples/question.json)                                                                	|
| categories 	|            a category           	| [Category](./definitions/mongo%20examples/category.json)                                                                          	|
| quizzes    	| The main object which will contain all the data of a quiz 	| [Quiz](./definitions/mongo%20examples/quiz.json)                                                       	|
| teams      	| a team                     	| [Team](./definitions/mongo%20examples/team.json)                                                                        	|
| rounds     	| a round belonging to a quiz                    	| [Round](./definitions/mongo%20examples/round.json) 	|


The following picture visualizes the relations between the collections and documents.
[Relations example](./pictures/DataModel.png)\
![DataModel](./pictures/DataModel.png)

In the picture above, embedded documents have a blue header.

### Relationships
To explain the relationships seen in the picture above, they will be listed below.\
***Question to Category*** This is a many-to-one relationship. A Question has one Category. A category can have multiple questions associated with it.\
***Quiz to Round*** This is a one-to-many relationship. A Quiz contains multiple rounds. This is done by linking to rounds within the Quiz document. The reason behind this is that there are multiple rounds whithin a Quiz. A round is a complicated document and embedding this within a Quiz would make it unnecessarily difficult, and a round needs to be available for access by itself. If the round were embedded within the Quiz document, each time you need to access a round you need to query the whole quiz document. This produces a lot of overhead.\
***Quiz to Team*** This is a one-to-many relationship. A Quiz contains multiple teams. Like rounds, teams need to be able to be accessed independently. This is why there is a reference to a Team within the Quiz document.\
***Round to Category*** This is a one-to-many relationship. Each round has three categories. These are links to Category documents. They are linked because you often need a list of all categories and embedding would result in a lot of overhead.\
***Round to Question*** This is a one-to-many relationship. Each round has multiple questions. This is a link to the Question document, plus two fields are added.\
***Question to Answer*** This is a one-to-many relationship. Each question is answered multiple times by the teams participating. This is why in each Question in the round, answers are embedded for each team.\
***Answer to Team*** This is a one-to-one relationship. Each team has one answer to each question, and each answer given belongs to one team. This is why there is a link to the teams in each answer.\


## Mongoose Schemas

To combine MongoDB and NodeJs the NodeJs library [Mongoose]('http://mongoosejs.com/') will be used.
Mongoose uses Schemas to organize data. These Schemas are derived from the collections and documents mentioned above. Appropriate data validation is added to these Schemas to ensure data integrity.


## 5. Mockups & Screenshots

BEHOLD our beautiful application:


