const makeNewObjectBasedOnOrders = (dataArray: any[]) => {
    const contactListFromOrders = [];
    dataArray.forEach(row => {
        const findIt = contactListFromOrders.find(contactData => contactData.Id === row.Contact.Id)
        if (findIt) {
            findIt.numberOfOrders++
        } else {
            contactListFromOrders.push({...row.Contact, numberOfOrders: 1})
        }
    })


    console.table(contactListFromOrders)
    const sortedArray = contactListFromOrders.sort((a, b) => {
        if (a.numberOfOrders < b.numberOfOrders) {
            return -1;
        } else if (a.numberOfOrders > b.numberOfOrders) {
            return 1;
        }
        return 0;

    })
    return sortedArray.reverse()
}
export default makeNewObjectBasedOnOrders