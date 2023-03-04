import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
        const { nome } = req.body;
        axios.post('http://localhost:8080/categorias', {nome})

    } if(req.method === 'GET') {
        axios.get('http://localhost:8080/categorias')
        .then(function (response) {
            res.status(200).json(response.data);
        })
    }
    if(req.method === 'PUT'){
        const { id, nome } = req.body;
        console.log(id, nome)
        axios.put(`http://localhost:8080/categorias/${id}`, {nome})
        .then(function () {
            res.status(200).json('OK!');
        })
        
    }
  }