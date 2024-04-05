import React from 'react'

export default function QueryResultsTable({ queryResults, selectedColumns }) {
    if (!queryResults) {
        return <div>no results</div>
    }
    console.log("SELECTED COLUMNS: " + selectedColumns);

    const isTuple = queryResults.data.length > 0 && Array.isArray(queryResults.data[0]);
    console.log("QUERY RESULTS: " + queryResults);

    return (
        <table className="table">
            <thead>
            <tr>
                {selectedColumns.map((columnName, index) => (
                    <th key={index}>{columnName}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {queryResults.data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {isTuple ? (
                        row.map((value, valueIndex) => <td key={valueIndex}>{value}</td>)
                    ) : (
                        <td>{row}</td>
                    )}
                </tr>
            ))}
            </tbody>
        </table>
    );
}
