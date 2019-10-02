import { combineReducers } from 'redux'

import getAnime from './anime'
import getMangaRecent from './mangaRecent'
import getMangaTop from './mangaTop'
import getMangaExplore from './mangaExplore'
import getMangaSearch from './mangaSearch'
import getGenre from './genre'
import getMangaGenre from './mangaGenre'
import getLoved from './lovedList'

const indexReducer = combineReducers({
    getAnime,
    getGenre,
    getLoved,
    getMangaRecent,
    getMangaTop,
    getMangaExplore,
    getMangaSearch,
    getMangaGenre
})

export default indexReducer