import React from 'react';
import moment from "moment";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

// TODO do the time series like this
// https://github.com/recharts/recharts/issues/956#issuecomment-339279600

export default function DiaryDay(props) {
  return (
    <li className="list-group-item">
      <p>Day {props.day.from}</p>
      <section>
        <ResponsiveContainer width='95%' height={props.iframeHeigh} >
          <ScatterChart>
            <XAxis
              dataKey='time'
              domain={['auto', 'auto']}
              name='Time'
              //tickFormatter={(unixTime) => moment(unixTime).format('HH:mm Do')}
              tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
              type='number'
            />
            <YAxis dataKey='value' name='Value' />
            {props.series.map((obj, i) => {
              return <Scatter
                data={obj.data}
                line={{ stroke: '#8884d8' }}
                fill="#8884d8"
                lineJointType='monotoneX'
                lineType='joint'
                name={obj.name}
              />;
            })}
            <CartesianGrid vertical={false} />
            <Legend />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          </ScatterChart>
        </ResponsiveContainer>
      </section>
    </li >
  );
}