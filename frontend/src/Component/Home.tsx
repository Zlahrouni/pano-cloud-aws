import {useEffect, useState} from "react";

export type Article = {
    title: string;
    content: string;
}
export function Home() {
    const [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        fetch('/api/articles')
            .then(response => response.json())
            .then(data => {
                if(data!= null && data.length > 0) {
                    setArticles(data);
                }
            })

    }, []);

    return (
        <div className="container">
            {articles.length === 0 ? (
                <p>Not Found</p>
            ) : (
                <div className="row">
                    {articles.map((article, index) => (
                        <div key={index} className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">{article.title}</h2>
                                    <p className="card-text">{article.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}