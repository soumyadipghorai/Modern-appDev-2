# Tic-Tac-Toe

This repo contains example code for Tic-Tac-Toe written in a few different ways.  The purpose is to show the basics of how to maintain and manipulate *state* in a web app.

## Python

The python implementation is a Flask application that uses explicit URL based updates to change the state of the board.  All state is maintained only at the server, and the client (web browser) has no local information other than the complete HTML obtained from the server.  Each update results in a request back to the server, which updates the board state and sends back the full HTML to be rendered.

This implies, for example, that reloading the page, or opening the same link from another browser or even another location, will show the state of the board as recorded at the server.

Note that this does not allow multiple games to be played in parallel, but that can be changed easily enough by making the server start a new thread for each connection - however, it will need some mechanism such as cookies or IP address tracking to maintain this knowledge.

## JavaScript

The pure JavaScript implementation uses the same logical structure as the Python code.  However, now there is no server, and all state as well as logic is managed on the client (browser).  

This implies that reloading the page, for example, will result in loss of the current state and a new game will be started.  On the other hand, loading the page from another browser or window will allow another game to be run independent of the previous game.

## Vue

Vue is a framework that builds on top of JS and provides helpers to make certain kinds of behaviour easier.  In particular, the notion of *reactivity* means that we can just declare a certain DOM element to be dependent on a specific piece of data, and any time that data changes the DOM element will automatically be updated.

This is of course implemented behind the scenes using JS - the Vue libraries hook into the JS code so that all variable updates are intercepted and result in calling other functions that cause the page to update as needed.  So though this looks like magic, in reality it is just [sufficiently advanced technology](https://www.brainyquote.com/quotes/arthur_c_clarke_101182).

### Vue 1

The first Vue implementation is not particularly clever or useful.  All it does is illustrate `v-bind` and how it can be used to bind data to functions.  The code itself is very similar to the original JS.

### Vue 2

In the *component* version of Vue, we reuse a `tic` component in a loop to create a `board` component.  This illustrates how we can reuse basic ideas in an elegant manner to create more advanced structures.  In some sense, this is the essence of object oriented programming, but also captures important ideas from other paradigms of computing.

The Vue approach makes *declarative programming* easy in the context of GUI design, and allows us to focus on *what* should be shown on the page, rather than *how* to go about rendering it on the screen.
