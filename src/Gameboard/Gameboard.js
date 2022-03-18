import React from "react";
import { makepuzzle, solvepuzzle } from "sudoku";
import "./Gameboard.css";
import OuterRow from "./OuterRow";

class Gameboard extends React.Component {
    constructor(props) {
        super(props);

        let boardSize = 3;
        let generationChance = 0.2;
        let boardState = [];
        let allowedCharacters = [""];

        if (boardSize > 5) {
            boardSize = 5;
        }

        let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

        for (let i = 1; i <= (boardSize * boardSize); i++) {
            if (i < 10) {
                allowedCharacters.push(`${i}`);
            }
            else if (i === 10) {
                allowedCharacters.push(`0`);
            }
            else {
                allowedCharacters.push(alphabet[i - 11]);
            }
        }

        for (let i = 0; i < boardSize; i++) {
            let outerRow = [];

            for (let o = 0; o < boardSize; o++) {
                let square = [];

                for (let q = 0; q < boardSize; q++) {
                    let row = [];

                    for (let w = 0; w < boardSize; w++) {
                        if (Math.random() < generationChance) {
                            row.push(`~${allowedCharacters[Math.floor(Math.random() * (allowedCharacters.length - 1)) + 1]}`);
                        }
                        else {
                            row.push("");
                        }
                    }

                    square.push(row);
                }

                outerRow.push(square);
            }

            boardState.push(outerRow);
        }

        this.state = {
            boardSize,
            boardState,
            allowedCharacters,
            selectedCell: [0, 0, 0, 0]
        };
    }

    handleKeyPress(event) {
        let selectedCell = this.state.selectedCell;
        let switches = [0, this.state.boardSize - 1];

        if (event.key === "ArrowUp") {
            if (selectedCell[2] !== 0) {
                selectedCell[2] -= 1;
            }
            else {
                if (selectedCell[0] === 0) {
                    selectedCell[2] = switches[1];
                    selectedCell[0] = switches[1];
                }
                else {
                    selectedCell[2] = switches[1];
                    selectedCell[0] -= 1;
                }
            }
        }
        if (event.key === "ArrowDown") {
            if (selectedCell[2] !== switches[1]) {
                selectedCell[2] += 1;
            }
            else {
                if (selectedCell[0] === switches[1]) {
                    selectedCell[2] = 0;
                    selectedCell[0] = 0;
                }
                else {
                    selectedCell[2] = 0;
                    selectedCell[0] += 1;
                }
            }
        }

        if (event.key === "ArrowLeft") {
            if (selectedCell[3] !== 0) {
                selectedCell[3] -= 1;
            }
            else {
                if (selectedCell[1] === 0) {
                    selectedCell[1] = switches[1];
                    selectedCell[3] = switches[1];
                }
                else {
                    selectedCell[3] = switches[1];
                    selectedCell[1] -= 1;
                }
            }
        }
        if (event.key === "ArrowRight") {
            if (selectedCell[3] !== switches[1]) {
                selectedCell[3] += 1;
            }
            else {
                if (selectedCell[1] === switches[1]) {
                    selectedCell[1] = 0;
                    selectedCell[3] = 0;
                }
                else {
                    selectedCell[3] = 0;
                    selectedCell[1] += 1;
                }
            }
        }

        let input = document.querySelector(`input[name="${this.state.selectedCell.join(":")}"]`);
        input.focus();
        // input.select();

        this.setState({
            selectedCell
        });
    }
    
    componentDidMount() {
        let input = document.querySelector(`input[name="${this.state.selectedCell.join(":")}"]`);
        input.focus();
        input.select();

        document.addEventListener("keydown", (e) => this.handleKeyPress(e), false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", (e) => this.handleKeyPress(e), false);
    }

    onChange(e) {
        let value = e.target.value;
        let coords = e.target.name.split(":");
        let position = {
            outerRow: coords[0],
            square: coords[1],
            row: coords[2],
            cell: coords[3]
        };
        
        if (value.length > 1) {
            value = value.split("")[1];
        }
        
        if (!this.state.allowedCharacters.includes(value)) {
            return;
        }
        
        let boardState = this.state.boardState;

        boardState[position.outerRow][position.square][position.row][position.cell] = value;

        this.setState({
            boardState
        });
    }

    onCellClick(e) {
        let coords = e.target.name.split(":");

        for (let i = 0; i < coords.length; i++) {
            coords[i] = Number(coords[i]);
        }

        this.setState({
            selectedCell: coords
        });
    }

    handleSizeChange(e) {
        this.regenerate(Number(e.target.value));
    }

    handleGenChange(e) {
        this.setState({
            generationChance: Number(e.target.value)
        }, () => {
            this.regenerate(this.state.boardSize);
        });
    }

    regenerate(size) {
        let boardSize = size;
        let boardState = [];
        let allowedCharacters = [""];

        let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

        for (let i = 1; i <= (boardSize * boardSize); i++) {
            if (i < 10) {
                allowedCharacters.push(`${i}`);
            }
            else if (i === 10) {
                allowedCharacters.push(`0`);
            }
            else {
                allowedCharacters.push(alphabet[i - 11]);
            }
        }

        for (let i = 0; i < boardSize; i++) {
            let outerRow = [];

            for (let o = 0; o < boardSize; o++) {
                let square = [];

                for (let q = 0; q < boardSize; q++) {
                    let row = [];

                    for (let w = 0; w < boardSize; w++) {
                        if (Math.random() < this.state.generationChance) {
                            row.push(`~${allowedCharacters[Math.floor(Math.random() * (allowedCharacters.length - 1)) + 1]}`);
                        }
                        else {
                            row.push("");
                        }
                    }

                    square.push(row);
                }

                outerRow.push(square);
            }

            boardState.push(outerRow);
        }

        this.setState({
            boardSize,
            boardState
        });
    }

    render() {
        let rows = [];

        for (let i = 0; i < this.state.boardSize; i++) {
            rows.push(
                <OuterRow key={i} onChange={(e) => this.onChange(e)} onCellClick={(e) => this.onCellClick(e)} size={this.state.boardSize} state={this.state.boardState[i]} outerRow={i} />
            );
        }

        return (
            <div className="Gameboard">
                <div className="size-input-container">
                    <input type="range" name="sizeChange" className="size-change" min="1" max="5" step="1" onChange={(e) => this.handleSizeChange(e)} value={this.boardSize} />
                    <input type="range" name="genChange" className="gen-change" min="0" max="1" step="0.01" onChange={(e) => this.handleGenChange(e)} value={this.generationChance} />
                    <input type="button" value="Regenerate" onClick={(e) => this.regenerate(this.state.boardSize)} />
                </div>
                <table className="board">
                    { rows }
                </table>
            </div>
        );
    }
}

export default Gameboard;
