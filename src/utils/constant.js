export const isDevelopment = true;

export const baseUrl = isDevelopment? "http://localhost:5001/api" : "http://";

export const loginEndpoint = "/login";

export const connectionEndpoint =  "/connection";

export const virtualMachineEndpoint =  "/virtualMachine";

export const addVirtualMachineEndpoint = `${virtualMachineEndpoint}/addVM`;

export const removeVirtualMachineEndpoint =  `${virtualMachineEndpoint}/removeVM`;