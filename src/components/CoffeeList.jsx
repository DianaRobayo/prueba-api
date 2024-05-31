import axios from 'axios';
import React, { useState, useEffect } from 'react'

export const CoffeeList = () => {

  const [coffeesList, setCoffeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Cantidad de items a mostrar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/coffee/hot');
        setCoffeeList(response.data);
      } catch (error) {
        console.log('Error al recuperar los datos del cafe:', error);
      }
    };
    fetchData();
  }, []);

  //Agrega la pagina actual
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  //Volver a la primera pagina
  const handleReset = () => {
    setCurrentPage(1);
  }

  // Calcular el indice del ultimo elemento en la pagina actual
  const indexOfLastItem =  currentPage * itemsPerPage;
  // Calcular el indice del primer elemento en la pagina actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Obtener los elementos que se deben mostrar en la pagina actual
  const currentItems = coffeesList.slice(indexOfFirstItem, indexOfLastItem);
  // Calcular el numero total de paginas necesarias
  const totalPages = Math.ceil(coffeesList.length / itemsPerPage);


  return (
    <div className='container my-4'>
       <h1 className="text-center text-black mb-4">Coffee List</h1>
      <div className='row'>
        {currentItems.map((dato, index) => {
          <div className='col-md-3 mb-4' key={index}>
            <div className='card h-100'>
              <img src={dato.image} className="card-img-top" alt={dato.title} />
              <div className="card-body">
                <h5 className="card-title">{dato.title}</h5>
                <p className="card-text">{dato.description}</p>
              </div>
            </div>
          </div>
        })}
      </div>

      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-primary" onClick={handleReset}>Volver al inicio</button>
      </div>

    </div>
  )
}
