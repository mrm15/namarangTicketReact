const removeItemFromFilterArray = ({filterKey, myData, setMyData}) => {
    const newFilterArray = myData?.filters?.filter(row => row.property !== filterKey)
    setMyData({filters: newFilterArray})
    setTimeout(() => {

        console.log(myData.filters)
    }, 100)


}
export default removeItemFromFilterArray