import React from 'react';
import StatsRow from './StatsRowComponent'; 
import {
    Table
} from 'reactstrap'; 

function GithubDataTable(props) {
    //initializing rows to show loading  
    let react = <tr><td colSpan="8">React stats loading...</td></tr>
    let angular = <tr><td colSpan="8">Angular stats loading...</td></tr>
    let ember = <tr><td colSpan="8">Ember stats loading...</td></tr>
    let vue = <tr><td colSpan="8">Vue stats loading...</td></tr>

    //conditional rendering based on loading data 
    if (props.reactRepoLoaded && props.reactIssuesCreatedLoaded && props.reactIssuesClosedLoaded && props.reactCommitActivityLoaded) {
        react = <StatsRow 
                    repo={props.reactRepo} 
                    repoError={props.reactRepoError}
                    issuesCreated={props.reactIssuesCreated}
                    issuesCreatedError={props.reactIssuesCreatedError}
                    issuesClosed={props.reactIssuesClosed}
                    issuesClosedError={props.reactIssuesClosedError}
                    commitActivity={props.reactCommitActivity}
                    commitActivityError={props.reactCommitActivityError}
                    name="react"
                />
    } 
    if (props.angularRepoLoaded && props.angularIssuesCreatedLoaded && props.angularIssuesClosedLoaded && props.angularCommitActivityLoaded) {
        angular = <StatsRow 
                    repo={props.angularRepo} 
                    repoError={props.angularRepoError}
                    issuesCreated={props.angularIssuesCreated}
                    issuesCreatedError={props.angularIssuesCreatedError}
                    issuesClosed={props.angularIssuesClosed}
                    issuesClosedError={props.angularIssuesClosedError}
                    commitActivity={props.angularCommitActivity}
                    commitActivityError={props.angularCommitActivityError}
                    name="angular"
                />
    } 
    if (props.emberRepoLoaded && props.emberIssuesCreatedLoaded && props.emberIssuesClosedLoaded && props.emberCommitActivityLoaded) {
        ember = <StatsRow 
                    repo={props.emberRepo} 
                    repoError={props.emberRepoError}
                    issuesCreated={props.emberIssuesCreated}
                    issuesCreatedError={props.emberIssuesCreatedError}
                    issuesClosed={props.emberIssuesClosed}
                    issuesClosedError={props.emberIssuesClosedError}
                    commitActivity={props.emberCommitActivity}
                    commitActivityError={props.emberCommitActivityError}
                    name="ember"
                />
    } 
    if (props.vueRepoLoaded && props.vueIssuesCreatedLoaded && props.vueIssuesClosedLoaded && props.vueCommitActivityLoaded) {
        vue = <StatsRow 
                repo={props.vueRepo} 
                repoError={props.vueRepoError}
                issuesCreated={props.vueIssuesCreated}
                issuesCreatedError={props.vueIssuesCreatedError}
                issuesClosed={props.vueIssuesClosed}
                issuesClosedError={props.vueIssuesClosedError}
                commitActivity={props.vueCommitActivity}
                commitActivityError={props.vueCommitActivityError}
                name="vue"
            />
    } 
    return(
        <Table className="stats-table" size="sm" hover bordered>
                <thead>
                    <tr>
                        <th colSpan="8" className='lead'><strong>Github Data</strong></th>
                    </tr>
                    <tr>
                        <th colSpan="4" className='lead'><strong>Static Data</strong></th>
                        <th colSpan="4" className='lead'><strong>Past {props.activity} Weeks</strong></th>
                    </tr>
                    <tr>
                        <th>Framework</th>
                        <th>Size</th>
                        <th>Stars</th>
                        <th>Created</th>
                        <th>Issues Opened</th>
                        <th>Issues Closed</th>
                        <th>ICOR</th>
                        <th>Commits</th>
                    </tr>
                </thead>
                <tbody>
                    {react}
                    {angular}
                    {ember}
                    {vue}
                </tbody>
            </Table>
    )
}

export default GithubDataTable; 