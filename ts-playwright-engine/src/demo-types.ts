interface DevicePayload{
    name:string;
    year: number;
    price: number;
    cpuModel?:string;
    }

//2. Define an Async function handling promises
async function processDeviceData(device:DevicePayload):Promise<String>{
    console.log(`[Processing]:${device.name} (${device.year})`);
    await new Promise((resolve)=>setTimeout(resolve,1000));
    if(!device.price || device.price<=0){
        throw new Error("Invalid price point provided for device.");
        }
    return `SUCCESS: ${device.name} verified at $${device.price}`
}

//3. Execution Driver
async function runExecution(){
    const newPhone: DevicePayload={
        name:"Google Pixel 10 Pro0",
        year:2026,
        price: 999.9,
        cpuModel: "Tensor G6"
        };
    try{
        const status = await processDeviceData(newPhone);
        console.log(status);
        }catch(error){
            console.error("Execution failed:",error);
            }
    }

runExecution();