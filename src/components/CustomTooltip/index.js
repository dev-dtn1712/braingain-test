import './styles.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    if (!!payload[0].value.length) {
      const { value } = payload[0];
      return (
        <div className="custom-past-tooltip">
          <p className="label">x: {value?.[0]}</p>
          <p className="label">y: {value?.[1]}</p>
          <p className="label">z: {value?.[1]}</p>
        </div>
      );
    } else {
      const { value } = payload[1];
      return (
        <div className="custom-future-tooltip">
          <p className="label">x: {value?.[0]}</p>
          <p className="label">z: {value?.[1]}</p>
        </div>
      );
    }
  }

  return null;
};

export default CustomTooltip;