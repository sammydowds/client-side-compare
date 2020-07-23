<p align="center">
  <img src="https://github.com/sammydowds/client-side-compare/blob/master/public/cover.png" />
</p>

Table of Contents
======================

* [What is this for?](#what-is-this-for)
* [Github Data Cards](#github-data-cards)
* [Github Data Table](#github-data-table)
* [How does it Work?](#how-does-it-work)
* [Fetch Table](#fetch-table)
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
When the app fires up, it makes a series of calls to Github's API. After the initial calls to Github, it will also continue to make calls to Github every 2 minutes. The app also makes calls in a similar way to an API which I built to store voter information and votes per framework. The frequency at which you make calls is configurable with the 'frequency' variable in the 'defaultState.js' file. (Note: setting it below 1 minute will result in rate limit issues from the Github API). 

The issues and commits data is pulled from a period of time which you can specify with the 'activity' variable in the 'defaultSate.js' file. By default it is set at 52 weeks, and it is recommended to stay under that.

When a vote is submitted, the voters email and the id of the framework is stored. The vote count for the respective framework is incrimented by one. The vote counts are accessible through one API call (reference the fetchVotes() and handleSubmit() functions in the main component). After a vote has been successfully submitted, the vote count is updated on the UI. 

Voting restrictions: 
- Only one vote per email
- Only one vote per browser session 

## Fetch Table - Batch of Fetches
Endpoint | HTTP Method | Stored
-- | -- | -- | -- 
`repos/ownername/reponame` | GET | Entire response 
`search/issues?q=repo:ownername/reponame+is:issue+state:open+created:>startdate` | GET | only the 'total_count'
`search/issues?q=repo:ownername/reponame+is:issue+closed:>startdate`	|GET| only the 'total_count'
`repos/ownername/reponame/stats/commit_activity`     | GET | Sum 'total' per week
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

