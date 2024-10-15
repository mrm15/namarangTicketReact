export const fetchTableData = async (url: string, myAxios: any, page: number, pageSize: number, filters: any) => {
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