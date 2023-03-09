import SearchBarSmall from './SearchBarSmall'
import logo from '../../logo.png';
import global from '../../Global';

// page header which contains logo and search bar
function App({phrase, tags, yearStart, yearEnd, paraphrased}) {
	return (
		<div style={{display: 'flex', flexDirection: 'row', background: global.colors.grey}}>
        <img src={logo} alt="Logo" style={{height: '7vh', margin: '1em'}} />
        <SearchBarSmall phrase={phrase} tags={tags} yearStart={yearStart} yearEnd={yearEnd} paraphrased={paraphrased}/>
      </div>
	)
}

export default App