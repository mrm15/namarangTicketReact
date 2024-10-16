const removeItemFromFilterArray = ({property, myData, setMyData}) => {
    const newFilterArray = myData?.filters?.filter(row => row.property !== property)
    setMyData({filters: newFilterArray})
    setTimeout(() => {

        console.log(myData.filters)
    }, 100)


}
export default removeItemFromFilterArray