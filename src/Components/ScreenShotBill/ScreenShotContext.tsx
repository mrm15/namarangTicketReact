import createDynamicContext from "../DynamicContext/DynamicContext";


interface IScreenshotBill {
    billData: any;
    dateOnScreenShot: string,
    description: string;
    fileNumber: string,
    fileName: string,
    fileNameUnique: string,
    fileNumberText: string,
    tableColumnArray: any[],
    orderNumber: string,
}

export const {
    Provider: ScreenshotProvider,
    useDynamicContext: useScreenshotContext
} = createDynamicContext<IScreenshotBill>();
