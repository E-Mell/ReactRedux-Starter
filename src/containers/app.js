import React, {Component} from 'react'
import axios from 'axios'

import SearchBar from '../components/search-bar'
import VideoDetail from '../components/video-detail'
import Video from '../components/video'
import VideoList from './video-list'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=8660719fccd95f5e14940c6c427cf3ea"

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {movies: {}, currentMovie: {}}
    }

    componentWillMount () {
        this.getMovies()
    }

    getMovies () {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
            .then(response => {
                this.setState({
                    movies: response.data.results.slice(1, 6),
                    currentMovie: response.data.results[0]
                }, () => this.getVideoToCurrentMovieId())
            }).catch(err => console.error(err))
    }

    getVideoToCurrentMovieId () {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?append_to_response=videos&include_adult=false&${API_KEY}`)
            .then(response => {
                const youtubeKey = response.data.videos.results[0].key
                let newCurrentMovieState = this.state.currentMovie

                newCurrentMovieState.videoId = youtubeKey

                this.setState({currentMovie: newCurrentMovieState})
            })
            .catch(err => console.error(err))
    }

    onClickListItem (movie) {
        this.setState({currentMovie: movie}, () => {
            this.getVideoToCurrentMovieId()
            this.getRecommendations()
        })
    }

    onClickSearch (query) {
        if (!query) return false

        axios.get(`${API_END_POINT}search/movie?language=fr&include_adult=false&${API_KEY}&query=${query}`)
            .then(response => {
                if (response.data && response.data.results[0]) {
                    if (response.data.results[0].id !== this.state.currentMovie.id)
                        this.setState({currentMovie: response.data.results[0]},
                            () => {
                                this.getVideoToCurrentMovieId()
                                this.getRecommendations()
                            })
                }
            }).catch(err => console.error(err))
    }

    getRecommendations () {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
            .then(response => {
                this.setState({movies: response.data.results.slice(0, 5)})
            }).catch(err => console.error(err))
    }

    render () {
        const renderVideoList = () => {
            if (this.state.movies.length >= 5)
                return <VideoList movies={this.state.movies} callback={this.onClickListItem.bind(this)} />
        }

        return (
            <div>
                <div className="searchbar">
                    <SearchBar callback={this.onClickSearch.bind(this)} />
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Video id={this.state.currentMovie.videoId} />

                        <VideoDetail
                            title={this.state.currentMovie.title}
                            desc={this.state.currentMovie.overview}
                        />
                    </div>
                    <div className="col-md-4">
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        )
    }
}

export default App