import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
        const { nome } = req.body;
        axios.post('http://localhost:8080/categorias', {nome}).then(function (r) {
            res.status(200).json(r.data);
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
    if(req.method === 'DELETE'){
        const { id } = req.query;

        axios.delete(`http://localhost:8080/categorias/${id}`)
        .then(function () {
            res.status(200).json('Recurso excluído com sucesso!');
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json('Erro ao excluir o recurso');
        });    
    }
  }