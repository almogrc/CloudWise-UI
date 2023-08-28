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
import { fetchGetRequest } from '../../utils/getRequest';
import {GetThresholds, baseUrl } from '../../utils/constant';

const SettingTable = (props) => {
  const [cpuSettingAlertArray, setCpuSettingAlertArray] = useState();

  const onUpdateDataHandler = (obj) => {
    const updatedItems = cpuSettingAlertArray.map((cpuSettingItem) =>
      cpuSettingItem.name === obj.name
        ? { ...cpuSettingItem, warning: obj.warning, danger: obj.danger }
        : cpuSettingItem
    );

    setCpuSettingAlertArray(updatedItems);
  };
  const fetchThresholds = async () => {
    const headers = {"Accept": "application/json","Content-Type": "application/json", 'machineId' : props.machineId};
    const {data, isPending, error} = await fetchGetRequest(`${baseUrl}${GetThresholds}`, headers);
    const alertArray = Object.entries(data).map(([name, values]) => ({
      name,
      ...values,
    }));
    setCpuSettingAlertArray(alertArray);
    console.log(data);
  };
  useEffect(() => {
    console.log(props.machineId);
    console.log("fdsfsd");
    fetchThresholds();
  }, []);
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
            <TableCell style={tableCellStyle}>Critical</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cpuSettingAlertArray && cpuSettingAlertArray.map((item, index) => (
            <ItemData
              key={index}
              name={item.name}
              warning={item.warning}
              danger={item.critical}
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