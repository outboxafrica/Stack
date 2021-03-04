import React, {useState} from 'react'
import Toolbar from '../Toolbar/Toolbar'
import Backdrop from '../Backdrop/Backdrop'
import SideDrawer from '../SideDrawer/SideDrawer'

function PostComments(props) {

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
				   about="About"
                   comments="View Comments"
                   viewPosts="Posts"
                   log="Login"
                   sign="Signup"
				   user="Users"
				   prof="My Profile"
				   show={SideDrawerOpen} 
				 />
				{backdrop}
            <h1>view comments</h1>
        </div>
    )
}

export default PostComments
