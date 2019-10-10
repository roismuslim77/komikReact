import { combineReducers } from 'redux'

import getAnime from './anime'
import getMangaRecent from './mangaRecent'
import getMangaTop from './mangaTop'
import getMangaExplore from './mangaExplore'
import getMangaSearch from './mangaSearch'
import getGenre from './genre'
import getMangaGenre from './mangaGenre'
import getLoved from './lovedList'
import getMangaDetail from './mangaDetail'
import getMangaChapter from './mangaChapter'

const indexReducer = combineReducers({
    getAnime,
    getGenre,
    getLoved,
    getMangaRecent,
    getMangaTop,
    getMangaExplore,
    getMangaSearch,
    getMangaGenre,
    getMangaDetail,
    getMangaChapter
})

export default indexReducer