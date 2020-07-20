import React from 'react';
import StatsRow from './StatsRowComponent'; 

function GithubDataTable(props) {
    //initializing rows to show loading  
    let react = <tr><td colSpan="7">React stats loading...</td></tr>
    let angular = <tr><td colSpan="7">Angular stats loading...</td></tr>
    let ember = <tr><td colSpan="7">Ember stats loading...</td></tr>
    let vue = <tr><td colSpan="7">Vue stats loading...</td></tr>

    //conditional rendering based on loading data 
    if (props.reactRepoLoaded && props.reactIssuesCreatedLoaded && props.reactIssuesClosedLoaded) {
        react = <StatsRow 
                    repo={props.reactRepo} 
                    repoError={props.reactRepoError}
                    issuesCreated={props.reactIssuesCreated}
                    issuesCreatedError={props.reactIssuesCreatedError}
                    issuesClosed={props.reactIssuesClosed}
                    issuesClosedError={props.reactIssuesClosedError}
                    name="react"
                />
    } 
    if (props.angularRepoLoaded && props.angularIssuesCreatedLoaded && props.angularIssuesClosedLoaded) {
        angular = <StatsRow 
                    repo={props.angularRepo} 
                    repoError={props.angularRepoError}
                    issuesCreated={props.angularIssuesCreated}
                    issuesCreatedError={props.angularIssuesCreatedError}
                    issuesClosed={props.angularIssuesClosed}
                    issuesClosedError={props.angularIssuesClosedError}
                    name="angular"
                />
    } 
    if (props.emberRepoLoaded && props.emberIssuesCreatedLoaded && props.emberIssuesClosedLoaded) {
        ember = <StatsRow 
                    repo={props.emberRepo} 
                    repoError={props.emberRepoError}
                    issuesCreated={props.emberIssuesCreated}
                    issuesCreatedError={props.emberIssuesCreatedError}
                    issuesClosed={props.emberIssuesClosed}
                    issuesClosedError={props.emberIssuesClosedError}
                    name="ember"
                />
    } 
    if (props.vueRepoLoaded && props.vueIssuesCreatedLoaded && props.vueIssuesClosedLoaded) {
        vue = <StatsRow 
                repo={props.vueRepo} 
                repoError={props.vueRepoError}
                issuesCreated={props.vueIssuesCreated}
                issuesCreatedError={props.vueIssuesCreatedError}
                issuesClosed={props.vueIssuesClosed}
                issuesClosedError={props.vueIssuesClosedError}
                name="vue"
            />
    } 
    return(
        <table className="stats-table">
                <thead>
                    <tr>
                        <th>Framework</th>
                        <th>Stars</th>
                        <th>Created</th>
                        <th>Size</th>
                        <th>Issues Created</th>
                        <th>Issues Closed</th>
                        <th>COR (Closed Opened Ratio)</th>
                    </tr>
                </thead>
                <tbody>
                    {react}
                    {angular}
                    {ember}
                    {vue}
                </tbody>
            </table>
    )
}

export default GithubDataTable; 