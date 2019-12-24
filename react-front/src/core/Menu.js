import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {

    if (history.location.pathname === path) {

        return { color: "#ff9900" }
    } else {
        return { color: "#ffffff" }
    }
}

const Menu = ({ history }) => (
    <div>
		<ul className="nav nav-tabs bg-primary">
		  <li className="nav-item">
		    <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
		  </li>
			{!isAuthenticated() && (
				<>
					<li className="nav-item">
			   	 		<Link className="nav-link" to="/signin" style={isActive(history, "/signin")}>Sign In</Link>
				  	</li>
				  	<li className="nav-item">
				    	<Link className="nav-link" to="/signup" style={isActive(history, "/signup")}>Sign Up</Link>
				  	</li>
			  </>)}
			{isAuthenticated() && (	
			  <>
			  	  <li className="nav-item">
				    <a className="nav-link" style={isActive(history, "/signout"), {cursor : "pointer", color : "#ffffff"}} onClick={()=>signout(()=>history.push('/'))}>Sign out</a>
				  </li>
				  <li className="nav-item">
				    <a className="nav-link">{isAuthenticated().user.name}</a>
				  </li>
			  </>
		  )}
		</ul>
	</div>
)

export default withRouter(Menu);