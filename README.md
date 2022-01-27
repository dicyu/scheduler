# Interview Scheduler

## Project Description

---

Interviewer Scheduler is a SPA (Single Page Application) for tracking student's interviews. This app uses React built-in and custom hooks which allows the user to add, edit and delete appointments in real time. The data is saved by the API server using PostgreSQL database.

## Project Features
---

* A user can book interviews clicking on a empty interview slot, then they can input a name and click on a interviewer
* A user can edit an existing interview or delete an existing interview
* Displays the current number of interview spots remaining
* A user can switch between days

## Project Stack

---

**Front-End** :
  *React
  Axios
  JSX
  HTML
  SASS
  JavaScript*

**Back-End** :
  *Express
  Node.js
  PostgreSQL*

**Testers** :
  *StoryBook
  Webpack Dev Server
  Jest
  Testing Library
  Cypress*

## Images
---

### Main Page
![Main Page](https://github.com/dicyu/scheduler/blob/master/docs/Main%20-%20Splash.png)

### Adding a interview
![Form Page](https://github.com/dicyu/scheduler/blob/master/docs/Adding%20Interview.png)

### Deleting
![Delete Form](https://github.com/dicyu/scheduler/blob/master/docs/Deleting.png)

### Hover
![Hover](https://github.com/dicyu/scheduler/blob/master/docs/Hovered%20Interview.png)

## Setup

---

To setup for full funtionality, you must run both the API server and the server concurrently.
* Fork and clone this scheduler-API server from [here](https://github.com/lighthouse-labs/scheduler-api)
* Follow the steps in the README
* Install this Repo
* Once setup, run both server and API server with ```npm start```

## Installation
---

```
npm install
```

## To run Webpack Development Server

```
npm start
```

## To run Jest Test Framework

```
npm test
```

## To run Storybook Visual Test

```
npm run storybook
```

## Dependencies
* axios
* classnames
* normalize.css
* react
* react-dom
* react-scripts

## Dev Dependencies
* babel/core
* storybook/addon-actions
* @storybook/addon-backgrounds
* @storybook/addon-links
* @storybook/addons
* @storybook/react
* @testing-library/jest-dom
* @testing-library/react
* @testing-library/react-hooks
* babel-loader
* node-sass
* prop-types
* react-test-renderer