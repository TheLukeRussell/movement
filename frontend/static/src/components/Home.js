import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { motion } from "framer-motion";

const pageVariants = {
  in: {
      opacity: 1,
      x:0,
      scale: 1
  },
  out: {
      opacity: 0,
      x: "-100%",
      scale: .8
  }
}
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1
}

class Home extends Component{

    render() {
    return (
      <React.Fragment>
        <div className="bg-image"></div>
        <motion.div exit="out" animate="in" initial="out" transition={pageTransition} variants={pageVariants} className="bg-text">
          <div className="row no-gutters mt-3 mb-5">
        <div className='col-md' id='logo'>Movement</div>
        </div>
        <h3 className='mb-0'>The app that connects Greenville musicians to one another</h3>
        <h5>Click below to Login or Signup!</h5>
        <Link to="/login"><button className='btn btn-dark'>Login</button></Link>
        <Link to="/signup-choice"><button className='btn btn-dark'>Signup</button></Link>
            <div id='content-sources'>*This is where I will site sources if I have any*</div>
            </motion.div>
            </React.Fragment>
    );
    }
}

export default Home; 