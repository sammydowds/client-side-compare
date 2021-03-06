import React, { Component } from 'react'; 
import HomeComponent from './HomeComponent';
import { defaultState } from '../data/defaultState';
import { 
    pullRequestsMergedUrl, 
    repoDataUrl, 
    issuesCreatedUrl, 
    issuesClosedUrl, 
    votesAPIUrl, 
    commitActivityUrl
    } from '../data/baseUrls'; 
import moment from 'moment'; 

// Container component
class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState; 
    }

    fetchData(framework, start_date) {
        this.fetchRepo(framework); 
        this.fetchIssuesCreated(framework, start_date); 
        this.fetchIssuesClosed(framework, start_date); 
        this.fetchCommitActivity(framework); 
    }
    
    fetchVotes() {
        fetch(votesAPIUrl['votes'])
        .then(response => {
            if (response.ok) {
                return response; 
            } else {
                throw new Error(response.status + ': ' + response.statusText); 
            }
        })
        .then(response => response.json())
        .then(response => this.setState({votes: response, votesLoaded: true, votesError: false, votesErrorMessage: null}))
        .catch(error => {
            alert('Votes could not be loaded: ' + error); 
            this.setState({votesError: true, votesLoaded: true});
        }); 
    }

    fetchRepo(framework) {
        fetch(repoDataUrl[framework])
        .then(response => {
            if (response.ok) {
                return response; 
            } else {
                throw new Error(response.status + ': ' + response.statusText);  
            }
        })
        .then(response => response.json())
        .then(response => this.setState({[framework + 'Repo']: response, [framework + 'RepoLoaded']: true, [framework + 'RepoError']: false}))
        .catch(error => {
            alert('Repo could not be loaded for ' + framework + ' - ' + error); 
            this.setState({[framework + 'RepoError']: true, [framework + 'RepoLoaded']: true})
            }
        ); 
    }

    fetchIssuesCreated(framework, start_date) {
        fetch(issuesCreatedUrl[framework] + start_date)
        .then(response => {
            if (response.ok) {
                return response; 
            } else {
                throw new Error(response.status + ': ' + response.statusText);  
            }
        })
        .then(response => response.json())
        .then(response => {
            let total_created = response.total_count;
            this.setState({[framework + 'IssuesCreated']: total_created, [framework + 'IssuesCreatedLoaded']: true, [framework + 'IssuesCreatedError']: false})
        })
        .catch(error => {
            alert('Issues Created could not be loaded for ' + framework + ' - ' + error); 
            this.setState({[framework + 'IssuesCreatedError']: true, [framework + 'IssuesCreatedLoaded']: true})
            }
        );  
    }

    fetchIssuesClosed(framework, start_date) {
        fetch(issuesClosedUrl[framework] + start_date)
        .then(response => {
            if (response.ok) {
                return response; 
            } else {
                throw new Error(response.status + ': ' + response.statusText);  
            }
        })
        .then(response => response.json())
        .then(response => {
            let total_created = response.total_count;   
            this.setState({[framework + 'IssuesClosed']: total_created, [framework + 'IssuesClosedLoaded']: true, [framework + 'IssuesClosedError']: false})
        })
        .catch(error => {
            alert('Issues Closed could not be loaded for ' + framework + ' - ' + error); 
            this.setState({[framework + 'IssuesClosedError']: true, [framework + 'IssuesClosedLoaded']: true})
            }
        );  
    }

    fetchCommitActivity(framework) {
        fetch(commitActivityUrl[framework])
        .then(response => {
            if (response.ok) {
                return response; 
            } else {
                throw new Error(response.status + ': ' + response.statusText);  
            }
        })
        .then(response => response.json())
        .then(response => {
            let weekly_commits = response.slice(52-this.state.activity); 
            let total_commits = weekly_commits.map((week) => week.total); 
            let sum_commits = total_commits.reduce((a, b) => a + b); 
            this.setState({[framework + 'CommitActivity']: sum_commits, [framework + 'CommitActivityLoaded']: true, [framework + 'CommitActivityError']: false})
        })
        .catch(error => {
            alert('Commit Activity could not be loaded for ' + framework + ' - ' + error); 
            this.setState({[framework + 'CommitActivityError']: true, [framework + 'CommitActivityLoaded']: true})
            }
        ); 
    }

    //method for pulling PR merges from start date to today (not using due to rate limit)
    fetchParticipation(framework, start_date) {
        fetch(pullRequestsMergedUrl[framework] + start_date)
        .then(response => {
            if (response.ok) {
                return response; 
            } else {
                throw new Error(response.status + ': ' + response.statusText);  
            }
        })
        .then(response => response.json())
        .then(response => {
            let total_prmerged = response.total_count;
            this.setState({[framework + 'Participation']: total_prmerged, [framework + 'ParticipationLoaded']: true, [framework + 'ParticipitationError']: false})
        })
        .catch(error => {
            alert('PR merges could not be loaded for ' + framework + ' - ' + error); 
            this.setState({[framework + 'ParticipationError']: true, [framework + 'ParticipationLoaded']: true})
            }
        );  
    }
    // submit vote 
    handleSubmit = (voterdata) => {
        if (!sessionStorage.getItem('votedRepo')) {
            fetch(votesAPIUrl['castvote'], {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(voterdata),
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
            .then(response => {
                if (!response.ok) {
                    alert('Your vote was not submitted. Please make sure you have not previously voted with that email. ' + response.status + ': ' + response.statusText);   
                } else {
                    sessionStorage.setItem('votedRepo', 'true'); 
                    alert('Vote Submitted Successfully'); 
                    this.fetchVotes(); 
                }
            }); 

        } else {
            alert('Sorry you have already voted during this session!'); 
        }
    }

    componentDidMount() {
        let start_date = moment().subtract(this.state.activity, 'weeks').startOf('week').format('YYYY-MM-DD'); 
        //initial fetch 
        this.fetchVotes(); 
        this.fetchData('react', start_date); 
        this.fetchData('angular', start_date); 
        this.fetchData('ember', start_date);  
        this.fetchData('vue', start_date); 
        this.setState({message: 'Last Updated: ' + moment().format('MMMM Do YYYY, h:mm:ss a')}); 
        //sending fetch every 10 seconds after the initial fetch 
        setInterval(() => {
            this.fetchVotes(); 
            this.fetchData('react', start_date)
            this.fetchData('angular', start_date)
            this.fetchData('ember', start_date) 
            this.fetchData('vue', start_date) 
            this.setState({message: 'Last Updated: ' + moment().format('MMMM Do YYYY, h:mm:ss a')}); 
        }, this.state.frequency);
    }

    render() {
        return(
            <HomeComponent {...this.state} handleSubmit={this.handleSubmit}/>
        )
    }
}
export default MainComponent; 