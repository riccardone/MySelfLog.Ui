import React from 'react';
import { Glyphicon, InputGroup, Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NavBarTopNoAuth from '../navbar.noauth.top';
import Switch from 'react-toggle-switch';
import 'react-toggle-switch/dist/css/switch.min.css';
import moment from 'moment';

class MyDiary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAvailable: false,
            iframeKey: 0,
            iframeHeigh: 800,
            switched: true,
            intervalId: this.setAutoRefresh(),
            from: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            to: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
            diaryName: this.props.match.params.diaryname,
            diaryFormat: 'mgdl',
            diaryType: 'all'
        };
        // preserve the initial state in a new object
        this.baseState = this.state;
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.getSelectedDate = this.getSelectedDate.bind(this);
    }

    handlePrev() {
        var day = moment(this.state.from).subtract(1, "days");
        this.setState({
            from: day.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            to: day.endOf('day').format('YYYY-MM-DD HH:mm:ss')
        });
    }

    handleNext() {
        var day = moment(this.state.from).add(1, 'days');
        this.setState({
            from: day.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            to: day.endOf('day').format('YYYY-MM-DD HH:mm:ss')
        });
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

    getSelectedDate = () => {
        var locale = window.navigator.userLanguage || window.navigator.language;
        return moment(this.state.from).locale(locale).format('LL'); //'YYYY-MM-DD');
    }

    setAutoRefresh() {
        // https://stackoverflow.com/a/47897304    
        return setInterval(() => this.setState(s => ({ iframeKey: s.iframeKey + 1 })), 10000);
    }

    render() {
        function getLink(diaryName, diaryType, diaryFormat, from, to) {
            if (process.env.NODE_ENV === 'production') {
                return 'http://www.myselflog.com:5005/diary/' + diaryName + '/' + diaryType + '/' + diaryFormat + '/from/' + from + '/to/' + to + '';
            }
            return 'http://localhost:5005/diary/' + diaryName + '/' + diaryType + '/' + diaryFormat + '/from/' + from + '/to/' + to + '';
        }

        var diaryLink = getLink(this.state.diaryName, this.state.diaryType, this.state.diaryFormat, this.state.from, this.state.to);
        var diaryName = this.state.diaryName;

        const divStyle = {
            margin: '0px',
            border: '0px'
        };

        const divStyle2 = {
            //border: '1px solid black',
            margin: '0px',
            textAlign: 'center'
        };

        return <div>
            <NavBarTopNoAuth diaryName={diaryName} />
            <div className="container">
                <Grid>
                    <Row>
                        <Col xs={1} md={1} lg={1}>
                            <div style={divStyle2}>
                                <Button bsStyle="info" onClick={this.handlePrev}><Glyphicon glyph="chevron-left" /></Button>
                            </div>
                        </Col>
                        <Col xs={2} md={2} lg={2}>
                            <div style={divStyle2}>{this.getSelectedDate()}</div>
                        </Col>
                        <Col xs={1} md={1} lg={1}>
                            <div style={divStyle2}>
                                <Button bsStyle="info" onClick={this.handleNext}><Glyphicon glyph="chevron-right" /></Button>
                            </div>
                        </Col>
                        <Col xs={6} md={6} lg={6}>
                            <div style={divStyle2}>
                                
                            </div>
                        </Col>
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
                            <iframe style={divStyle} key={this.state.iframeKey} src={diaryLink} height={this.state.iframeHeigh} width="100%"></iframe>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </div>;
    }
}

export default MyDiary;