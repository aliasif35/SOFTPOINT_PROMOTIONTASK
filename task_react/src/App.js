import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import './App.css'
import { TabPanel, TabContext, TabList } from '@mui/lab'
import Box from '@mui/material/Box'
import PermIdentity from '@mui/icons-material/PermIdentity'
import WorkOutline from '@mui/icons-material/WorkOutline'
import Tab from '@mui/material/Tab'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Grid} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Draggable } from "react-drag-reorder"


function  App (){  

  const [tabValue, settabValue]=useState(0)
  const [promotions, setPromotions]=useState(JSON.parse(localStorage.getItem('sp_promotions')) != null ? JSON.parse(localStorage.getItem('sp_promotions')):[])
  const[apiCall,setApiCall]=useState(promotions.length==0?true:false)
 
  const handleChange = (event, newValue) => {
    settabValue(newValue)
  }
  useEffect(() => {
    console.log(promotions.length, apiCall)
   if(promotions.length==0 && apiCall){
    setApiCall(false)
    axios
      .get(
        "https://run.mocky.io/v3/484016a8-3cdb-44ad-97db-3e5d20d84298"       
      )
      .then((response) => {     
      localStorage.setItem('sp_promotions', JSON.stringify(response.data))
      setPromotions(response.data)
      })
    }
    }, [])  

  function arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        setPromotions(arr)
        localStorage.setItem('sp_promotions', JSON.stringify(arr))
    }
 const getChangedPos = (currentPos, newPos) => {
    arraymove(promotions,currentPos,newPos)
  };
     
    return (
      promotions.length>0?(
      <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PROMOTIONS
          </Typography>
          <Button color="inherit">Welcome User</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid
    container
    columnSpacing={1}
    alignContent="center"
    justifyContent="center"
    marginTop="70px"
      >
      <TabContext value={tabValue}>
        <Box>
          <TabList onChange={handleChange} alignContent="center" justifyContent="center">
            <Tab value={0} icon={<WorkOutline />} label="All Promotions" />
            <Tab value={1} icon={<PermIdentity />} label="New Customer" />
            </TabList>            
            <TabPanel value={0}>
            <Draggable onPosChange={getChangedPos}>
            {promotions.length>0 ?(            
              promotions.map((s, index) => {
              return (
                <div className="promotionsTask">
                <Card sx={{ maxWidth: 500, marginBottom:"50px"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={s.heroImageUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <center>
                  <Typography gutterBottom variant="h5" component="div">
                    {s.name}
                  </Typography>
                  </center>
                  <Typography variant="body2" color="text.secondary">
                   {s.description}
                  </Typography>
                </CardContent>               
              </Card>
              </div> 
              );
            })):null}
          </Draggable>
              
            </TabPanel>
            <TabPanel value={1}>
            {promotions.length>0?(            
              promotions.map((s, index) => ( 
                s.onlyNewCustomers?(             
                <Card className="promotionsTask" sx={{ maxWidth: 500, marginBottom:"50px"}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={s.heroImageUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <center>
                  <Typography gutterBottom variant="h5" component="div">
                    {s.name}
                  </Typography>
                  </center>
                  <Typography variant="body2" color="text.secondary">
                   {s.description}
                  </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined' className='danger' size="small">Terms & Condition</Button>
                    <Button variant='contained' className='primary float-right' size="small">Join NOW</Button>
                </CardActions>
              </Card>):null
              ))):null} 
              </TabPanel>
            </Box>
            
      </TabContext>
      </Grid>    
      </>):<></>
    );
  
}

export default App;