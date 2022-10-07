import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        name: 'in',
        pageSize: 7,
        category:'general'
    }
    static propsType = {
        country: PropTypes.string,
        category: PropTypes.number,
        pageSize: PropTypes.string,
    }
    constructor() {
        super();
        // console.log("Hello I am constructor form newa component")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d95ebdc7d6284b278b75f4b89a746f99&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false })
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    // this is a function that perform a previews and next button actions
    handlePrevuClick = async () => {
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d95ebdc7d6284b278b75f4b89a746f99&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }

    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d95ebdc7d6284b278b75f4b89a746f99&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false

            })
        }

    }


    render() {
        // console.log("render")
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{margin: '40px 0px'}}>News - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 key={element.url} ">
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} discription={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage}
                                newsUrl={element.url} author={element.author} date  ={element.publishedAt}
                                source={element.source.name} />
                        </div>
                    })}

                </div>

                <div className="container d-flex justify-content-between">
                    {/* this &larr; and &rarr; is used to show the arrow is the buttons <--  --> */}
                    {/* If i.m using class function so i want to use this. function to targate */}
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevuClick} > &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>

            </div>
        )
    }
}
