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

export const RamGaugeUrl = `${baseUrl}${machineBase}/RamGauge`;

export const CPUGaugeUrl = `${baseUrl}${machineBase}/CPUGauge`;

// process exporter

export const ProcessExporterBase = '/machine/ProcessExporter'

export const RamUsageProcessesUrl = `${baseUrl}${ProcessExporterBase}/ResidentMemory`;

export const CpuUserProcessesUrl = `${baseUrl}${ProcessExporterBase}/CPUUser`;

export const CpuSystemProcessesUrl = `${baseUrl}${ProcessExporterBase}/CPUSystem`;

export const ReadBytesProcessesUrl = `${baseUrl}${ProcessExporterBase}/ReadBytes`;

export const machineIdHeader = 'machineId';

// forcasts

export const CPUForcastURL = 'GuyIsHomo';

export const RAMForcastURL = 'GuyIsMozez';