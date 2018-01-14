import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Bus from '../bus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';
var bus = Bus();

class DiaryLog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            mmolvalue: '',
            slowTerapy: '',
            fastTerapy: '',
            calories: '',
            comment: '',
            securityLink: ''
        };
        this.getValidationState = this.getValidationState.bind(this);
        this.change = this.change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // preserve the initial state in a new object
        this.baseState = this.state;
        this.subscribeForEvents();
    }

    change(event) {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === "mmolvalue") {
            this.setState({
                ['value']: this.convertFromMmol(value)
            });
        }
        if (name === "value") {
            this.setState({
                ['mmolvalue']: this.convertToMmol(value)
            });
        }
        this.setState({
            [name]: value
        });
    }

    subscribeForEvents = () => {
        var _this = this;
        bus.subscribe("LogSucceed", function (msg) {
            toast.info(msg);
            _this.setState(_this.baseState);
        });
        bus.subscribe("LogErroed", function (err) {
            toast.error(err);
        });        
    }

    handleSubmit(event) {
        event.preventDefault();
        var isValid = this.getValidationState();
        if (isValid === true) {
            bus.publish("LogFormFilled", this.state);
        } else {
            toast.error(isValid);
        }
    }

    resetForm = () => {
        this.setState(this.baseState);
    }

    convertFromMmol(mmol) {
        return Math.round(mmol * 18.0182);
    }

    convertToMmol(val) {
        return Math.round(val / 18.0182);
    }

    getValidationState() {
        var isValid = true;
        const fastTerapy = this.state.value.length;

        if (this.state.value.length > 0) {
            if (this.state.value > 0 && this.state.value < 20) return 'warning: value is very low';
            else if (this.state.value < 10) return 'error: value is too low';
            else if (this.state.value > 800) return 'error: value is too high';
        }

        if (this.state.mmolvalue.length > 0) {
            if (this.state.mmolvalue > 0 && this.state.mmolvalue < 2) return 'warning: mmolvalue is very low';
            else if (this.state.mmolvalue < 1) return 'error: mmolvalue is too low';
            else if (this.state.mmolvalue > 35) return 'error: mmolvalue is too high';
        }

        if (this.state.slowTerapy.length > 0) {
            if (this.state.slowTerapy > 0 && this.state.slowTerapy < 3) return 'warning: slow terapy is very low';
            else if (this.state.slowTerapy < 2) return 'error: slow terapy is too low';
            else if (this.state.slowTerapy > 150) return 'error: slow terapy is too high';
        }

        if (this.state.fastTerapy.length > 0) {
            if (this.state.fastTerapy > 0 && this.state.fastTerapy < 2) return 'warning: fast terapy is very low';
            else if (this.state.fastTerapy < 1) return 'error: fast terapy is too low';
            else if (this.state.fastTerapy > 60) return 'error: fast terapy is too high';
        }

        return isValid;
    }

    render() {
        const divStyle = {
            margin: '5px'
        };

        // return (<input type="text" value={text} onChange={this.change} />);
        return <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
            <h2>Diary</h2>
            <FormGroup controlId="formBasicText">
                <Grid>
                    <Row>
                        <Col xs={9} md={6} lg={6}>
                            <FormControl style={divStyle} type="number" name="value" value={this.state.value} onChange={this.change} placeholder="value" />
                        </Col>
                        <Col xs={9} md={6} lg={6}>
                            <FormControl style={divStyle} type="number" name="mmolvalue" value={this.state.mmolvalue} onChange={this.change} placeholder="mmol value" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md={6} lg={6}>
                            <FormControl style={divStyle} type="number" name="slowTerapy" value={this.state.slowTerapy} onChange={this.change} placeholder="slow terapy number" /></Col>
                        <Col xs={9} md={6} lg={6}>
                            <FormControl style={divStyle} type="number" name="fastTerapy" value={this.state.fastTerapy} onChange={this.change} placeholder="fast terapy number" /></Col>
                    </Row>
                    <Row>
                        <Col xs={9} md={6} lg={6}>
                            <FormControl style={divStyle} type="number" name="calories" value={this.state.calories} onChange={this.change} placeholder="calories" /></Col>
                        <Col xs={10} md={6} lg={6}>
                            <FormControl style={divStyle} name="comment" componentClass="textarea" value={this.state.comment} onChange={this.change} placeholder="comment" maxLength="400" />
                        </Col>
                    </Row>
                    <Row>
                        <br />
                        <Col xs={10} md={3} lg={3}>
                            <Button bsStyle="primary" type="submit">Submit</Button>
                        </Col>
                        <Col xs={10} md={9} lg={9}>
                            <Button bsStyle="warning" onClick={this.resetForm}>Reset</Button>
                        </Col>
                    </Row>
                </Grid>
            </FormGroup>
        </form>
    }
}

export default DiaryLog;