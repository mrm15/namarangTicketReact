
const ShowTableData = ({data}) => {
    try {
        return (
            <div>
                {JSON.stringify(data.data)}
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ShowTableData;
