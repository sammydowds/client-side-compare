import React from 'react';
import VoteSubmitForm from './sub/VoteSubmitFormComponent';
import VoteTable from './sub/VoteTableComponent';
import GithubDataTable from './sub/GithubDataTableComponent';
import GithubPopularityCard from './sub/GithubPopularityCardComponent'; 
import GithubActivityCard from './sub/GithubActivityCardComponent'; 
import GithubResolutionCard from './sub/GithubResolutionCardComponent'; 
import {
    Container, 
    Row, 
    Col
} from 'reactstrap'; 

// main presentational component 
function HomeComponent(props) {
    let {votes, votesError, votesLoaded, handleSubmit, message, frequency,...githubdata} = props; 
    return (
        <Container>
            <Row className='justify-content-center text-center p-3'>
                <Col>
                    <GithubPopularityCard 
                        title='Popularity' 
                        tag='star-gazers' 
                        {...githubdata}
                    />
                </Col>
                <Col>
                    <GithubActivityCard 
                        title='Activity' 
                        tag='Commits' 
                        {...githubdata}
                    />
                </Col>
                <Col>
                    <GithubResolutionCard 
                        title='Resolution' 
                        tag='ICOR' 
                        {...githubdata}
                    />
                </Col>
            </Row>

            <Row className='justify-content-center text-center p-3'>
                <Col md='12'>
                    <GithubDataTable {...githubdata} />
                    <small>{message} (Updates occur every {Math.round(frequency/(1000*60)*100)/100} minute(s))</small>
                </Col>
            </Row>


            <Row className='justify-content-center text-center p-3'>
                <Col md='3'>
                    <h1>Vote Tally</h1>
                    <VoteTable
                        votes={votes}
                        votesError={votesError}
                        votesLoaded={votesLoaded}
                    />
                </Col>
                <Col md='3'>
                    <h1>Cast Vote</h1>
                    <VoteSubmitForm handleSubmit={handleSubmit} />
                </Col>
            </Row>
        </Container>
    )
    

}

export default HomeComponent; 