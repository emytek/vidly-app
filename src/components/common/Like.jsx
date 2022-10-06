import React, { Component } from 'react';

//Input: liked: boolean
//Output: onClick

const Like = ({liked, onClick}) => {
    let classes = "fa fa-heart"
    if(liked) classes += "-o"    //classes class rendered conditionally
  
    return (
        <div>
            <i 
                onClick={onClick} 
                style={{ cursor: "pointer"}} 
                className={classes} 
                aria-hidden="true"> 
            </i>
        </div>
    )
}


export default Like


// class Like extends Component {
    
//     render() { 
//         let classes = "fa fa-heart"
//         if(!this.props.liked) classes += "-o"    //classes class rendered conditionally
//         return (
            // <i 
            //     onClick={this.props.onClick} 
            //     style={{ cursor: "pointer"}} 
            //     className={classes} 
            //     aria-hidden="true"> 
            // </i>
//         );
//     }
// }
 
// export default Like;