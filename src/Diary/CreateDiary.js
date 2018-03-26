import React from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Bus from '../bus';
import { toast } from 'react-toastify';
var bus = Bus();

class CreateDiary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaryName: '',
            isAvailable: false
        };
        //this.getValidationState = this.getValidationState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDiaryNameIsAvailable = this.handleDiaryNameIsAvailable.bind(this);
        this.handleDiaryNameIsNotAvailable = this.handleDiaryNameIsNotAvailable.bind(this);
        this.handleDiaryCreated = this.handleDiaryCreated.bind(this);
        // preserve the initial state in a new object
        this.baseState = this.state;
        this.subscribeForEvents();
    }

    onChange(event) {
        const re = /^[a-zA-Z0-9_.-]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({ diaryName: event.target.value });
            if (!this.validate(event.target.value).diaryName) {
                bus.publish("SearchForDuplicates", event.target.value);
            }
        }
    }

    subscribeForEvents = () => {       
        bus.subscribe("DiaryCreated", this.handleDiaryCreated);
        bus.subscribe("DiaryNameIsAvailable", this.handleDiaryNameIsAvailable);
        bus.subscribe("DiaryNameIsNotAvailable", this.handleDiaryNameIsNotAvailable);
    }

    handleDiaryCreated(data) {
        toast.info(data.message);        
        window.location = "/diary/" + data.diaryName;
    }

    handleDiaryNameIsAvailable(data) {        
        this.setState({ isAvailable: false });
    }

    handleDiaryNameIsNotAvailable(data) {
        this.setState({ isAvailable: true });
    }

    handleSubmit(event) {
        event.preventDefault();
        var errors = this.validate(this.state.diaryName); //this.getValidationState();
        if (!Object.keys(errors).some(x => errors[x])) {
            bus.publish("CreateDiary", this.state);
        } else {
            toast.error("The inserted name is not valid");
        }
    }

    resetForm = () => {
        this.setState(this.baseState);
    }

    validate(diaryName) {
        var matchesForChars = diaryName.match(/[a-z]/gi) || [];
        var matchesForDigits = diaryName.match(/[0-9]/gi) || [];
        return {
            diaryName: matchesForChars.length + matchesForDigits.length < 4,
            isAvailable: this.state.isAvailable
        };
    }    

    render() {
        const divStyle = {
            margin: '5px'
        };

        const errors = this.validate(this.state.diaryName);        
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        return <form onSubmit={this.handleSubmit}>
            <h2>Create your Diary</h2>
            <FormGroup>
                <Grid>
                    <Row>
                        <Col xs={4} md={4} lg={4}>
                            <ControlLabel>Define a unique name</ControlLabel>
                            <FormControl style={divStyle} type="text" name="name" placeholder="name" value={this.state.diaryName} onChange={this.onChange} />
                        </Col>
                        <Col xs={8} md={8} lg={8} />
                    </Row>
                    <Row>
                        <br />
                        <Col xs={10} md={3} lg={3}>
                            <Button bsStyle="success" type="submit" disabled={isDisabled}>Submit</Button>
                        </Col>
                        <Col xs={10} md={9} lg={9} />
                    </Row>
                </Grid>
            </FormGroup>
        </form>;
    }
}

export default CreateDiary;