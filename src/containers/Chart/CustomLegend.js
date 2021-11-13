import DashLine from '../../components/DashLine';
import './_styles.css';

const CustomLegend = ({ payload }) => {
  return payload.map(lengendItem => {
    console.log(lengendItem);
    switch(lengendItem.dataKey) {
      case 'featureLinePoints':
        return <>
          <div className="legend_item">
            <div className="legend_icon_style">
              <DashLine />
            </div>
            <p className="legend_label">FORECAST</p>
          </div>
          <div className="legend_item">
            <div className="legend_circle_icon_style">
              <span class="legend_icon_dot"></span>
            </div>
            <p className="legend_label">MONTHLY DATA</p>
          </div>
        </>
      case 'range':
        return <div className="legend_item">
          <div className="legend_icon_style">
            <div
              className="legend_item_acceptable"
              style={{ backgroundColor: lengendItem.payload.fill }}
            />
          </div>
          <p className="legend_label">ACCEPTABLE INCREASE</p>
        </div>
      case 'futureRange':
        return <div className="legend_item">
          <div className="legend_icon_style">
            <div
              className="legend_item_acceptable"
              style={{ backgroundColor: lengendItem.payload.fill }}
            />
          </div>
          <p className="legend_label">FORECAST INCREASE</p>
        </div>
      default:
        break;
    }

    return null;
  });
}

export default CustomLegend;