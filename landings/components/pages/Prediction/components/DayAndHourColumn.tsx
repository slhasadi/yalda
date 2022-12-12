import Stack from "../../../commons/Stack";
import Clock from "../../../commons/Icons/Clock";
import moment from "jalali-moment";
import { getDate } from "../../../../helpers/utilities/functions";

const DayAndHourColumn = ({ match }: any) => {
  return (
    <td className="py-4 text-center px-2 hidden lg:table-cell">
      <Stack className="gap-x-2 justify-center">
        <Clock />
        <time>
          <Stack className="gap-x-2">
            <span className="whitespace-nowrap">
              {moment(match.match.start_time, "HH:mm")
                .locale("fa")
                .format("HH:mm")}
            </span>
            <span>{getDate(match.match.date)}</span>
          </Stack>
        </time>
      </Stack>
    </td>
  );
};

export default DayAndHourColumn;
