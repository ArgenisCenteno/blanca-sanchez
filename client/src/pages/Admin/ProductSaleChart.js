import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);
 
 
 

export const ProductSaleChart = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/api/v1/product/product-sales');
            console.log(response.data)
            // Verifica si response.data contiene la información necesaria
            if (response.data && Array.isArray(response.data)) {
                
                setProductData(response.data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
      const productNames = productData.map(product => product.name);
      const productSales = productData.map(product => product.sale);

      const data = {
        labels: productNames,
        datasets: [
          {
            data: productSales,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              // ... Puedes agregar más colores si es necesario
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              // ... Puedes agregar más colores si es necesario
            ],
            borderWidth: 1,
          },
        ],
      };
    
       
  return (
    <div>
        <h4>Productos más vendidos</h4>
   <Pie data={data} />;  
    </div>
  
  )
}
