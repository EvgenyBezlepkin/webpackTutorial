
// import * as $ from 'jquery'
import Post from "./Post"
// импорт сиэсэс сюда
import './styles/style.css'
import './styles/less.less'
import logo from './assets/japan.jpeg'
import './babel'

import React from 'react'
import {render} from 'react-dom'

const App = () => (
    <div>

    <div className="container">
        <h1>Webpack course</h1>
    </div>

    <div className="box">
        <h1>less</h1>
    </div>

    <pre></pre>
    </div>
)

render(<App/>, document.getElementById('app'))

const post = new Post("Webpack post title")

// $('pre').html(post.title)

console.log(post)

console.log(logo)

