import React from 'react';

class Sudoku extends React.Component {
    constructor(props) {
        super(props);
        this.state = { cells: Array(81).fill('0') };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const cells = this.state.cells.slice()
        cells[event.target.name] = event.target.value;
        this.setState({ cells: cells });
        console.log(cells);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/api/validate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cells: this.state.cells })
        }
        )
            .then(res => res.json())
            .then(r => {
                console.log(r)
                alert(r.message);
            })
    }

    renderBoard() {
        let board = [];
        for (let i = 0; i < 9; i++) {
            board.push(this.renderRow(i));
        }
        return (
            <tbody>
                {board}
            </tbody>
        )
    }

    renderRow(i) {
        i = i * 9
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(<td>{this.renderCell(i + j)}</td>)
        }

        return (
            <tr>
                <div className="board-row">
                    {row}
                </div>
            </tr>
        )
    }

    renderCell(i) {
        return (
            <input name={i} onChange={this.handleChange}></input>
        )
    }

    render() {
        return (
            <form autocomplete="off" onSubmit={this.handleSubmit}>
                <table>
                    <caption>Press Submit to Validate Your Puzzle</caption>

                    {this.renderBoard()}

                </table>
                <br></br>
                <input className="submit" type="submit" value="Submit" />
            </form>
        );
    }
}

export default Sudoku;