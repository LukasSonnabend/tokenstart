import React from 'react'

import { Chart } from 'react-charts'


export default function MyChart() {
    const data =  React.useMemo(
      () => [
        {
          label: 'Series 1',
          data: [[0, Math.random() * 5], [1, Math.random() * 10], [2, 4], [3, Math.random() * 10], [4, Math.random() * 10], [5, 3], [6, Math.random() * 10], [7, Math.random() * 10], [8, Math.random() * 10], [9, Math.random() * 10] , [10, Math.random() * 10], [11, Math.random() * 10]   ]
        },
        // {
        //   label: 'Series 2',
        //   data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
        // }
      ],
      []
    )
   
    const axes = React.useMemo(
      () => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
      ],
      []
    )
   
    const lineChart = (
      // A react-chart hyper-responsively and continuously fills the available
      // space of its parent element automatically
      <div
        style={{
        width: '100%',
          height: '300px',
          margin: "0 auto"
        }}
      >
        <Chart data={data} axes={axes} />
      </div>
    )

        return lineChart
  }