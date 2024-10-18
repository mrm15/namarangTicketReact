const removeItemFromFilterArray = ({property, myData, setMyData}) => {
    // چ.م اینجا خودم در نظر گرفتم که یه عدد 1 -2 اضافه میکنم به مقدار Date پیس شامل Date باشه باید پاک بشه

    setTimeout(() => {
        const newFilterArray = myData?.filters?.filter(row => row.property.includes(property))

        setMyData({filters: newFilterArray})

        setTimeout(() => console.log("ttt" ,  myData.filters), 5000)
    }, 100)


}
export default removeItemFromFilterArray