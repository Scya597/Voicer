import React, { Component } from 'react';

class PieChart extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
   let deg = this.props.perc * 360;
   this.refs.fill.style.setProperty('transform', `rotate(${deg}deg)`);
  }
  componentDidUpdate() {
   let deg = this.props.perc * 360;
   this.refs.fill.style.setProperty('transform', `rotate(${deg}deg)`);
  }
  render() {
   let gt;
   if(this.props.perc >= 0.5) gt = 'pie-chart gt-50';
   else gt = 'pie-chart';


   return (
    <div className={gt}>
      <div className="pie-chart-back">
        <div className="pie-chart-fill" ref="fill" />
      </div>
      <div className="pie-chart-info"><span className="key">W</span><br /><span className="effect">BASE</span><br /><span className="perc">90%</span></div>
    </div>
   );
  }
}

export default PieChart;
