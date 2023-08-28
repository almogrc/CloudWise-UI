import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TableComponnent from "../components/AlertSettingItems/TableComponnent"
import CheckBoxAlerts from "../components/AlertSettingItems/CheckBoxAlerts";
import SettingTable from "../components/AlertSettingItems/SettingTable";
import { fetchGetRequest } from '../utils/getRequest';
import {GetThresholds, baseUrl } from '../utils/constant';

const DUMMY_DATA = [
  {
    name: "CPU1",
    warning: "56",
    danger: "90",
  },
  {
    name: "CPU2",
    warning: "33",
    danger: "54",
  },
  {
    name: "CPU3",
    warning: "88",
    danger: "12",
  },
  {
    name: "CPU4",
    warning: "33",
    danger: "11",
  },
];

export default function AlertsPage (props) {
  const [formData, setFormData] = useState({
    threshHoldsData: DUMMY_DATA,
    EmailPrefData: {
      danger: false,
      warning: false,
      nonOfAbove: false,
    },
  });
  const [machineName, setMachineName] = useState(false);
  const [IsMachineName, setIsMachineName] = useState(false);

  const location = useLocation();

  const updateCpuSettingDataHandler = (obj) => {
    setFormData({
      EmailPrefData: formData.EmailPrefData,
      threshHoldsData: obj,
    });
    console.log(formData);
  };
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const url = "/api/update_cpu_setting";
    const body = formData;
    console.log(body);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Sent successfully.");
      } else {
        console.error("Failed to submit form data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onCheckBoxHandler = (values) => {
    setFormData({
      threshHoldsData: formData.threshHoldsData,
      EmailPrefData: {
        danger: values.danger,
        warning: values.warning,
        nonOfAbove: values.nonOfAbove,
      },
    });
  };
  const getMachineNameFromUrl = () => {
    const currentPathname = location.pathname;
    console.log(location.pathname);
    const pathSegments = currentPathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    console.log(lastSegment);
    setMachineName(lastSegment);
    setIsMachineName(true);
    console.log(machineName);
  };

  useEffect(() => {
    getMachineNameFromUrl();
  },[]);

  return (
    <Helmet>
        <title> Alerts | CloudWise </title>
      </Helmet>,

    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div id="title" style={{ fontSize: "24px", fontWeight: "bold" }}>
        Alert Setting Page
      </div>
      {IsMachineName && <div>
         <SettingTable
          machineId={machineName}
          updateCpuSettingData={updateCpuSettingDataHandler}
        />
      </div>
      }
      <div>
        <CheckBoxAlerts onCheckBox={onCheckBoxHandler} />
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </form>
      </div>
      <BottomNavigation
        showLabels
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#f5f5f5",
        }}
      />

    </div>
  );
};

