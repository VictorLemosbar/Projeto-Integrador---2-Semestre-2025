
const P2 = ({ dado }) => {
    return (
        <div>
            <p>Id: <strong>{dado.id}</strong></p>
            <p>Nome: <strong>{dado.nome}</strong></p>
            <p>Pressão: <strong>{dado.pressão}</strong></p>
        </div>
    )
}

export default P2