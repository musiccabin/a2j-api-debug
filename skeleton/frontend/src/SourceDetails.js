import {useLocation} from 'react-router-dom'
import { React, useState, useRef } from "react";
import logo from './logo.png';
import './App.css';
import Card from './js/components/Card'
import Details from './js/components/Details'
import Slider from './js/components/Slider'
import TypeOptions from './js/components/TypeOptions'
import Tags from './js/components/Tags'
import MoreDetails from './js/components/MoreDetails'
import SourceCard from './js/components/SourceCard'
import Header from './js/components/Header'
import global from './Global'
import SearchBarSmall from './js/components/SearchBarSmall'
import { useNavigate } from "react-router-dom"
import { Grid, Button } from '@mui/material'
import { Checkbox } from '@material-ui/core'
import { textTransform } from '@mui/system';
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { styled } from '@material-ui/core/styles';

const SearchBox = styled(TextField)(() => ({
  '& fieldset': {
    // borderRadius: '50px',
    // height: '4vh',
    width: '20vw',
    marginRight: '1em',
    fontSize: '.2em',
    background: global.colors.grey,
    border: 'none',
  },
}));

// source details page
function App() {
  const location = useLocation()
  const article = location.state.article

  const initIds = []
  for (let i = 0; i < article.insights.length; i++) initIds.push(i)
  const [results, setResults] = useState(initIds)

  const searchInsights = (e) => {
    e.preventDefault()
    const indexes = []
    article.insights.forEach(i => {
      if (i.includes(e.target.value.toLowerCase())) indexes.push(article.insights.indexOf(i))
    })
    setResults(indexes)
  }

  console.log('index', results)
  
  return (
    <div>
      <Header tags={location?.state?.tags}/>
      <div style={{background: 'white', display: 'flex', flexDirection: 'row'}}>
      <MoreDetails article={article}/>
      <div style={{borderLeft: `1px solid ${global.colors.grey}`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 2.5em', marginTop: '2em'}}>
          <p style={{fontWeight: '550', fontSize: '1.2em', marginTop: '.5em', marginBottom: '1em'}}>All insights from the source</p>
          <SearchBox
            // id="outlined-basic"
            variant="outlined"
            size="small"
            // fullWidth
            label="Search this source..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') searchInsights(e)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                sx={{padding: 0, margin: 0, backgroundColor: global.colors.grey, fontSize: '.2em', position: 'absolute'}}
                onChange={e => searchInsights(e)}
                input={{fontSize: '.2em'}}
                >
                  {/* <IconButton onClick={() => navigate("/results", {state:{phrase:phrase, tags: tags, from: 'Search'}})}> */}
                    {/* <SearchIcon /> */}
                  {/* </IconButton> */}
                </InputAdornment>
              )
            }}
            />
          </div>
        <Grid container>
          {article.insights.map((insight) => 
          results.includes(article.insights.indexOf(insight)) && <SourceCard
            key={insight.id}
            insight={insight}
          />
        )}
        </Grid>
      </div>
    </div>
    </div>
  )
}

const DIRECTQUOTES = 'Direct quotes'
const REPHRASED = 'Rephrased'
const ANY = 'any'

export default App;
