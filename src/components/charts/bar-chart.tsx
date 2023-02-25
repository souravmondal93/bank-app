import React, { Component } from "react";
import dynamic from 'next/dynamic'
    
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type BarChartProps = {
  barChartData: any;
  barChartOptions: any
};
type BarChartState = {
  chartData: any;
  chartOptions: any;
};

class BarChart extends Component<BarChartProps, BarChartState> {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { barChartData, barChartOptions } = this.props;

    this.setState({
      chartData: barChartData,
      chartOptions: barChartOptions,
    });
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='bar'
        width='100%'
        height='100%'
      />
    );
  }
}

export default BarChart;
