import SearchBarSmall from './SearchBarSmall'
import logo from '../../logo.png';
import global from '../../Global';

// page header which contains logo and search bar
function App({tags, keywords}) {
	return (
		<div style={{display: 'flex', flexDirection: 'row', background: global.colors.grey}}>
        <img src={logo} alt="Logo" style={{height: '7vh', margin: '1em'}} />
        <SearchBarSmall tags={tags} keywords={keywords}/>
      </div>
	)
}

export default App