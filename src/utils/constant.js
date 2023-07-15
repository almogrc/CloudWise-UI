export const isDevelopment = true;

export const baseUrl = isDevelopment? "http://localhost:5001/api" : "http://";

export const loginEndpoint = `/Connection/login`;

export const connectionEndpoint =  "/Connection";

export const virtualMachineEndpoint =  "/VirtualMachine";

export const addVirtualMachineEndpoint = `/VirtualMachine/addVM`;

export const removeVirtualMachineEndpoint =  `/VirtualMachine/removeVM`;