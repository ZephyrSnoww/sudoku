function Cell(props) {
    let value = props.state;
    let editable = true;
    let validity = "";

    if (value.startsWith("~")) {
        value = value.substring(1);
        editable = false;
    }
    else if (value.startsWith("+")) {
        value = value.substring(1);
        validity = "valid";
    }
    else if (value.startsWith("-")) {
        value = value.substring(1);
        validity = "invalid";
    }

    return (
        <td className="Cell">
            <input type="text" className="cell-input" validity={validity} name={`${props.outerRow}:${props.square}:${props.squareRow}:${props.cellNum}`} onChange={props.onChange} onClick={props.onClick} value={value} readOnly={!editable} />
        </td>
    )
}

export default Cell;
