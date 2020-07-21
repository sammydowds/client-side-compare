<p align="center">
  <img src="https://github.com/sammydowds/client-side-compare/blob/master/public/cover.png" />
</p>

Table of Contents
======================

* [What is this for?](#what-is-this-for)
* [Github Data Cards](#github-data-cards)
* [Github Data Table](#github-data-table)
* [How does it Work?](#how-does-it-work)
* [File Structure](#file-structure)
* [Running Tests](#running-tests)
* [Licensing](#license)

## What is this for? 
This is a dashboard to show Github statistics for some of the most popular client-side frameworks. 

## Github Data Cards
There are three data cards which repesent: 
1) Popularity of a framework - this is how many stars each framework has on Github. 
2) Acitivity of a framework - this is based on commits over the given period of time. 
3) Issue Resolution Ratio - this is the ratio of issues closed compared to the issues opened over the given period of time. I like to compare this to your COD KDR - the higher the better. ;)

## Github Data Table
The github data table show the source data, as well as some extra information which was included with one of the API calls for stars - so I kept it in. Although, the main focus should be on the data cards*. 

*Unless you have a hardware constraint - then check out the size column in this table. 

## How does it work?
When the app fires up, it makes a series of calls to Github's API. After the initial calls to Github, it will also continue to make calls to Github every 2 minutes. (Note, this frequency is configurable in the 'frequency' variable in the 'defaultState.js' file). 

The app also makes calls in a similar way to an API which I built to store voter information, and votes per framework. 

The issues and commits data is pulled from a period of time which you can specify with the 'activity' variable in the 'defaultSate.js' file. By default it is set at 52 weeks, and it is recommended to stay under that. This means that it will pull data starting from 52 weeks ago. 

## File Structure 
    │   App.css
    │   App.js
    │   App.test.js
    │   index.css
    │   index.js
    │   serviceWorker.js
    │   setupTests.js
    │
    ├───components
    │   │   HomeComponent.js                      #main presentational component
    │   │   MainComponent.js                      #container component for making all of the fetches
    │   │
    │   └───sub
    │           GithubActivityCardComponent.js
    │           GithubDataTableComponent.js
    │           GithubPopularityCardComponent.js
    │           GithubResolutionCardComponent.js
    │           StatsRowComponent.js
    │           VoteSubmitFormComponent.js
    │           VoteTableComponent.js
    │
    └───data
            baseUrls.js                           #URL's for API's 
            defaultState.js                       #init state of the UI 

## Improvements

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The web framework used

## Authors

* **Sammy Dowds** - *Initial work* - [Profile](https://github.com/sammydowds)

## License

## Acknowledgments
