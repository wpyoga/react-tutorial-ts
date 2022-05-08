# Tutorial: Intro to React (in TypeScript)

This is the [React tutorial](https://reactjs.org/tutorial/tutorial.html), done in TypeScript. Comments are written in [TSDoc](https://tsdoc.org/) style.

## Stages

1. [Set up](https://reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment) the project
1. [Pass data](https://reactjs.org/tutorial/tutorial.html#passing-data-through-props) through props
1. Make the squares [recognize clicks](https://reactjs.org/tutorial/tutorial.html#making-an-interactive-component)
1. Make the squares [stateful](https://reactjs.org/tutorial/tutorial.html#making-an-interactive-component) and respond to clicks
1. [Lift state up](https://reactjs.org/tutorial/tutorial.html#lifting-state-up) from the squares to the game board
1. Implement squares as [function components](https://reactjs.org/tutorial/tutorial.html#function-components)
1. Let X and O [take turns](https://reactjs.org/tutorial/tutorial.html#taking-turns) playing the game
1. Filled squares [are final](https://reactjs.org/tutorial/tutorial.html#declaring-a-winner)
1. [Determine the winner](https://reactjs.org/tutorial/tutorial.html#declaring-a-winner) at every turn
1. [Keep a history](https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again) of moves
1. [Lift state up](https://reactjs.org/tutorial/tutorial.html#lifting-state-up-again) from the board to the game object
1. Show past moves and [allow players to modify them](https://reactjs.org/tutorial/tutorial.html#implementing-time-travel)
1. [Show position](https://reactjs.org/tutorial/tutorial.html#wrapping-up) of each past move
1. [Show currently selected move](https://reactjs.org/tutorial/tutorial.html#wrapping-up) in bold
1. Highlight currently selected move on the board
1. Render board [using two loops](https://reactjs.org/tutorial/tutorial.html#wrapping-up)

## Bootstrap process

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```
$ yarn create react-app --template=typescript
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
