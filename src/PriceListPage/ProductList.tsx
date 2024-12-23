import React from "react";

const ProductListTable = ({ products }) => {
    console.log(products)
    try {
        return (
            <div className="p-4  lg:w-1024 mx-auto ">
                <h2 className="text-lg font-bold mb-4">لیست محصولات  کارخانه حروف سازی نمارنگ </h2>
                <div className="space-y-4">
                    {products?.map((product, index) => (
                        <div
                            key={product.Id}
                            className="bg-white shadow rounded  p-4 border border-gray-200"
                        >
                            <div className="flex justify-between">
                                <h3 className="text-sm font-medium text-gray-700">
                                    {product.Name}
                                </h3>
                                <span className="text-xs font-medium text-gray-500">
                                    #{product.Code}
                                </span>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-gray-600">
                                    واحد : {product.Unit || "N/A"}
                                </p>

                                <p className="text-xs text-gray-600">
                                    قیمت: {product.SellPrice.toLocaleString()} تومان
                                </p>
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-gray-500">
                                    دسته بندی: {product.NodeName || "N/A"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error rendering ProductListTable:", error);
        return <div className="p-4 text-red-500">An error occurred while loading the product list.</div>;
    }
};

export default ProductListTable;
