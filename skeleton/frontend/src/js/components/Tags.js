import {React, useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
// import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Button, Modal, Grid} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from '@primer/react'
// import { AlertModalProvider, DialogModalProvider } from 'material-ui-modal'
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import global from '../../Global'
import $ from 'jquery'

// checkbox in customized blue color
const BlueCheckbox = withStyles({
    root: {
      color: global.colors.blue,
      '&$checked': {
        color: global.colors.blue,
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

// display tags as checkboxes
export default function Tags({tags, allResults}) {
    const navigate = useNavigate()
    const location = useLocation()
    const [checked, setChecked] = useState(false)
    const [selected, setSelected] = useState([])
    const [showTags, openModal] = useState(false)

    // if (!showTags && location?.state?.openModal) openModal(true)
    // if (showTags && !location?.state?.openModal) openModal(false)

    const initStatus = {}
    tags.forEach(t => initStatus[t] = false)
    const [status, setStatus] = useState({})

    const handleChange = (tag) => {
        setChecked(!checked)
        status[tag] = !status[tag]
        setStatus(status)
        setSelected(Object.keys(status).filter(k => status[k]))
        console.log('stat', status)
    }

    const clearAll = () => {
        setChecked(!checked)
        Object.keys(status).forEach(v => status[v] = false)
        setStatus(status)
        setSelected([])
        openModal(false)
        navigate('', {state: {tags: [], allResults: allResults, from: 'Tags'}})
        console.log('stat', status)
    }
      
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '3em', marginBottom: '.5em', width: '100%'}}>
                <h4>Tags</h4>
                <Button
                    sx={{textTransform: 'none', right: 0, height: '2.5em', marginTop: '1em'}}
                    onClick={(e) => {
                    e.preventDefault()
                    if (!showTags) openModal(true)
                }}>See more</Button>
            </div>
            <FormGroup column>
            {/* <FormControlLabel
            control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
            label="Secondary"
            /> */}
                {tags.slice(0,5).map(t =>
                    <FormControlLabel
                    control={
                        <BlueCheckbox
                        checked={status[t]}
                        onChange={() => handleChange(t)}
                        name="tag"
                        size="small"
                        // color="primary"
                        />
                    }
                    label={<span style={{ fontSize: '.9em' }}>{t}</span>}
                    />
                )}
                <Modal
                    open={showTags}
                    onClose={() => openModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={{padding: '2em', background: 'white', color: 'black', width: '50vw', position: 'fixed', top: '5vh', left: '25vw', textAlign:' center', maxHeight: '90vh', overflow: 'scroll'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <p style={{fontWeight: 'bold', marginBottom: '2em'}}>Select tags</p>
                            <IconButton
                                aria-label="Close"
                                icon={CloseIcon}
                                style={{border: 'none', background: 'none'}}
                                onClick={() => openModal(false)} />
                        </div>
                        <Grid container spacing={1}>
                            {tags.map(t => 
                                <Grid item style={{width: '15em', textAlign: 'start'}}>
                                    {/* <div style={{padding: '.8em', background: '#f0f0f0', borderRadius: '6px', fontSize: 'small'}}>{t}</div> */}
                                    <FormControlLabel
                                        control={
                                            <BlueCheckbox
                                            checked={status[t]}
                                            onChange={() => handleChange(t)}
                                            name="tag"
                                            size="small"
                                            // color="primary"
                                            />
                                        }
                                        label={<span style={{ fontSize: '.9em' }}>{t}</span>}
                                    />        
                                </Grid>)}
                        </Grid>
                        <div style={{textAlignLast: 'end', marginBottom: '1em'}}>
                            <Button
                                variant="outlined"
                                style={{height: '2.5em', width: '7em', marginTop: 30, fontSize: 'medium', textTransform: 'none', color: 'black', borderRadius: '10px', marginRight: '1em'}}
                                onClick={clearAll}
                                >Clear all</Button>
                            <Button
                                variant="outlined"
                                style={{height: '2.5em', width: '7em', marginTop: 30, fontSize: 'medium', textTransform: 'capitalize', color: 'white', background: global.colors.blue, borderRadius: '10px'}}
                                onClick={() => {
                                    openModal(false)
                                    navigate('', {state: {tags: selected, allResults: allResults, from: 'Tags'}})}
                            }
                                >Apply</Button>
                        </div>
                    </div>
                </Modal>
                <div>
                    <Button
                        variant="outlined"
                        style={{height: '2.5em', width: '6em', marginTop: 30, fontSize: 'medium', textTransform: 'none', color: 'black', borderRadius: '10px', marginRight: '1em'}}
                        onClick={clearAll}
                        >Clear all</Button>
                    <Button
                        variant="outlined"
                        style={{height: '2.5em', width: '6em', marginTop: 30, fontSize: 'medium', textTransform: 'capitalize', color: 'white', background: global.colors.blue, borderRadius: '10px'}}
                        onClick={() => navigate('', {state: {tags: selected, allResults: allResults, from: 'Tags'}})}
                        >Apply</Button>
                </div>
            </FormGroup>
        </div>
    );
}