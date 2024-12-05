const colData = [//

    {//
        id: 1,
        unit: "عدد",
        title: "نور", //
        array: [//
            {title: "SMD سفید", code: "000047"},
            {title: "SMD آفتابی", code: "000048"},
            {title: "SMD قرمز", code: "000049"},
            {title: "SMD انبه ای", code: "000050"},
            {title: "اینجکشن سفید با سیم کشی و منگنه", code: "000051"},
            {title: "SMD اینجکشن سفید", code: "000052"},
            {title: "SMD اینجکشن آفتابی", code: "000053"},
            {title: "SMD سفید تک نقطه", code: "000058"},
            {title: "SMD سفید دو نقطه", code: "000059"},
            {title: "SMD آفتابی تک نقطه", code: "000060"},
            {title: "SMD آفتابی دو نقطه", code: "000061"},
            {title: "SMD قرمز تک نقطه", code: "000062"},
            {title: "SMD قرمز دو نقطه", code: "000063"},
            {title: "SMD انبه ای تک نقطه", code: "000064"},
            {title: "SMD انبه ای دو نقطه", code: "000065"},
            {title: "SMD سفید با سیم کشی و منگنه", code: "000139"},
            {title: "SMD آفتابی با سیم کشی و منگنه", code: "000140"},
            {title: "SMD انبه ای با سیم کشی و منگنه", code: "000141"},
            {title: "SMD قرمز با سیم کشی و منگنه", code: "000142"},
            {title: "اینجکشن آفتابی با سیم کشی و منگنه", code: "000143"},
            {title: "اینجکشن انبه ای با سیم کشی و منگنه", code: "000369"},
            {title: "اینجکشن قرمز", code: "000401"},
            {title: "SMD اینجکشن انبه ای", code: "000581"},
            {title: "اینجکشن قرمز با سیم کشی و منگنه", code: "000585"},
            {title: "SMD اینجکشن لنزدار سفید(سامسونگ)", code: "000611"},
            {title: "SMD اینجکشن لنزدار سفید(سامسونگ)با سیم کشی و منگنه", code: "000612"},


        ]//
    },//

    {//
        id: 2,
        title: "ترانس", //
        unit: "عدد",
        array: [//
            {title: "ترانس 200وات", code: "000054"},//
            {title: "ترانس 300وات", code: "000055"},//
            {title: "ترانس 400وات", code: "000056"},//
            {title: "ترانس 10 آمپر", code: "000436"},//
            {title: "ترانس نئون فلکس ( 5 آمپر )", code: "000497"},//
            {title: "ترانس نئون فلکس ( 10 آمپر )", code: "000498"},//
            {title: "ترانس نئون فلکس ( 16 آمپر )", code: "000499"},//
            {title: "ترانس نئون فلکس ( 25 آمپر )", code: "000500"},//
            {title: "ترانس نئون فلکس ( 33 آمپر ) ", code: "000501"},//
            {title: "ترانس 30 آمپر نئون", code: "000509"},//
            {title: "ترانس 20 آمپر نئون", code: ""},//
            {title: "", code: "000510"},//

        ]//
    },//
    {//
        id: 3, title: "پلی اورتان", //
        unit: "متر",
        array: [//
            {title: "چسب استیل و آهن", code: "000622"},//
            {title: "چسب رینگی و وکیوم", code: "000126"},//
        ]//
    },//
    {//
        id: 4, title: "جوش فایبر", //
        unit: "متر",
        array: [//
            {title: "دارد", code: "000381"},//
        ]//
    },//
    {//
        id: 5, title: "پایه", //
        unit: "متر",

        array: [//
            {title: "مفتول", code: "000231"},//
            {title: "پیچ", code: "000232"},//
            {title: "مفتول ال", code: "000629"},//
        ]//
    },//
    {//
        id: 6, title: "فلاشر", //
        unit: "عدد",

        array: [//
            {title: "2 کانال", code: "000530"},//
            {title: "3 کانال", code: "000531"},//
            {title: "4 کانال", code: "000532"},//
            {title: "6 کانال", code: "000533"},//
            {title: "8 کانال", code: "000624"},//
        ]//
    },//
    {//
        id: 7, title: "اسپیسر", //
        unit: "عدد",
        array: [//
            {title: "اسپیسر 3", code: "000545"},//
            {title: "اسپیسر 5", code: "000502"},//
            {title: "اسپیسر 7", code: "000503"},//
        ]//
    },//
]


const foundNewItemsBasedOnColData = (invoiceItems, colData) => {
    const newItems = []
    colData.forEach(category => {
        const unitText = category.unit
        let tempText = ""
        ///////////////////////////////////////////////////
        category.array.forEach(item => {


            const foundItem = invoiceItems.find(invoiceItem => {
                if (category.title === "ترانس") {
                    //
                }
                return invoiceItem.Item.Code === item.code
            })

            if (foundItem) {
                const newText = item.title + "_" + foundItem.Quantity + "_" + unitText
                tempText = tempText + "\n" + newText
            }
        })
        ///////////////////////////////////////////////////
        if (tempText !== "") {
            newItems.push({
                id: category.id, title: category.title, value: tempText
            });
        }
    })

    console.log(newItems)
    return newItems;

};


export const findNewItemArray = (row) => {


    const newItems = foundNewItemsBasedOnColData(row.InvoiceItems, colData)

    return newItems.sort((a, b) => a.id - b.id)
}
export const getTomorrowDate = () => {
    const currentTimeStamp = new Date().valueOf() //timeStampInMiliseconds
    const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const newTimestamp = currentTimeStamp + twentyFourHoursInMilliseconds;
    return new Date(newTimestamp).toLocaleDateString('fa-IR', {year: 'numeric', month: '2-digit', day: '2-digit'})
}