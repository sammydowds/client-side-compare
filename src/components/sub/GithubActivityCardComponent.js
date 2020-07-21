import React from 'react'; 
import {
    Card, 
    CardTitle,
    CardSubtitle, 
    CardBody, 
    Table
} from 'reactstrap'; 

function sortRows(objArray, err_data, data_loaded, col_sort) {
    if (!data_loaded) {
        return(<tr><td colSpan='3'>Fetching data...</td></tr>); 
     } else if (err_data) {
         return(<tr><td colSpan='3'>We had some issues fetching the data!</td></tr>); 
     } else {
         let data = []; 
         for (let obj of objArray) {
             data.push({'name': obj.name, [col_sort]: obj[col_sort]}); 
         }
         let sorted_data = data.sort((a, b) => b[col_sort]-a[col_sort]); 
         let rank = 0; 
         let sorted_rows =  sorted_data.map((object) => {
             rank = rank + 1; 
             return(
                 <tr>
                     <td>#{rank}</td>
                     <td>{object.name}</td>
                     <td>{object[col_sort]}</td>
                 </tr>
             ); 
         }); 
         return sorted_rows; 
     } 
}

function GithubActivityCard(props) {
    let err_data = props.reactCommitActivityError || props.angularCommitActivityError || props.emberCommitActivityError || props.vueCommitActivityError; 
    let data_loaded = props.reactCommitActivityLoaded && props.angularCommitActivityLoaded && props.emberCommitActivityLoaded && props.vueCommitActivityLoaded;
    let data = [
        {'name':'react', 'commits': props.reactCommitActivity}, 
        {'name': 'angular.js', 'commits': props.angularCommitActivity}, 
        {'name': 'ember.js', 'commits': props.emberCommitActivity}, 
        {'name': 'vue', 'commits': props.vueCommitActivity} 
    ];   
    let rows = sortRows(data, err_data, data_loaded, 'commits'); 

    return(
        <Card className='shadow'>
            <CardTitle className='lead'><strong>{props.title}</strong></CardTitle>
            <CardSubtitle>over past {props.activity} wks</CardSubtitle>
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

export default GithubActivityCard; 