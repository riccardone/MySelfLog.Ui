import React from "react";
import { Grid, Row } from "react-bootstrap";
import Footer from "../footer";
import DiaryReport from './DiaryReport';
import NavBarTopNoAuth from "../navbar.noauth.top";
import "react-toggle-switch/dist/css/switch.min.css";
import "./mydiary.css";

class MyDiary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvailable: false,
      iframeKey: 0,
      iframeHeigh: 700,            
      diaryName: this.props.match.params.diaryname      
    };
    // preserve the initial state in a new object
    this.baseState = this.state;    
  } 

  render() {   
    var diaryName = this.state.diaryName;    

    return (
      <div>
        <NavBarTopNoAuth diaryName={diaryName} />
        <div className="container">
          <Grid fluid className="noPadding">            
            <Row className="noMargin">
              <DiaryReport diaryName={diaryName} />
            </Row>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyDiary;
