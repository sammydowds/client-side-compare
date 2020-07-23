<p align="center">
  <img src="https://github.com/sammydowds/client-side-compare/blob/master/public/cover.png" />
</p>

Table of Contents
======================

* [What is this for?](#what-is-this-for)
* [Github Data Cards](#github-data-cards)
* [Github Data Table](#github-data-table)
* [How does it Work?](#how-does-it-work)
* [Fetches to Github](#fetches-to-github)
* [Fetches to Voter API](#fetches-to-voter-api)
* [File Structure](#file-structure)
* [Improvements](#improvements)
* [Acknowledgments](#acknowledgments)

## What is this for? 
This is a dashboard to show Github statistics for some of the most popular client-side frameworks. 

## Github Data Cards
There are three data cards which repesent: 
1) **Popularity of a framework** - this is how many stars each framework has on Github. 
2) **Commit activity of a framework** - this is based on commits over the given period of time. 
3) **Issue resolution ratio** - this is the ratio of issues closed compared to the issues opened over the given period of time. 

*Why this data?* I think the **popularity** of a framework represents a lot of intangibles - more articles, more people know about it, potentially more engineers know it (hirability), and more stack overflow questions. The **commit activity** speaks to the body of developer interaction that the framework still carries with it. The **issue resolution ratio** answers the question: *if I have an issue, how likely will it be solved?*  

## Github Data Table
The github data table shows the source data, as well as some extra information which was included with one of the API calls for stars - so I kept it in. Although, the main focus should be on the data cards*. 

*Unless you have a hardware constraint - then check out the size column in this table. 

## How does it work?
Inital fetches to [Github](#fetches-to-github) and the [Voter API](#fetches-to-voter-api) are made once the main component mounts after React updates the DOM. After the initial fetch, fetches will be made at a frequency set in the 'frequency' variable of 'defaultState.js'.

A voter can cast a vote with the form at the bottom of the page, and review the vote tally for a given framework in the Vote Tally table. 

Voting restrictions: 
- Only one vote per email
- Only one vote per browser session 

## Fetches to Github
For each framework, the following fetches are made to the Github API at https://api.github.com. In total, this results in 8 API calls to the 'search' endpoint, and 4 API calls to the 'repos' endpoint when the main components mounts. 

Docs for more on each endpoint: 
- Search API: https://developer.github.com/v3/search/ (Used for finding the issues) powerful
- Repo API: https://developer.github.com/v3/repos/ (Used for pulling the static data - stars, size, etc)
- Repo Stats: https://developer.github.com/v3/repos/statistics/ (Used for pulling the activity data)

Learn more about queries for issues and PR's via the Github search endpoint [here](https://docs.github.com/en/github/searching-for-information-on-github/searching-issues-and-pull-requests). 

Github Endpoint | HTTP Method | Stored
-- | -- | -- 
`repos/ownername/reponame` | GET | Entire response 
`search/issues?q=repo:ownername/reponame+is:issue+state:open+created:>startdate` | GET | only the 'total_count'
`search/issues?q=repo:ownername/reponame+is:issue+closed:>startdate`	|GET| only the 'total_count'
`repos/ownername/reponame/stats/commit_activity`     | GET | Sum 'total' per activity weeks

## Fetches to Voter API 
Votes are fetched and submitted to the voter api at https://voterstorage.herokuapp.com/. 

More info on this API [here](https://github.com/sammydowds/client-side-compare-backend). 

Endpoint | HTTP Method | Stored
-- | -- | -- 
`votes/`     | GET | Entire response 
`castvote/`     | POST | Nothing

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
- Add testing 
- Add workflow 
- Consolidate components for data tables into one (for a more modular approach)
- Review data structure and improve
- Add a voter reset button 
- Set a time limit on when voting opportunity closes
- More descriptive error message when an email has already been used 
- Add a button to configure how many weeks of data you want to view (tie it to the 'activity' var in defaultState.js)
- Pass specific props into the cards/table 
- Possibly remove catches in error handling, and simply throw exception 

## Built With

* [React](https://reactjs.org/docs/getting-started.html) - The web framework used
* [reactstrap](https://reactstrap.github.io/) - for styling 

## Authors

* **Sammy Dowds** - *Initial work* - [Profile](https://github.com/sammydowds)

## Acknowledgments
Github is an amazing resource and offers great documentation. Thank you to a great team at Github! 

Main docs that I used are here: 
- Search API: https://developer.github.com/v3/search/ (Used for finding the issues) *powerful*
- Repo API: https://developer.github.com/v3/repos/ (Used for pulling the static data - stars, size, etc)
- Repo Stats: https://developer.github.com/v3/repos/statistics/ (Used for pulling the activity data)

For deployment - the mars buildpack is essential, and amazing. 
- Link: https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack

