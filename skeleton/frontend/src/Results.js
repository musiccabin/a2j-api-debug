import {useLocation} from 'react-router-dom'
import { React, useState, useRef } from "react";
// import logo from './logo.png';
import './App.css';
import Card from './js/components/Card'
import Details from './js/components/Details'
import Slider from './js/components/Slider'
import TypeOptions from './js/components/TypeOptions'
import Tags from './js/components/Tags'
import Header from './js/components/Header'
import global from './Global'
// import SearchBarSmall from './js/components/SearchBarSmall'
// import { useNavigate } from "react-router-dom"
import { Grid, Button } from '@mui/material'
// import { Checkbox } from '@material-ui/core'
// import { textTransform } from '@mui/system';
import axios from "axios";

// insight search results page
function App() {
  const location = useLocation()
  // user got here by entering keywords in Search Bar
  const fromSearch = location?.state?.from === 'Search'
  // an insight Details pane on the right was just closed
  const fromDetails = location?.state?.from === 'Details'
  // user just selected /deselected tags
  const fromTags = location?.state?.from === 'Tags'
  // const [refresh, refreshPage] = useState(false)
  // if (fromTags && !refresh) refreshPage(!refresh)

  const [close, closeDetails] = useState(false)

  // see whether user has clicked on any insight
  const [clicked, setClick] = useState(null)
  // if (fromDetails && clicked !== location?.state?.clicked) setClick(location?.state?.clicked)
  const toggleDetails = (id) => {
    setClick(id)
    console.log('click:', clicked, 'can find?', results.find(r => r.id === clicked))
    // if (fromDetails) location.state.from = ''
    // closeDetails(false)
  }

  // // store search or filtered results for display (except for tags)
  // let results = []
  // if (fromSearch) {
  //   global.articles.forEach(a => a.insights.forEach(i => {
  //     if (i.includes(location.state.phrase)) {
  //       const index = a.insights.indexOf(i)
  //       results.push({
  //           id: `${a.id}-${index}`,
  //           text: i,
  //           aid: a.id,
  //           year: parseInt(a.date.slice(-4))
  //         })
  //     }
  //   }))
  // } else if (fromDetails) results = location.state.results
  // else results = location?.state?.filtered || location.state.list || location?.state?.results || location?.state?.allResults
 
  // // filter results with tags
  // let allResults = results
  // if (location.state?.tags?.length > 0) {
  //   // allResults = location.state.allResults
  //   const matchingArticles = []
  //   location.state.tags.forEach(t => {
  //     global.articles.forEach(a => {
  //       if (a.tags.includes(t)) matchingArticles.push(a.id) 
  //     })
  //     results = allResults.filter(r => matchingArticles.includes(r.aid))
  //     if (fromSearch && !refresh) {
  //       refreshPage(true)
  //     }
  //   })   
  // }

  // // select insights to display based on user-selected types
  // // close insight details on the right if new type is selected
  // const quotedInsights = []
  // const rephrasedInsights = []
  // results.forEach(r => {
  //   r.text.includes(`"`) || r.text.includes(`“`) ? quotedInsights.push(r.id) : rephrasedInsights.push(r.id)
  // })
  // const [ids, setIds] = useState(quotedInsights + rephrasedInsights)
  // if (results.map(r => r.id).includes(clicked) && close && ids.includes(clicked)) closeDetails(false)
  const [type, setType] = useState(2)
  const selectType = (newType) => {
    // if (newType === DIRECTQUOTES) {
    //   setIds(quotedInsights)
    //   if (type === ANY && !quotedInsights.includes(clicked)) closeDetails(true)
    //   setType(newType)
    // }
    // if (newType === REPHRASED) {
    //   setIds(rephrasedInsights)
    //   if (type === ANY && !rephrasedInsights.includes(clicked)) closeDetails(true)
    //   setType(newType)
    // }
    // if (newType === ANY) {
    //   setIds(quotedInsights + rephrasedInsights)
    //   setType(newType)
    // }
    setType(newType)
  }

  // get all tags
  let tags = []
  global.articles.forEach(a => a.tags.forEach(t => tags.push(t)))
  tags = [...new Set(tags)]

  const [phrase, setPhrase] = useState(location?.state?.phrase)
  if (fromSearch && phrase !== location?.state?.phrase) setPhrase(location?.state?.phrase)
  const [startYear, setStartYear] = useState(1950)
  const [endYear, setEndYear] = useState(2030)
  const changeYearRange = (start, end) => {
    if (start !== startYear) setStartYear(start)
    if (end !== endYear) setEndYear(end)
  }

    const [results, setResults] = useState([])
    axios
      .post(`/results/${phrase}-${startYear}-${endYear}-${type}/`, `tags: ${location?.state?.tags}`
      )
      .then((res) => {
        let refresh = false
        for (let i = 0; i < res.data.length; i++) {
          if (results.length === 0) refresh = true
          else if (results[i] && results[i]['id'] !== res.data[i].id) {
            refresh = true
            break
          } else refresh = false
        }
        console.log('fresh', refresh)
        if (refresh) {
          setResults(res.data)
        }
      })
      .catch((err) => console.log(err))
    
    const numResults = results.length

    console.log('numRe', numResults, 'results', results)
  
  return (
    <div style={{background: 'white'}}>
      <Header
        phrase={phrase}
        tags={location?.state?.tags}
        yearStart={startYear}
        yearEnd={endYear}
        paraphrased={type}
        />
      {!(numResults === 0 && fromSearch) && <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
        <Grid
          item spacing={3}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          margin={5}
          minWidth={'15vw'}
          position={'sticky'}
          top={10}
        >
          <h4 style={{padding: '.5em',}}>Type of insight</h4>
          <TypeOptions selectedType={type} selectType={selectType} />
          <h4 style={{marginTop: '3em'}}>Year of publication</h4>
          <Slider changeYearRange={changeYearRange}/>
          <Tags tags={tags}/>
        </Grid>
        {numResults > 0 && <div style={{padding: '10px', backgroundColor: global.colors.grey, height: '100vh', overflow: 'scroll'}}>
          <p style={{marginLeft: 25, color: '#595959', fontSize: '.8em'}}>About {numResults} insights</p>
          <Grid container>
            {results.map((insight) => 
            <Card
              key={insight.id}
              id={insight.id}
              insight={insight.text}
              aid={insight.article}
              title={insight.title}
              year={insight.year}
              url={insight.url}
              authors={insight.authors}
              clicked={clicked === insight.id}
              // typeSelected={ids.includes(insight.id)}
              toggleDetails={toggleDetails}
            />
          )}
          </Grid>
        </div>}
        {results.find(r => r.id === clicked) && !close && <Details insight={results.find(r => r.id === clicked)} toggleDetails={toggleDetails} type={type} />}
        {numResults === 0 && <p style={{margin: '5em'}}>No results matching your search criteria...</p>}
      </div>}
      {fromSearch && numResults === 0 && <div style={{padding: '5em', backgroundColor: global.colors.grey, height: '100vh'}}>
            <p>Sorry, no results. Please try searching with a different keyword.</p>
            </div>}
    </div>
  //   <div>
  //     <i class="star outline icon big" id="favourites"></i>
  //     <GoogleAuth />
  //     <div>
  //   {this.state.isEmptyState && <Cards openAlert={this.triggerOpenAlertState} />}

  //   <ModalExample card={this.state.card} isOpen={this.state.isOpenAlertState}/>
  // </div>
  // </div>
  )
}

// const DIRECTQUOTES = 'Direct quotes'
// const REPHRASED = 'Rephrased'
// const ANY = 'any'

export default App;
