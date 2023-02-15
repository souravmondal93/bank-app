import React from "react";
import dynamic from 'next/dynamic'
    
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    const { lineChartData, lineChartOptions } = this.props;

    this.setState({
      chartData: lineChartData,
      chartOptions: lineChartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='area'
        width='100%'
        height='100%'
      />
    );
  }
}

export default LineChart;
