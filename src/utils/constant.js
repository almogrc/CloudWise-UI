export const isDevelopment = true;

export const baseUrl = isDevelopment? "http://localhost:5001/api" : "http://";

export const loginEndpoint = `/Connection/login`;

export const connectionEndpoint =  "/Connection";

export const virtualMachineEndpoint =  "/VirtualMachine";

export const addVirtualMachineEndpoint = `/VirtualMachine/addVM`;

export const removeVirtualMachineEndpoint =  `/VirtualMachine/removeVM`;

export const getAllVMs = '/VirtualMachine/GetAllVMs';

// node exporter

export const machineBase = '/machine/NodeExporter'

export const RamUsageUrl = `${baseUrl}${machineBase}/RamUsage`;

export const CPUUsageUrl = `${baseUrl}${machineBase}/CPUUsage`;

export const NetworkUrl = `${baseUrl}${machineBase}/Network`;

export const RamUrl = `${baseUrl}${machineBase}/Ram`;

export const CoresUrl = `${baseUrl}${machineBase}/Cores`;

export const RamGaugeUrl = `${baseUrl}${machineBase}/RamGauge`;

export const CPUGaugeUrl = `${baseUrl}${machineBase}/CPUGauge`;

// process exporter

export const ProcessExporterBase = '/machine/ProcessExporter'

export const RamUsageProcessesUrl = `${baseUrl}${ProcessExporterBase}/ResidentMemory`;

export const CpuUserProcessesUrl = `${baseUrl}${ProcessExporterBase}/CPUUser`;

export const CpuSystemProcessesUrl = `${baseUrl}${ProcessExporterBase}/CPUSystem`;

export const ReadBytesProcessesUrl = `${baseUrl}${ProcessExporterBase}/ReadBytes`;

export const machineIdHeader = 'machineId';

// forcasts node exporter

export const machinePredictBase = '/machine/NodePredict'

export const RamUsagePredictUrl = `${baseUrl}${machinePredictBase}/RamUsage`;

export const CPUUsagePredictUrl = `${baseUrl}${machinePredictBase}/CPUUsage`;

export const NetworkPredictUrl = `${baseUrl}${machinePredictBase}/Network`;

// forcasts process exporter

export const ProcessExporterPredictBase = '/machine/ProcessPredict'

export const RamUsageProcessesPredictUrl = `${baseUrl}${ProcessExporterPredictBase}/ResidentMemory`;

export const CpuUserProcessesPredictUrl = `${baseUrl}${ProcessExporterPredictBase}/CPUUser`;

export const CpuSystemProcessesPredictUrl = `${baseUrl}${ProcessExporterPredictBase}/CPUSystem`;

export const ReadBytesProcessesPredictUrl = `${baseUrl}${ProcessExporterPredictBase}/ReadBytes`;

export const logout = () => {
    window.localStorage.removeItem("authToken");
  };
