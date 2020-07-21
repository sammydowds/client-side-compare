import React from 'react'; 
import {
    Card, 
    CardTitle, 
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
         let sorted_rows =  sorted_data.map((object) => {
             return(
                 <tr>
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
            {'name': 'angular', 'ICOR': Math.round((props.angularIssuesClosed/props.angularIssuesCreated)*100)/100}, 
            {'name': 'ember', 'ICOR': Math.round((props.emberIssuesClosed/props.emberIssuesCreated)*100)/100}, 
            {'name': 'vue', 'ICOR': Math.round((props.vueIssuesClosed/props.vueIssuesCreated)*100)/100} 
        ];
    }
      
    let rows = sortRows(data, err_data, data_loaded, 'ICOR'); 

    return(
        <Card>
            <CardTitle>{props.title} over {props.activity} wks</CardTitle>
            <CardBody>
                <Table size='sm'hover>
                    <thead>
                        <tr>
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

export default GithubResolutionCard; 