import { React, useState, useRef, createRef } from "react";
import { Card } from "react-bootstrap"
import "../../App.css";
import global from '../../Global'
import CircleIcon from '@mui/icons-material/Circle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// an individual insight on search results page
function App({insight}) {
  const quote = insight.includes(`"`) || insight.includes(`“`) ? 'Direct quotes' : 'Rephrase'
  const circleColor = quote === 'Rephrase' ? '#84CC82' : '#FFAC1C'

  return (
    <div>
      <Card style={{ background: 'white', padding: '1.5em', margin: '1em', borderRadius: '20px', font: 'Inter', width: '50vw'}}>
      <Card.Body>
          <Card.Title style={{fontWeight: 450, marginBottom: '1em'}}>{insight}</Card.Title>
          <Card.Text style={{marginBottom: 0, color: '#595959', fontSize: '.8em', whiteSpace: 'pre-line' }}>
          <CircleIcon style={{paddingRight: '5px', color: circleColor, fontSize: 'small'}} />
          {quote} | from p.5 of the source
          </Card.Text>
      </Card.Body>
      </Card>
    </div>
  )
}

export default App;