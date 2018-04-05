import React, {Component} from 'react'

import VideoListItem from '../components/video-list-item'

const VideoList = (props) => {
    const {movies} = props
    return (
        <ul>
            { movies.map((movie) => <VideoListItem key={movie.id} movie={movie} callback={receiveMovie} />) }
        </ul>
    )

    function receiveMovie (movie) {
        props.callback(movie)
    }
}

export default VideoList