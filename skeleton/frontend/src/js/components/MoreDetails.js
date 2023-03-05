import { React, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Card, Button } from "react-bootstrap"
import {IconButton} from '@primer/react'
import "../../App.css"
import global from '../../Global'
import { styled } from '@material-ui/core/styles';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// show details on the right when insight is selected
function App({article}) {
  return (
    <div style={{minWidth: '30vw', maxWidth: '40vw', padding: '2em'}}>
      <div style={{padding: '.5em'}}>
        <p style={{fontWeight: '600', fontSize: '1.5em', margin: 0}}>{article.title}</p>
        <div style={{color: global.colors.blue, marginTop: 5}}>
          <a href={article.url} style={{textDecoration: 'none', border: 'none', background: 'none', fontWeight: 700, fontSize: '.8em', padding: 0, color: global.colors.blue}}>Access to Source</a>
          <OpenInNewIcon style={{marginLeft: '5px', fontSize: 'small'}} />
        </div>
        <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Authors</p>
        <p style={{fontSize: '.8em'}}>{article.authors}</p>
        <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Date of Publication</p>
        <p style={{fontSize: '.8em'}}>{article.date}</p>
        <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Type</p>
        <p style={{fontSize: '.8em'}}>Original quantitative research</p>
        <p style={{color: '#595959', fontSize: '.8em', marginTop: '2em'}}>Citation Unavailable</p>
        <Grid container spacing={1}>
          {article.tags.map(t =>
            <Grid item>
                <div style={{padding: '.8em', background: '#f0f0f0', borderRadius: '6px', fontSize: 'small'}}>{t}</div>        
            </Grid>)}
        </Grid>
        <p style={{fontSize: '1.2em', fontWeight: 500, marginTop: '2em'}}>Abstract</p>
        <p style={{fontSize: '.8em'}}>{global.abstract}</p>
      </div>
      <div>

      </div>
    </div>
  )
}

const DIRECTQUOTES = 'Direct quotes'
const REPHRASED = 'Rephrased'

export default App;