import React, { useState } from 'react'; 
import {
    Card, 
    CardTitle,
    CardSubtitle,  
    CardBody, 
    Table, 
    Tooltip
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

function GithubResolutionCard(props) {
    let created_err_data = props.reactIssuesCreatedError || props.angularIssuesCreatedError || props.emberIssuesCreatedError || props.vueIssuesCreatedError;
    let closed_err_data = props.reactIssuesClosedError || props.angularIssuesClosedError || props.emberIssuesClosedError || props.vueIssuesClosedError; 
    let err_data = created_err_data || closed_err_data; 
    let created_data_loaded = props.reactIssuesCreatedLoaded && props.angularIssuesCreatedLoaded && props.emberIssuesCreatedLoaded && props.vueIssuesCreatedLoaded;
    let closed_data_loaded = props.reactIssuesClosedLoaded && props.angularIssuesClosedLoaded && props.emberIssuesClosedLoaded && props.vueIssuesClosedLoaded;
    let data_loaded = created_data_loaded && closed_data_loaded; 
    let data = []; 
    if (!err_data && data_loaded) {
        data = [
            {'name':'react', 'ICOR': Math.round((props.reactIssuesClosed/props.reactIssuesCreated)*100)/100}, 
            {'name': 'angular.js', 'ICOR': Math.round((props.angularIssuesClosed/props.angularIssuesCreated)*100)/100}, 
            {'name': 'ember.js', 'ICOR': Math.round((props.emberIssuesClosed/props.emberIssuesCreated)*100)/100}, 
            {'name': 'vue', 'ICOR': Math.round((props.vueIssuesClosed/props.vueIssuesCreated)*100)/100} 
        ];
    }
      
    let rows = sortRows(data, err_data, data_loaded, 'ICOR'); 
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

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
                            <th>
                                {props.tag}
                                &nbsp; 
                                <svg id="icor" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-question-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                                <Tooltip placement="right" isOpen={tooltipOpen} target="icor" toggle={toggle}>
                                    This represents the ratio of Issues Closed / Issues Opened over the mentioned period of time.
                                </Tooltip>
                            </th>
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

export default GithubResolutionCard; 