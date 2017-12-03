import React, { Component } from 'react';

class PieChart extends Component {
  componentDidMount() {
    const deg = this.props.perc * 360;
    this.refs.fill.style.setProperty('transform', `rotate(${deg}deg)`);
  }
  componentDidUpdate() {
    const deg = this.props.perc * 360;
    this.refs.fill.style.setProperty('transform', `rotate(${deg}deg)`);
  }
  render() {
    let gt;
    if (this.props.perc >= 0.5) gt = 'pie-chart gt-50';
    else gt = 'pie-chart';

    return (
      <div className={gt}>
        <div className="pie-chart-back">
          <div className="pie-chart-fill" ref="fill" />
        </div>
        <div className="pie-chart-info">
          <span className="key">{this.props.Ascii[0]}  {this.props.Ascii[1]}</span>
          <br />
          <span className="effect">{this.props.name}</span>
          <br />
          <span className="perc">{Math.floor(this.props.perc * 100)}%</span>
        </div>
      </div>
    );
  }
}

export default PieChart;
