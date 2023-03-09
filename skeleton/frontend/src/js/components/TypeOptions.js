import {useLocation} from 'react-router-dom'
import { React, useState, useRef } from "react";
import global from '../../Global'
import { useNavigate } from "react-router-dom"
import { Grid, Checkbox, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { textTransform } from '@mui/system';
import { Directions } from '@mui/icons-material';

const TypeButton = styled(Button)(({ theme }) => ({
    // color: theme.palette.getContrastText(purple[500]),
    botderRadius: '20px',
    backgroundColor: buttonBG,
    height: '3em',
    border: 'black'
    // '&:hover': {
    //   backgroundColor: purple[700],
    // },
  }))

// Type of insight selection buttons
function App({selectedType, selectType}) {
    // change button background color and determine which types are selected when clicked on the buttons (no buttons cannot be delected at the same time)
    const handleClick = (e, selection) => {
        e.preventDefault()
        const translation = {}
        translation[DIRECTQUOTES] = 0
        translation[REPHRASED] = 1
        translation[ANY] = 2
        if (selection === DIRECTQUOTES) {
            if (selectedType === translation[ANY])  {
                selectedType = translation[REPHRASED]
                e.target.style.background = 'none'
            } else if (selectedType === translation[REPHRASED]) {
                selectedType = translation[ANY]
                e.target.style.background = buttonBG
            }
            selectType(selectedType)
        }
        if (selection === REPHRASED) {
            if (selectedType === translation[ANY])  {
                selectedType = translation[DIRECTQUOTES]
                e.target.style.background = 'none'
            } else if (selectedType === translation[DIRECTQUOTES]) {
                selectedType = translation[ANY]
                e.target.style.background = buttonBG
            }
            selectType(selectedType)
        }
    }
    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {/* <Button
          variant="outlined"
          style={{margin: 5, fontSize: 'small', textTransform: 'lowercase' }}
          onClick={e => selectType(e, 'any')}
          >Any</Button> */}
        <TypeButton
          variant="outlined"
          style={{margin: 5, fontSize: 'small', textTransform: 'lowercase', background: buttonBG, height: '3em', width: '8em', borderRadius: '10px'}}
          sx={{border: 'black'}}
          onClick={e => handleClick(e, DIRECTQUOTES)}
          >{DIRECTQUOTES}</TypeButton>
        <TypeButton
          variant="outlined"
          style={{margin: 5, fontSize: 'small', textTransform: 'lowercase', background: buttonBG, height: '3em', width: '8em', borderRadius: '10px'}}
          onClick={e => handleClick(e, REPHRASED)}
          >{REPHRASED}</TypeButton>
        {/* <ColorButton variant="contained">Custom CSS</ColorButton> */}

      </div>
    )

}

const DIRECTQUOTES = 'Direct quotes'
const REPHRASED = 'Rephrased'
const ANY = 'any'
const buttonBG = '#deeafc'

export default App