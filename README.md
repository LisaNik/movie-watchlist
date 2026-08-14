# 🎬 Movie Watchlist

A responsive web application for searching movies and creating a personal watchlist.

**[Live Demo](https://lisanik.github.io/movie-watchlist/)** · **[Repository](#)**

## About

Movie Watchlist is a front-end project built with vanilla JavaScript. Users can search for any movie, view its rating, runtime, and genre, and add it to a persistent watchlist stored across sessions.

## Features

* Search for movies by title
* Fetch movie data from the OMDb API
* Display movie posters, ratings, runtime, genre, and descriptions
* Add movies to a personal watchlist
* Remove movies from the watchlist
* Store the watchlist in the browser using `localStorage`
* Handle empty search results and missing movie posters
* Search movies using both the search button and the Enter key

## Technologies

* HTML5
* CSS3
* JavaScript (ES6+)
* REST API
* Fetch API
* Local Storage
* Responsive Design

## Project Structure

```text
Movie-Watchlist/
├── images/
│   ├── add.svg
│   ├── film.svg
│   ├── icon.svg
│   ├── noPoster.svg
│   ├── remove.svg
│   └── star.svg
├── index.html
├── myWatchlist.html
├── script.js
├── watchlist.js
├── styles.css
└── README.md
```

## How It Works

The application uses the OMDb API to search for movies by title. After a search, movie information is retrieved and displayed as interactive movie cards.

Users can add movies to their watchlist or remove them later. The watchlist is stored in `localStorage`, so the selected movies remain available after refreshing or reopening the page.

## API

Movie data is provided by the [OMDb API](https://www.omdbapi.com/).

## Getting Started

1. Clone or download the repository.
2. Open the project in a code editor.
3. Run the project using a local development server.
4. Open `index.html` in your browser.
5. Search for a movie and add it to your watchlist.

## Purpose

This project was created as a solo web development project to practice JavaScript, working with REST APIs, asynchronous requests, DOM manipulation, and browser local storage.
