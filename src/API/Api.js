import axios  from 'axios';
let request;


async function consult() {
    try {
       const path = 'http://textilrossignolo.dyndns.org:1880/dadosProjeto';
        request = (await axios.get(path)).data
        console.log(request)
        
        return request
    } catch (error) {
        console.log("Não foi possivel acessar a url")
        request = "Não foi possivel identificar"
    }
    return request
}

consult();



export default consult;
