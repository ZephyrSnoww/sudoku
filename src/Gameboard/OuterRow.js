import Square from "./Square";

function OuterRow(props) {
    let squares = [];

    for (let i = 0; i < props.size; i++) {
        squares.push(
            <Square key={i} onChange={props.onChange} onClick={props.onCellClick} size={props.size} state={props.state[i]} outerRow={props.outerRow} square={i} />
        );
    }

    return (
        <tr className="OuterRow">
            { squares }
        </tr>
    );
}

export default OuterRow;
