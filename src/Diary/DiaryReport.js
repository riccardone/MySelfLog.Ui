import React from 'react';
import { InputGroup, Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Switch from 'react-toggle-switch';
import Bus from '../bus';
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
        this.getDiaryLink = this.getDiaryLink.bind(this);        
        this.getMyDiaryLink = this.getMyDiaryLink.bind(this);   
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

    getDiaryLink = (diaryName) => {
        if (process.env.NODE_ENV === 'production') {
            return 'http://www.myselflog.com:5005/diary/' + diaryName + '/all/mgdl';
        }
        return 'http://localhost:5005/diary/' + diaryName + '/all/mgdl';
    }

    getMyDiaryLink = (diaryName) => {
        if (process.env.NODE_ENV === 'production') {
            return 'http://www.myselflog.com/diary/' + diaryName + '';
        }
        return 'http://localhost:3000/diary/' + diaryName + '';
    }

    setAutoRefresh() {        
        return setInterval(() => this.setState(s => ({ iframeKey: s.iframeKey + 1 })), 10000);
    }

    subscribeForEvents = () => {
        bus.subscribe("DiaryCreated", this.handleDiaryCreated);
    }

    render() {
        var diaryLink = this.getDiaryLink(this.props.diaryName);
        var myDiaryLink = this.getMyDiaryLink(this.props.diaryName);

        const divStyle = {
            margin: '0px',
            border: '0px'
        };

        return <div>
            <Grid>
                <Row>
                    <Col xs={4} md={4} lg={4}>
                        <ControlLabel>Diary Link</ControlLabel><br />
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" name="diaryLink" onChange={({ target: { myDiaryLink } }) => this.setState({ diaryLink: myDiaryLink, copied: false })} value={myDiaryLink} />
                                <InputGroup.Button>
                                    <CopyToClipboard text={myDiaryLink} onCopy={() => this.setState({ copied: true })}><Button>copy</Button></CopyToClipboard>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={6} lg={6}></Col>
                    <Col xs={2} md={2} lg={2}>
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
                        <iframe title="diary report" style={divStyle} key={this.state.iframeKey} src={diaryLink} height={this.state.iframeHeigh} width="100%"></iframe>
                    </Col>
                </Row>
            </Grid>
        </div>;
    }
}

export default DiaryReport;