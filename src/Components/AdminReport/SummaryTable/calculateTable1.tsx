const sumItems = ({arrayOfIds = [], arrayOfData = []}) => {

    return arrayOfData.filter(row => arrayOfIds.includes(row.id)).reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    }, 0)

}
export const calculateTable1 = (myObject:[]) => {

    const metrajSakhtKoliRooz = sumItems({arrayOfIds:[8,9,10], arrayOfData:myObject})

    return {

        metrajSakhtKoliRooz: {text: "متراژ ساخت کلی روز ", value: "2000"},
        onluChalenium: {text: "فقط چلنیوم", value: "2000"},
        onlySuedi: {text: "فقط سوئدی", value: "2000"},
        onlyPlastic: {text: "نئون پلاستیک", value: "2000"},
        onlyFlax: {text: "نئون فلکس", value: "2000"},
        onlyEstil: {text: "فقط استیل", value: "2000"},
        onlyAhan: {text: "فقط آهن", value: "2000"},
        jooshFiber: {text: "جوش فایبر", value: "2000"},
        sumFelez: {text: "جمع فلز", value: "2000"},

    }
}

