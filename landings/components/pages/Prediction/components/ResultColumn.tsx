import React from 'react';

const ResultColumn = ({match}: any) => {
    return (
        <td className="py-4 px-2 hidden lg:table-cell font-medium text-center">
            {(match.match.home_goals !== undefined) ? match.match.home_goals : "-"} - {match.match.away_goals !== undefined ? match.match.away_goals : "-"}
        </td>
    );
};

export default ResultColumn;