import React, { useState } from 'react';
import './Products.css'; // Import the CSS file

// Mock data
const initialProducts = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, stock_quantity: 10 },
  { id: 2, name: 'Headphones', category: 'Electronics', price: 99.99, stock_quantity: 20 },
  { id: 3, name: 'T-shirt1', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 4, name: 'T-shirt2', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 5, name: 'T-shirt3', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 6, name: 'T-shirt4', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 7, name: 'T-shirt5', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 8, name: 'T-shirt6', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 9, name: 'T-shirt7', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 10, name: 'T-shirt8', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 11, name: 'T-shirt9', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 12, name: 'T-shirt10', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 13, name: 'T-shirt11', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 14, name: 'T-shirt12', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 15, name: 'T-shirt13', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 16, name: 'T-shirt14', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 17, name: 'T-shirt15', category: 'Clothing', price: 19.99, stock_quantity: 50 },
  { id: 18, name: 'T-shirt16', category: 'Clothing', price: 19.99, stock_quantity: 50 },
];

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock_quantity: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); 

  const handleAdd = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock_quantity) {
      alert('All fields are mandatory');
      return;
    }
    const newProduct = {
      id: products.length + 1,
      ...formData
    };
    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock_quantity: ''
    });
    setShowAddForm(false); 
  };

  const handleEdit = (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, isEditing: true };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleCanceled = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock_quantity: ''
    });
    setShowAddForm(false);
  };

  const handleSave = (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, isEditing: false };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, [name]: value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  
  const indexOfLastProduct = currentPage * productsPerPage;
  
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Logic to paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='heading'>
      <h1>Product Management</h1>
      {showAddForm ? (
        <div>
          <h2>Add Product</h2>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </label>
            <label>
              Price:
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
              Stock Quantity:
              <input type="number" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required />
            </label>
            <div>
              <button type="button" onClick={handleAdd}>Add</button>
              <button type="button" onClick={handleCanceled}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={() => setShowAddForm(true)}>Add Product</button>
      )}
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.id}>
              <td>
                {product.isEditing ? (
                  <input type="text" name="name" value={product.name} onChange={(e) => handleChange(e, product.id)} />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {product.isEditing ? (
                  <input type="text" name="category" value={product.category} onChange={(e) => handleChange(e, product.id)} />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {product.isEditing ? (
                  <input type="number" name="price" value={product.price} onChange={(e) => handleChange(e, product.id)} />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td>
                {product.isEditing ? (
                  <input type="number" name="stock_quantity" value={product.stock_quantity} onChange={(e) => handleChange(e, product.id)} />
                ) : (
                  product.stock_quantity
                )}
              </td>
              <td>
                {product.isEditing ? (
                  <>
                    <button onClick={() => handleSave(product.id)}>Save</button>
                   
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(product.id)}>Edit</button>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination buttons */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Products;
