import React, { Component } from 'react';
import { Radio, Button, Segment } from 'semantic-ui-react';
import '../styles/ChoosePlayer.css';

class ChoosePlayer extends Component {

    state = {
        opponent: 'computer',
    }

//setting opponent choice
    handleChange = (e, {value}) =>{
        this.setState({
            opponent: value,
        })
    };

//sending opponent choice to App.js and starting a game
    handleStart = () => {
        this.props.setOpponent(this.state.opponent);
    };

 //function which return opponent choice options(radio buttons), in order to keep render method clean   
    displayPlayerOptions = () => {
        return(
            <Segment>           
                <Radio 
                    label='Play with person'
                    name='checkedPerson'
                    value='person'
                    checked={this.state.opponent === 'computer' ? false : true}
                    onChange={(e, data) => this.handleChange(e, data)}
                /> 
                <Radio
                    label='Play with computer'
                    name='checkedComputer'
                    value='computer'
                    checked={this.state.opponent === 'person' ? false : true}
                    onChange={(e, data) => this.handleChange(e, data)}
                />
                <Button onClick={() => this.handleStart()} primary>Start</Button>         
            </Segment>
        )      
    };
   

    render(){
        return(
            <>
                {this.displayPlayerOptions()}
            </>
        )
    }
}

export default ChoosePlayer;