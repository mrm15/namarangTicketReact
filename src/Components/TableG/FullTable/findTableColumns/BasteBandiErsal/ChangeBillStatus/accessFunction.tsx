interface IUserAccessList {
    canSetStatusBillToBasteBandiShode: boolean; // آیا کاربر می‌تواند وضعیت را به "بسته بندی شده" تغییر دهد؟
    canSetStatusBillToTasvieShode: boolean; // آیا کاربر می‌تواند وضعیت را به "تسویه شده" تغییر دهد؟
    canSetStatusBillToTasvieNahode: boolean; // آیا کاربر می‌تواند وضعیت را به "تسویه نشده" تغییر دهد؟
    canSetStatusBillToPeigiriShode: boolean; // آیا کاربر می‌تواند وضعیت را به "پیگیری شده" تغییر دهد؟
    canSetStatusBillToAmadeErsal: boolean; // آیا کاربر می‌تواند وضعیت را به "آماده ارسال" تغییر دهد؟
    canSetStatusBillToErsalShode: boolean; // آیا کاربر می‌تواند وضعیت را به "ارسال شده" تغییر دهد؟
}

/**
 * Determines the user's permissions based on their role and the current status of the bill.
 * @param auth - The authentication object containing user role access information.
 * @param currentStatus - The current status of the bill.
 * @returns An object representing the user's access permissions.
 */
export const accessFunction = (auth, currentStatus) => {
    // Retrieve the list of permissions associated with the user's role.
    const accessListFromAuth = auth?.userInfo?.roleAccessList;

    // Initialize the user's access list with all permissions set to false by default.
    const userAccessList: IUserAccessList = {
        canSetStatusBillToBasteBandiShode: false,
        canSetStatusBillToTasvieShode: false,
        canSetStatusBillToTasvieNahode: false,
        canSetStatusBillToPeigiriShode: false,
        canSetStatusBillToAmadeErsal: false,
        canSetStatusBillToErsalShode: false,
    };

    if(accessListFromAuth.includes("canChangeStatusFromEverythingToEverything")){
        return  {
            canSetStatusBillToBasteBandiShode: true,
            canSetStatusBillToTasvieShode: true,
            canSetStatusBillToTasvieNahode: true,
            canSetStatusBillToPeigiriShode: true,
            canSetStatusBillToAmadeErsal: true,
            canSetStatusBillToErsalShode: true,
        }
    }

    // Check permissions for transitioning from "no status" to "بسته بندی شده".
    if (currentStatus === ""|| currentStatus === "0") { // If the current status is empty
        if (accessListFromAuth.includes("canChangeStatusFromNothingToBasteBandiShode")) {
            userAccessList.canSetStatusBillToBasteBandiShode = true;
        }
    }

    // Check permissions for transitioning from "آماده ارسال" to "ارسال شده".
    if (currentStatus === "5712") { // "5712" represents "آماده ارسال"
        if (accessListFromAuth.includes("canChangeStatusFromAmadeErsalToErsalShode")) {
            userAccessList.canSetStatusBillToErsalShode = true;
        }
    }

    // Check permissions for transitioning from "بسته بندی شده" to other statuses.
    if (currentStatus === "5710" || currentStatus==="5715") { // "5710" represents "بسته بندی شده"
        //5715 hamoon  peigiri shode hast k mesle baste bandi shode raftar mikonim
        if (accessListFromAuth.includes("canChangeStatusFromBasteBandiShodeToTasvieShode")) {
            userAccessList.canSetStatusBillToTasvieShode = true;
        }
        if (accessListFromAuth.includes("canChangeStatusFromBasteBandiShodeToTasvieNaShode")) {
            userAccessList.canSetStatusBillToTasvieNahode = true;
        }
    }

    // Check permissions for transitioning from "تسویه نشده" to "پیگیری شده".
    if (currentStatus === "5714") { // "5714" represents "تسویه نشده"
        if (accessListFromAuth.includes("canChangeStatusFromTasvieNaShodeToPeigiriShode")) {
            userAccessList.canSetStatusBillToPeigiriShode = true;
        }
    }

    // Check permissions for transitioning from "تسویه شده" to "آماده ارسال".
    if (currentStatus === "5711") { // "5711" represents "تسویه شده"
        if (accessListFromAuth.includes("canSetStatusBillToAmadeErsal")) {
            userAccessList.canSetStatusBillToAmadeErsal = true;
        }
    }

    // Return the finalized list of user access permissions.
    return userAccessList;
};

