import { useDispatch, useSelector } from "react-redux";
import { Groups_SET_ACTIVE_ROUND_ITEM } from "slices/groupsSlice";
import { RootState } from "store";

const chartMenu = ["یک هشتم", "یک چهارم", "نیمه نهایی", "رده بندی", "فینال"];

const PlayoffsChartMenu = () => {
  const activeIndex = useSelector(
    (state: RootState) => state.groups.activeRoundItem
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-gray-200 hidden lg:block">
        <ul className="flex py-8 w-[900px] mx-auto">
          <li className="text-center font-bold">یک هشتم</li>
          <li className="text-center font-bold mr-[200px]">یک چهارم</li>
          <li className="text-center font-bold mr-[160px]">نیمه نهایی</li>
          <li className="text-center font-bold mr-[90px]">رده بندی</li>
          <li className="text-center font-bold mr-[100px]">فینال</li>
        </ul>
      </div>
      <div className="bg-gray-200 lg:hidden">
        <ul className="flex justify-around px-3 py-6 mx-auto text-sm">
          {chartMenu.map((item, index) => (
            <li
              className={`text-center font-bold ${
                activeIndex === index ? "text-red-500" : "text-black"
              }`}
              key={index}
              onClick={() => dispatch(Groups_SET_ACTIVE_ROUND_ITEM(index))}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PlayoffsChartMenu;
