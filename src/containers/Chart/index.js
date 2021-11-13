import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend
} from 'recharts';
import CustomTooltip from '../../components/CustomTooltip';
import CustomLegend from './CustomLegend';
import PastCSV from '../../constants/Past.csv';
import FutureCSV from '../../constants/Future.csv';
import {
  PAST_ACCEPTABLE_INCREASE_COLOR,
  PAST_MONTHLY_DATA_COLOR,
  FUTURE_FORECAST_COLOR,
  FUTURE_ACCEPTABLE_INCREASE_COLOR
} from '../../constants/chartThemeColor';
import { getJsonFromCsv } from '../../utils/utils';

const Chat = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pastData = await getJsonFromCsv(PastCSV);
      const futureData = await getJsonFromCsv(FutureCSV);
      const customPastData = pastData.map(data => ({
        date: moment(data.t).format('MMM YYYY'),
        range: [
          Number(data.x),
          Number(data.y),
          Number(data.z)
        ],
        featureLinePoints: data?.zf || undefined,
        futureRange: []
      }));

      const customFutureData = futureData.map(data => {
        const xPosition = data.xf === 'NaN' ? data.zf : data.xf;
        return {
          date: moment(data.tx).format('MMM YYYY'),
          range: [],
          featureLinePoints: data?.zf,
          futureRange: [
            xPosition,
            data.zf
          ]
        };
      });
      setData([...customPastData, ...customFutureData]);
    }
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Area
          dot={{
            stroke: PAST_MONTHLY_DATA_COLOR,
            fill: PAST_MONTHLY_DATA_COLOR,
            strokeWidth: 2
          }}
          dataKey="range"
          stroke={PAST_ACCEPTABLE_INCREASE_COLOR}
          fill={PAST_ACCEPTABLE_INCREASE_COLOR}
        />

        <Area
          fill={FUTURE_FORECAST_COLOR}
          strokeDasharray="0 4"
          dataKey="futureRange"
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="featureLinePoints"
          stroke={FUTURE_ACCEPTABLE_INCREASE_COLOR}
          strokeDasharray="4 4"
        />
        <CartesianGrid strokeDasharray="1 1" />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          iconType="circle"
          verticalAlign="bottom"
          content={<CustomLegend />}
          wrapperStyle={{
            marginTop: 12,
            padding: 12,
            bottom: 0,
            border: '1px solid #474747'
          }}
          align="center"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default Chat