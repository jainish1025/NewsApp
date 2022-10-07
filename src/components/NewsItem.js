import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, discription, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge
                    rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>{source}</span>
                    <img src={!imageUrl ? "https://feeds.abplive.com/onecms/images/uploaded-images/2022/09/30/89ea560a9e8402e5143d33e841680a33166451553644225_original.jpg?impolicy=abp_cdn&imwidth=1200&imheight=628" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>


                        <h5 className="card-title">{title} <span className="badge rounded-pill bg-primary">New</span> </h5>
                        <p className="card-text">{discription}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
