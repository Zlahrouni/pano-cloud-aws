import axios from "axios";
import {useNavigate} from "react-router-dom";

export function AddArticle() {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(JSON.stringify(data))
        axios.post('/api/article/add', data)
            .then(response => {
                if (response.status == 200) {
                    form.reset();
                    navigate('/')
                } else {
                    alert('Failed to add article');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return (
        <div className="container">
            <h1 className="mb-4">Add Article</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" name="title" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea id="content" name="content" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}