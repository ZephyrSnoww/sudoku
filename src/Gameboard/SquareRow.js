import Cell from "./Cell";

function SquareRow(props) {
    let cells = [];

    for (let i = 0; i < props.size; i++) {
        cells.push(
            <Cell key={i} onChange={props.onChange} onClick={props.onClick} outerRow={props.outerRow} state={props.state[i]} square={props.square} squareRow={props.squareRow} cellNum={i} />
        );
    }

    return (
        <tr className="SquareRow">
            { cells }
        </tr>
    )
}

export default SquareRow;
