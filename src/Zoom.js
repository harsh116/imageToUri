import {useState} from 'react'
import _ from 'lodash-contrib'
import './Zoom.css'

const Zoom=(props)=>{
	
	const {setZoomState,zoomState}=props

	const handleChange=(e)=>{
		const value=e.target.value;
		if(_.isNumeric(value))
		{
			setZoomState(Number(value))
		}
	}

	return(
	       <div className="Zoom">
	       <button onClick={()=>{
	       	setZoomState(zoomState-10)
	       }} className="zoomIn"><i class="fa fa-search-minus"></i></button>
	       	<input type="number" name="" id="" value={zoomState}
	       	onChange={handleChange}/>
	       	<button onClick={()=>{
	       	setZoomState(zoomState+10)
	       }} className="zoomOut"><i class="fa fa-search-plus"></i></button>
	       	 
	       	
	       	
	       </div>
	    )
}

export default Zoom;