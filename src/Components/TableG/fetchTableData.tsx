export const fetchTableData = async (url: string, myAxios: any, page: number, pageSize: number, filters: any) => {
    console.log("==============")
    console.log("url: " + url)
    console.log("myAxios: " + myAxios)
    console.log("page: " + page)
    console.log("pageSize: " + pageSize)
    console.log("filters: " + filters)
    console.log("==============")
    const data = {
        page: page,
        pageSize: pageSize,
        filters: filters,
    };
    const res = await myAxios.post(url, data);
    if (res.status !== 200) {
        throw new Error("Error Data Try Again!!!");
    }
    return res.data;
};