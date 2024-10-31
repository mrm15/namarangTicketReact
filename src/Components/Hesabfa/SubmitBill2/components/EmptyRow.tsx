import React from 'react';
import ShowProductListForSelect from "./ShowProductListForSelect.tsx";

const EmptyRow = () => {
    return (
        <>
            {/*<tr>*/}
            {/*    {[0, 0, 0, 0, 0, 0, 0, 0].map((r, index) => <td key={index}></td>)}*/}
            {/*</tr>*/}
            <tr>
                <td>
                    <div></div>
                </td>
                <td>
                    <section style={{
                        // minWidth:"450px",
                        maxWidth:"450px",
                        // width:"450px",
                        // background:"red",
                    }}>
                        <ShowProductListForSelect/>
                    </section>
                </td>
                {[0, 0, 0, 0, 0, 0].map((r, index) => <td key={index}></td>)}
            </tr>
            {/*<tr>*/}
            {/*    {[0, 0, 0, 0, 0, 0, 0, 0].map((r, index) => <td key={index}></td>)}*/}
            {/*</tr>*/}

        </>
    );
};

export default EmptyRow;
