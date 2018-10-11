import React from 'react';
import { InputGroup, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-toggle-switch/dist/css/switch.min.css';

class DiaryLink extends React.Component {
    constructor(props) {
        super(props);        
        this.getDiaryLink = this.getDiaryLink.bind(this);
        this.getMyDiaryLink = this.getMyDiaryLink.bind(this);
        // preserve the initial state in a new object
        this.baseState = this.state;        
    }

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

    render() {        
        var myDiaryLink = this.getMyDiaryLink(this.props.diaryName);

        return (<div>
            <ControlLabel>Diary Link</ControlLabel><br />
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" name="diaryLink" onChange={({ target: { myDiaryLink } }) => this.setState({ diaryLink: myDiaryLink, copied: false })} value={myDiaryLink} />
                    <InputGroup.Button>
                        <CopyToClipboard text={myDiaryLink} onCopy={() => this.setState({ copied: true })}><Button>copy</Button></CopyToClipboard>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        </div>);
    }
}

export default DiaryLink;