import "../userCard.css"

export default function userCard(param) { 
    let repo = param.repo;
    return(
        <div className="card-outer my-3">
            <div className="card text-white bg-dark mb-3 border-lg-warning">
            <h4 className="card-header">{repo.full_name}</h4>
            <div className="card-body">
                <p className="card-text"><strong>Stars:</strong>{repo.stargazers_count}</p>
                <p className="card-text"><strong>Watchers:</strong>{repo.watchers_count}</p>
                <a className="btn btn-warning" href={repo.html_url} target="_blank">Link</a>
            </div>
            </div>
        </div>
    )
}