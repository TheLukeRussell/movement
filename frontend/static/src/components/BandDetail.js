import React, {Component} from 'react';
import axios from 'axios';
import Header from './Header'
import {motion} from "framer-motion"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.common["Authorization"] = localStorage.getItem('my-app-user') ? `Token ${JSON.parse(localStorage.getItem('my-app-user')).key}` : null;

const pageVariants = {
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    }
}
const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: .5
}

class BandDetail extends Component {


    state = {
        user: '',
        band_following: [],
    }

    componentDidMount() {
        // console.log(JSON.parse(localStorage.getItem('my-app-user')).key)
        axios.get(`/api/v1/users/${this.props.match.params.id}/`, )
            .then(res => {
            // console.log('res', res.data);
            this.setState(res.data);
            })
            .catch(error => {
            console.log(error);
        });
        axios.get(`/api/v1/rest-auth/user/`)
            .then (res => this.setState({user: res.data}))
            .catch(error => {
                console.log(error);
            });
        
}


render() {

    const bandFollowing = this.state.band_following.map(band_following => (
        <motion.a whileHover={{scale: 1.1, color: '#C3073F'}} whileTap={{scale:1}} href={`/profile/detail/${band_following.id}`}>{band_following.username}</motion.a>
    ))

    let artistPlay;
    let artistFollow;
    console.log(this.state);
    if(this.state.band) {
        artistPlay = `https://open.spotify.com/embed/artist/${this.state.band.uri}`
        artistFollow = `https://open.spotify.com/follow/1/?uri=spotify:artist:${this.state.band.uri}&size=detail&theme=dark`
    }
    return(
        <React.Fragment>
        <Header/>
        <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="app">
        <div className="profile-head">
            {this.state.band && <img className='mt-5' src={this.state.band.avatar} alt="profile"/>}
            {this.state.band && <p className='mt-4'>{this.state.band.name}</p>}
            
            
        </div>
        <div className="row profile-detail">
    <div className="col-xl-8">
        <div className="row no-gutters">
            <div id='profile-box' className="col-md-5">
                <h2>About Us</h2>
                {this.state.band && <p>{this.state.band.about}</p>}
                <iframe src={artistFollow} title='player' width="230" height="56" scrolling="no" frameBorder="0" allowtransparency="true"></iframe>
            </div>
            <div id='profile-box' className="col-md-5">
                <h2 className='mb-5'>Members</h2>
                <div id='follow-me'>{bandFollowing}</div>
            </div>
        </div>
    </div>
    <div className="col-xl-4 profile-right">
        <h3 className='mb-0 p-0'>Check out our Top Tracks!</h3>
        <iframe src={artistPlay} title='follow' width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
</div>
        </motion.div>
        </React.Fragment>
    )
}

}

export default BandDetail