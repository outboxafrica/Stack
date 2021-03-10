import React, {useState} from 'react'
import Toolbar from '../../UI/Toolbar/Toolbar'
import Backdrop from '../../UI/Backdrop/Backdrop'
import SideDrawer from '../../UI/Backdrop/SideDrawer/SideDrawer'


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
