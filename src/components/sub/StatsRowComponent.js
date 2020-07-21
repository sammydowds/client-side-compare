import React from 'react'; 
import moment from 'moment'; 

function StatsRow(props) {
    //storing age of repo 
    let age = moment(props.repo.created_at).fromNow(); 
    return (
        <tr>
            {props.repoError
                ? <React.Fragment>
                    <td colSpan="2">Failed to fetch {props.name} Repo</td>
                </React.Fragment>
                :<React.Fragment>
                    <td>{props.repo.name}</td>
                    <td>{Math.round(props.repo.size/1000)}MB</td>
                    <td>{props.repo.stargazers_count}</td>
                    <td>{age}</td>
                </React.Fragment>
            }
            {props.issuesCreatedError 
                ? <td>Fetch Failed</td>
                : <td>{props.issuesCreated}</td>
            }
            {props.issuesClosedError 
                ? <td>Fetch Failed</td>
                : <td>{props.issuesClosed}</td>
            }
            {props.issuesClosedError || props.issuesCreatedError
                ? <td>Data unavailable to calc</td>
                : <td>{Math.round((props.issuesClosed/props.issuesCreated)*100)/100}</td>
            }
            {props.commitActivityError
                ? <td>Fetch failed</td>
                : <td>{props.commitActivity}</td>
            }
        </tr>
    )
}

export default StatsRow; 