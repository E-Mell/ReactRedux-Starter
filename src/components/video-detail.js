import React from 'react'

const VideoDetail = ({title, desc}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{desc}</p>
        </div>
    )
}

export default VideoDetail