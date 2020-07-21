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
    Col, 
    Jumbotron, 
    Button
} from 'reactstrap'; 

// main presentational component 
function HomeComponent(props) {
    let {votes, votesError, votesLoaded, votesErrorMessage, handleSubmit, message, frequency,...githubdata} = props; 
    return (
        <Container>
            <div className='text-center'>
                <Jumbotron className='bg-transparent' fluid>
                    <h1 className="display-3">Client-Side Frameworks</h1>
                    <p className="lead">This is a dashboard for comparing client-side frameworks.</p>
                    <hr className="my-2" />
                    <p className="lead"><strong>Please cast your vote below! Note: 1 vote per email and session</strong></p>
                </Jumbotron>
            </div>
            <Row className='justify-content-center text-center p-3'>
                <Col>
                    <GithubPopularityCard 
                        title='Github Popularity' 
                        tag='Stars' 
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
                        title='Issue Resolution' 
                        tag='ICOR' 
                        {...githubdata}
                    />
                </Col>
            </Row>

            <Row className='justify-content-center text-center p-3 mb-5'>
                <Col md='12'>
                    <GithubDataTable {...githubdata} />
                    <small>{message} (Updates occur every {Math.round(frequency/(1000*60)*100)/100} minute(s))</small>
                </Col>
            </Row>


            <Row className='justify-content-center text-center p-3'>
                <Col md='3'>
                    <p className='lead'><strong>Vote Tally</strong></p>
                    <VoteTable
                        votes={votes}
                        votesError={votesError}
                        votesLoaded={votesLoaded}
                    />
                </Col>
                <Col md='3'>
                    <p className='lead'><strong>Cast Vote</strong></p>
                    <VoteSubmitForm handleSubmit={handleSubmit} votesErrorMessage={props.votesErrorMessage}/>
                </Col>
            </Row>
        </Container>
    )
    

}

export default HomeComponent; 