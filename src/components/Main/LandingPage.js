import React, {useState} from 'react'
import Toolbar from '../Toolbar/Toolbar'
import Backdrop from '../Backdrop/Backdrop'
import SideDrawer from '../SideDrawer/SideDrawer'


function LandingPage(props) {

    const [ SideDrawerOpen, setSideDrawerOpen ] = useState(false);

	function drawerToggleClickHandler() {
		setSideDrawerOpen((prevState) => {
			return { SideDrawerOpen: !prevState.SideDrawerOpen };
		});
	}

	function backdropClickHandler() {
		setSideDrawerOpen(false);
	}
    
	

	let backdrop;

	if (SideDrawerOpen) {
		backdrop = <Backdrop click={backdropClickHandler} />;
	}
    return (
        <div>
            <Toolbar
				   login="Login" 
				   signup="Signup" 
				   drawerClickHandler={drawerToggleClickHandler} 
				 />
				

            <SideDrawer
				   log="Login" 
				   sign="Signup"
				   show={SideDrawerOpen} 
				 />
				{backdrop}
            <main className="main">
            <div className="content">
            <h1>Landing page</h1>
            </div>
            </main>
        </div>
    )
}

export default LandingPage
