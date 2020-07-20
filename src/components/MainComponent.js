import React, { Component } from 'react'; 
import HomeComponent from './HomeComponent';
import { defaultState } from '../data/defaultState';
import { 
    pullRequestsMergedUrl, 
    repoDataUrl, 
    issuesCreatedUrl, 
    issuesClosedUrl, 
    votesAPIUrl 
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
        .then(response => this.setState({votes: response, votesLoaded: true, votesError: false}))
        .catch(error => {
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
            this.setState({[framework + 'IssuesClosedError']: true, [framework + 'IssuesClosedLoaded']: true})
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
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.status + ': ' + response.statusText); 
                }
            })
            .then(response => response.json())
            .then(response => {
                alert('Vote has been submitted! Voter: ' + response.email); 
                sessionStorage.setItem('votedRepo', 'true');
                this.fetchVotes(); 
            })
            .catch(error => alert(error)); 
        } else {
            alert('Sorry you have already voted during this session!'); 
        }
    }

    componentDidMount() {
        let start_date = moment().subtract(this.state.activity, 'days').format('YYYY-MM-DD'); 
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