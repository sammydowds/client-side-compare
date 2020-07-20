import React from 'react'; 

function VoteTable(props) {
    return(
        <table className="stats-table">
            <thead>
                <tr>
                    <th>Framework</th>
                    <th>Vote Count</th>
                </tr>
            </thead>
            {props.votesLoaded && !props.votesError
                ?  <tbody>
                        <tr>
                            <td>React</td>
                            <td>{props.votes.filter((repo) => repo.name === 'react')[0].votes}</td>
                        </tr>
                        <tr>
                            <td>Angular</td>
                            <td>{props.votes.filter((repo) => repo.name === 'angular')[0].votes}</td>
                        </tr>
                        <tr>
                            <td>Ember</td>
                            <td>{props.votes.filter((repo) => repo.name === 'ember')[0].votes}</td>
                        </tr>
                        <tr>
                            <td>Vue</td>
                            <td>{props.votes.filter((repo) => repo.name === 'vue')[0].votes}</td>
                        </tr>
                    </tbody>
                : <tbody>
                    <tr>
                        {props.votesError
                            ? <td colSpan='2'>Error Loading Votes</td>
                            : <td colSpan='2'>Loading....</td>

                        }
                        
                    </tr>
                </tbody>
            }
        </table>
    ); 
}

export default VoteTable; 