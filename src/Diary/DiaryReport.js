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
            diaryName: '',
            isAvailable: false,
            iframeKey: 0,
            iframeHeigh: 600,
            switched: true,
            intervalId: this.setAutoRefresh()
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDiaryCreated = this.handleDiaryCreated.bind(this);
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

    handleDiaryCreated(data) {

    }

    handleSubmit(event) {
        event.preventDefault();
        var errors = this.validate(this.state.diaryName);
        if (!Object.keys(errors).some(x => errors[x])) {
            // TODO ?
        } else {
            toast.error("...not valid");
        }
    }

    render() {
        const divStyle = {
            margin: '5px'
        };

        const divStyleForLinkRow = {
            paddingTop: '40px'
        };

        // function DiaryLink(props) {
        //     return <Grid>
        //         <Row>
        //             <Col xs={6} md={6} lg={6} style={divStyleForLinkRow}>
        //                 <ControlLabel>Link</ControlLabel><br />
        //                 <a target="_blank" href={'http://www.myselflog.com:5005/diary/' + this.state.diaryName + '/all/mgdl'}>Show '{this.state.diaryName}' diary</a>
        //             </Col>
        //         </Row>
        //     </Grid>
        // }

        return <div>
            <Grid>
                <Row>
                    <Col xs={11} md={11} lg={11}>
                        {/* <DiaryLink diaryName={this.props.diaryName} /> */}
                        <ControlLabel>Link</ControlLabel><br />
                        <a target="_blank" href={'http://www.myselflog.com:5005/diary/' + this.props.diaryName + '/all/mgdl'}>Show '{this.props.diaryName}' diary</a>
                    </Col>
                    <Col xs={1} md={1} lg={1}>
                        <div>
                            <span> Autorefresh</span>
                        </div>
                        <div>
                            <Switch onClick={this.toggleSwitch} on={this.state.switched} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <iframe key={this.state.iframeKey} src="http://localhost:5005/diary/riccardo/values/mgdl" ref={(f) => this.ifr = f} height={this.state.iframeHeigh} width="100%"></iframe>
                    </Col>
                </Row>
            </Grid>
        </div>;
    }
}

export default DiaryReport;