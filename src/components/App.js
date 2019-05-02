import React, { Component } from 'react';
import { Container, Grid, Message } from 'semantic-ui-react';
import ChoosePlayer from './ChoosePlayer';
import '../styles/App.css'

class App extends Component {

    state = {
        board: Array(9).fill(null),
        player: 'X',
        winner: null,
        opponent: null
    }


//looping through combinations and checking for match
    checkForWinner = () => {
        const { board } = this.state;
        let ifWin = false;
        const winner = [
            ['0','1','2'],
            ['3','4','5'],
            ['6','7','8'],
            ['0','3','6'],
            ['1','4','7'],
            ['2','5','8'],
            ['0','4','8'],
            ['2','4','6']    
        ];

        winner.forEach((array, index) => {
            array.forEach((value, index) => {
                if(board[array[0]] && board[array[0]] === board[array[1]] && board[array[0]] === board[array[2]]){
                    this.setState({
                        winner: this.state.player
                    })
                    ifWin = true;
                }
            })
        })
        return ifWin;
    };

    
//computer play logic, making sure it marks only empty box
    computerTurn = (newBoard) => {
        let availIndex = []; 
        newBoard.forEach((elem, index, arr)=>{
            if(elem === null){
                availIndex = [...availIndex,index]
            }
        })
        let randomIndex = Math.floor(Math.random() * availIndex.length)
        let randomIndexValue = availIndex[randomIndex]
        newBoard[randomIndexValue] = this.state.player
        this.setState({
            board: newBoard,
            player: this.state.player === 'O' ? 'X' : 'O'
        })
        this.checkForWinner()
    };

//main game logic, where field gets marked on box click
    handleClick = (index) => {
        const { player, board, winner, opponent } = this.state;
        if(opponent === 'person' && !winner) {
            const newBoard = this.state.board;
            if(!board[index] && !winner) {
                newBoard[index] = player;
                this.setState({
                    board: newBoard,
                    player: this.state.player === 'X' ? '0' : 'X'
                }) 
                this.checkForWinner()
            } 
        }
        if(opponent === 'computer' && !winner) {
            const newBoard = this.state.board;
            if(!board[index] && !winner) {
                newBoard[index] = player;
                this.setState({
                    board: newBoard,
                    player: this.state.player === 'O' ? 'X' : 'O'
                }) 
                if(!this.checkForWinner()){
                    setTimeout(() => this.computerTurn(newBoard,player, winner),
                    50) 
                }
            }             
        }
    };

//setting opponent and reseting state
    setOpponent = (opponent) => {
        this.setState({
            opponent: opponent,
            board: Array(9).fill(null),
            player: 'X',
            winner: null
        })
    };

//rendering game field here in order to keep render function clear and readable
    renderBoard = () => {
        const box = this.state.board.map((sqr, index) => {
            return(
                <Grid.Column 
                    key={index}
                    onClick={() => this.handleClick(index)}
                >
                    <div className='box'>{sqr}</div>
                </Grid.Column>
            )
        })
        return box;
    }

//rendering winner message if there is one
    renderWinnerMessage = () => {
        const { winner } = this.state;
        if(winner){
            return (
                <Message color='red'>{winner} is a WINNER</Message>
            )
        }
    }

    render(){
        return(
            <Container>
                <Grid.Row>
                    <Grid columns={3}>
                        <ChoosePlayer setOpponent={(opponent) => this.setOpponent(opponent)}/>
                    </Grid>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid columns={1}>
                        <Grid.Column textAlign='center'>
                            {this.renderWinnerMessage()}
                        </Grid.Column>
                    </Grid>
                </Grid.Row>

                <Grid.Row>
                    <Grid columns={3}>  
                        {this.renderBoard()} 
                    </Grid>
                </Grid.Row>
            </Container>           
        )
    }
}

export default App;