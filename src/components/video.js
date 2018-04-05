import React from 'react'

const VIDEO_BASE_URL = "https://www.youtube.com/embed/"

const Video = ({id}) => {
    return (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe
                className="embed-responsive-item"
                src={`${VIDEO_BASE_URL}${id}`}
            />
        </div>
    )
}

export default Video