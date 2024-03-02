export const getChatListData = async ({ RequestUrl, id, myAxios }) => {
    try {
        const result = await myAxios.get(RequestUrl + id);
        console.log(result);
        // Process result and return data if needed
        return result.data;
    } catch (error) {
        console.error('An error occurred while fetching chat list data:', error);
        // Return an empty array or handle the error as needed
        return [];
    }
};
