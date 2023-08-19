import { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ItemData from "./ItemData";


const SettingTable = (props) => {
  const [cpuSettingAlertArray, setCpuSettingAlertArray] = useState(props.data);

  const onUpdateDataHandler = (obj) => {
    const updatedItems = cpuSettingAlertArray.map((cpuSettingItem) =>
      cpuSettingItem.name === obj.name
        ? { ...cpuSettingItem, warning: obj.warning, danger: obj.danger }
        : cpuSettingItem
    );

    setCpuSettingAlertArray(updatedItems);
  };

  useEffect(() => {
    console.log('Updated Array:', cpuSettingAlertArray);
    props.updateCpuSettingData(cpuSettingAlertArray);
  }, [cpuSettingAlertArray]);

  const tableCellStyle = {
    borderRight: "1px solid #ddd",
    textAlign: "center",
  };


  return (
<TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={tableCellStyle}>Name</TableCell>
            <TableCell style={tableCellStyle}>Warning</TableCell>
            <TableCell style={tableCellStyle}>Danger</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cpuSettingAlertArray.map((item, index) => (
            <ItemData
              key={index}
              name={item.name}
              warning={item.warning}
              danger={item.danger}
              onUpdateData={onUpdateDataHandler}
              cpuSettingAlertArray={cpuSettingAlertArray}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SettingTable;








// const SettingTable = (props) => {
//   const [cpuSettingAlertArray, setCpuSettingAlertArray] = useState(props.data);

//   const onUpdateDataHandler = (obj) => {
//     console.log(obj);

//     const updatedItems = cpuSettingAlertArray.map((cpuSettingItem) =>
//       cpuSettingItem.name === obj.name
//         ? { ...cpuSettingItem, warning: obj.warning, danger: obj.danger }
//         : cpuSettingItem
//     );
//     console.log(updatedItems);
//     console.log(cpuSettingAlertArray);
//     setCpuSettingAlertArray(updatedItems);
//     console.log('NIZ');
//     console.log(updatedItems);
//     console.log(cpuSettingAlertArray);
//     props.updateCpuSettingData(cpuSettingAlertArray);
//   };