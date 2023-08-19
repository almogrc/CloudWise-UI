
import "./ItemData.css"
import { Grid, TableRow, TableCell,Slider } from '@mui/material';
import ScrollBar from "./SlideBar";

const ItemData = (props) => {
  const onChangeSlideBarHandler = (value, name, category) => {
    let newCpuItem = {};

    if (category === "Warning") {
      newCpuItem = {
        name,
        warning: String(value),
        danger: props.danger,
      };
      console.log(newCpuItem);
    } else {
      newCpuItem = {
        name,
        warning: props.warning,
        danger: String(value),
      };
      console.log(newCpuItem);
    }
    props.onUpdateData(newCpuItem);
  };

  const tableCellStyle = {
    borderRight: "1px solid #ddd",
    textAlign: "center",
  };

  return (
<TableRow style={{ borderBottom: "1px solid #ddd" }}>
      <TableCell style={tableCellStyle}>
        {props.name}
      </TableCell>
      <TableCell style={tableCellStyle}>
        <div className="slider-column">
          {props.index === 0 && (
            <div className="column-title">Warning</div>
          )}
          <Slider
            value={Number(props.warning)}
            onChange={(event, newValue) =>
              onChangeSlideBarHandler(newValue, props.name, "Warning")
            }
          />
          <div>{props.warning}</div>
        </div>
      </TableCell>
      <TableCell style={tableCellStyle}>
        <div className="slider-column">
          {props.index === 0 && (
            <div className="column-title">Danger</div>
          )}
          <Slider
            value={Number(props.danger)}
            onChange={(event, newValue) =>
              onChangeSlideBarHandler(newValue, props.name, "Danger")
            }
          />
          <div>{props.danger}</div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ItemData;
