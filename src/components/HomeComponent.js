import React from 'react';
import VoteSubmitForm from './sub/VoteSubmitFormComponent';
import VoteTable from './sub/VoteTableComponent';
import GithubDataTable from './sub/GithubDataTableComponent';

// main presentational component 
function HomeComponent(props) {
    let {votes, votesError, votesLoaded, handleSubmit, message, frequency, activity, ...githubdata} = props; 
    return (
        <div>
            <h1>
                Comparing GitHub Data - Client-Side
            </h1> 
            <h3>Stats pulled from past {activity} days</h3>
            <h6>{message} (Updates occur every {Math.round(frequency/(1000*60)*100)/100} minute(s))</h6>
            <GithubDataTable {...githubdata} />
            <h1>Vote Tally</h1>
            <VoteTable
                votes={votes}
                votesError={votesError}
                votesLoaded={votesLoaded}
             />
            <h1>Submit Your Vote</h1>
            <VoteSubmitForm handleSubmit={handleSubmit} />
        </div>
    )
    

}

export default HomeComponent; 