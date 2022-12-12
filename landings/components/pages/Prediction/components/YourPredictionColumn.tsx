import React from 'react';

const YourPredictionColumn = ({match}: any) => {
    return (
        <td className="py-4 px-2 text-center hidden lg:table-cell font-medium">
            {match.home_goals !== undefined ? match.home_goals : "-"} - {match.away_goals !== undefined ? match.away_goals : "-"}
        </td>
    );
};

export default YourPredictionColumn;