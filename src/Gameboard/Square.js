import SquareRow from "./SquareRow";

function Square(props) {
    let rows = [];

    for (let i = 0; i < props.size; i++) {
        rows.push(
            <SquareRow key={i} onChange={props.onChange} onClick={props.onClick} size={props.size} state={props.state[i]} outerRow={props.outerRow} square={props.square} squareRow={i} />
        );
    }

    return (
        <td className="Square">
            { rows }
        </td>
    )
}

export default Square;
