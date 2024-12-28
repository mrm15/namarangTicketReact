export const billStatusText = {
    "5710": "بسته بندی شده",

    "5711": "تسویه شده",

    "5712": "آماده ارسال",

    "5713": "ارسال شده",

    "5714": "تسویه نشده",

    "5715": "پیگیری شده",
}
export const convertObjectToArrayKeyValue = (billStatusText) => {
    return Object.entries(billStatusText).map(([value, key]) => ({ key, value })).sort((a,b)=> {

        if (+a.value > +b.value ) return 1
        if (+a.value < +b.value ) return -1
        if (+a.value == +b.value ) return 0

    });
};

