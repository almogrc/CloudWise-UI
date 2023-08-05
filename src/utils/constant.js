export const isDevelopment = true;

export const baseUrl = isDevelopment? "http://localhost:5001/api" : "http://";

export const loginEndpoint = `/Connection/login`;

export const connectionEndpoint =  "/Connection";

export const virtualMachineEndpoint =  "/VirtualMachine";

export const addVirtualMachineEndpoint = `/VirtualMachine/addVM`;

export const removeVirtualMachineEndpoint =  `/VirtualMachine/removeVM`;

export const getAllVMs = '/VirtualMachine/GetAllVMs';

export const machineBase = '/machine/NodeExporter'

// node exporter
export const RamUsageUrl = `${baseUrl}${machineBase}/RamUsage`;

export const CPUUsageUrl = `${baseUrl}${machineBase}/CPUUsage`;

export const NetworkUrl = `${baseUrl}${machineBase}/Network`;

export const machineIdHeader = 'machineId';