import React from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Switch from 'react-toggle-switch';
import Bus from '../bus';
import { toast } from 'react-toastify';
import '../App.css';
import 'react-toggle-switch/dist/css/switch.min.css';
var bus = Bus();

class DiaryReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvailable: false,
            iframeKey: 0,
            iframeHeigh: 800,
            switched: true,
            intervalId: this.setAutoRefresh()
        };
        this.onChange = this.onChange.bind(this);
        // preserve the initial state in a new object
        this.baseState = this.state;
        this.subscribeForEvents();
    }

    toggleSwitch = () => {
        var _this = this;
        var switched = !_this.state.switched;
        if (!switched) {
            clearInterval(_this.state.intervalId);
        } else {
            _this.setState({
                intervalId: _this.setAutoRefresh()
            });
        }
        _this.setState({ switched: switched });
    };

    setAutoRefresh() {
        // https://stackoverflow.com/a/47897304    
        return setInterval(() => this.setState(s => ({ iframeKey: s.iframeKey + 1 })), 10000);
    }

    onChange(event) {
        const re = /^[a-zA-Z0-9_.-]*$/;
        // TODO ?        
    }

    subscribeForEvents = () => {
        bus.subscribe("DiaryCreated", this.handleDiaryCreated);
    }

    render() {
        //const diaryLink = 'http://www.myselflog.com:5005/diary/' + this.props.diaryName + '/all/mgdl';
        const diaryLink = 'http://localhost:5005/diary/' + this.props.diaryName + '/all/mgdl';

        const divStyle = {
            margin: '0px',
            border: '0px'            
        };

        return <div>
            <Grid>
                <Row>
                    <Col xs={9} md={11} lg={11}>
                        <ControlLabel>Link</ControlLabel><br />
                        <a target="_blank" href={diaryLink}>{diaryLink}</a>
                    </Col>
                    <Col xs={3} md={1} lg={1}>
                        <div>
                            <span>Autorefresh</span>
                        </div>
                        <div>
                            <Switch onClick={this.toggleSwitch} on={this.state.switched} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <iframe style={divStyle} key={this.state.iframeKey} src={diaryLink} height={this.state.iframeHeigh} width="100%"></iframe>
                    </Col>
                </Row>
            </Grid>
        </div>;
    }
}

export default DiaryReport;