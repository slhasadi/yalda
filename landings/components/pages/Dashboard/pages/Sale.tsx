import React from "react";
import ContentSideLayout from "../commons/ContentSideLayout";
const Sale = ({items}:any) => {
  return (
    <ContentSideLayout title="لیست سفارشات جدید">
      {(items?.packages.length as any) > 0 ? 
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              className="inline-block min-w-full w-full shadow-md rounded-lg overflow-hidden"
            >
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="w-[30px] border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider p-[0px]"
                    >
                      خرید
                    </th>
                    <th
                      className="border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[0px]"
                    >
                      مبلغ
                    </th>
                    <th
                      className="border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-[0px]"
                    >
                      از تاریخ
                    </th>
                    <th
                      className="border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider p-[0px]"
                    >
                      تا تاریخ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.packages.map((item:any, index:number)=>{
                    return(
                      <tr key={index}>
                        <td className="px-5 py-5 bg-white text-sm text-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap font-semibold">
                              {item.sku.title}
                              </p>
                            </div>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm text-center">
                          <p className="text-gray-600 whitespace-no-wrap">{item.price}</p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm text-center">
                          <p className="text-gray-900 whitespace-no-wrap">{item.done_at.date}</p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm text-center">
                          <span
                            className="relative inline-block px-3 py-1 leading-tight"
                          >
                            <span className="relative">یک هفته</span>
                          </span>
                        </td>
                      </tr>
                      
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      : <p className="text-center">هنوز هیچ بسته ای خریداری نکرده اید</p>}
    </ContentSideLayout>
  )
};

export default Sale;
