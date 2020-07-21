import React from 'react'; 
import {
    Card, 
    CardTitle, 
    CardBody, 
    Table
} from 'reactstrap'; 

function sortRows(repoArray, err_data, data_loaded) {
    if (!data_loaded) {
        return(<tr><td colSpan='3'>Fetching data...</td></tr>); 
     } else if (err_data) {
         return(<tr><td colSpan='3'>We had some issues fetching the data!</td></tr>); 
     } else {
         let data = []; 
         for (let repo of repoArray) {
             data.push({'name': repo.name, 'stars': repo.stargazers_count}); 
         }
         let sorted_data = data.sort((a, b) => b.stars-a.stars); 
         let rank = 0; 
         let sorted_rows =  sorted_data.map((repo) => {
             rank = rank+1; 
             return(
                 <tr>
                     <td>#{rank}</td>
                     <td>{repo.name}</td>
                     <td>{Math.round(repo.stars/1000)}k</td>
                 </tr>
             ); 
         }); 
         return sorted_rows; 
     } 
}

function GithubPopularityCard(props) {
    let err_data = props.reactRepoError || props.angularRepoError || props.emberReporError || props.vueReporError; 
    let data_loaded = props.reactRepoLoaded && props.angularRepoLoaded && props.emberRepoLoaded && props.vueRepoLoaded;
    let repos = [props.reactRepo, props.angularRepo, props.emberRepo, props.vueRepo];  
    let rows = sortRows(repos, err_data, data_loaded); 

    return(
        <Card className='shadow'>
            <CardTitle className='lead'><strong>{props.title}</strong></CardTitle>
            <CardBody>
                <Table size='sm'hover>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Framework</th>
                            <th>{props.tag}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    ); 
}

export default GithubPopularityCard; 