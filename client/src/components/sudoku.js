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

    renderRow(i) {
        i = i * 9
        return (
            <tr>
                <div className="board-row">
                    <td>{this.renderCell(i+0)}</td>
                    <td>{this.renderCell(i+1)}</td>
                    <td>{this.renderCell(i+2)}</td>
                    <td>{this.renderCell(i+3)}</td>
                    <td>{this.renderCell(i+4)}</td>
                    <td>{this.renderCell(i+5)}</td>
                    <td>{this.renderCell(i+6)}</td>
                    <td>{this.renderCell(i+7)}</td>
                    <td>{this.renderCell(i+8)}</td>
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
                    {this.renderRow(0)}
                    {this.renderRow(1)}
                    {this.renderRow(2)}
                    {this.renderRow(3)}
                    {this.renderRow(4)}
                    {this.renderRow(5)}
                    {this.renderRow(6)}
                    {this.renderRow(7)}
                    {this.renderRow(8)}
                </table>
                <br></br>
                <input className="submit" type="submit" value="Submit" />
            </form>
        );
    }
}

export default Sudoku;