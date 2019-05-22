import React, { Component } from "react";
import {ThemeContext} from '../theme.context';
// import { TimeSeries, TimeRange } from "pondjs";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
// import {
//   Charts,
//   ChartContainer,
//   ChartRow,
//   YAxis,
//   LineChart,
//   Resizable
// } from "react-timeseries-charts";

// import 'morris.js/morris.css';
// import 'morris.js/morris.js';
import moment from "moment";
import DataReader from "./dataReader";
// const webpack = require('webpack');
// module.exports = {
//     plugins: [
//         new webpack.ProvidePlugin({
//             Raphael: 'raphael'
//         })
//     ]    
// };
var reader = new DataReader();

class DiaryDay extends Component {
  constructor(props) {
    super(props);
    // TODO Redo all using morris js
    // https://stackoverflow.com/a/49377376
    this.state = {
      from: moment(this.props.day.from).valueOf(),
      to: moment(this.props.day.to).valueOf(),
      data: []
      // timeseries: new TimeSeries(),
      // timerange: new TimeRange([
      //   moment(this.props.day.from).valueOf(),
      //   moment(this.props.day.to).valueOf()
      // ])
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    reader.searchForADay(this.props.day).then(this.searchCompleted);
  }

  componentDidUpdate() {
    reader.searchForADay(this.props.day).then(this.searchCompleted);
  }

  searchCompleted = resp => {
    if (!resp) return;
    var _this = this;
    var points = [];
    resp.diaryData.forEach(log => {
      if (log.Value) {
        points.push([moment(log.LogDate).valueOf(), log.Value, 0, 0]);
      }
      if (log.Calories) {
        points.push([moment(log.LogDate).valueOf(), 0, 0, log.Calories]);
      }
      if (log.Terapy) {
        points.push([moment(log.LogDate).valueOf(), 0, log.Terapy, 0]);
      }
    });
    _this.setState({
      data: points
      // timeseries: new TimeSeries({
      //   name: "diary",
      //   columns: ["time", "values", "terapies", "calories"],
      //   points: points
      // }),
      // timerange: new TimeRange([
      //   moment(_this.props.day.from).valueOf(),
      //   moment(_this.props.day.to).valueOf()
      // ])
    });
  };

  render() {
    return (
      <li className="list-group-item">
        <p>Day {this.props.day.from}</p>
        <ThemeContext.Consumer>
          {theme => (
            <section className={theme}>
              <h2>ciao</h2>
            </section>
          )}
        {/* <Resizable>
          <ChartContainer timeRange={this.state.timerange}>
            <ChartRow height="120">
              <YAxis
                id="axis1"
                label="TOT"
                min={0}
                max={50}
                //width="60"
                type="linear"
                format=","
              />
              <Charts>
                <LineChart
                  axis="axis1"
                  series={this.state.timeseries}
                  columns={["values"]}
                  //style={style}
                />
                <LineChart
                  axis="axis1"
                  series={this.state.timeseries}
                  columns={["terapies"]}
                  //style={style}
                />
                <LineChart
                  axis="axis1"
                  series={this.state.timeseries}
                  columns={["calories"]}
                  //style={style}
                />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable> */}
        </ThemeContext.Consumer>
      </li>
    );
  }
}

export default DiaryDay;
