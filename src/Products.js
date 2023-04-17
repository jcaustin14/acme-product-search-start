import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ()=> {
  const { products } = useSelector(state => state);
  const [search, setSearch] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const [productList, setProductList] = useState(products.map(p => p));

  useEffect(() => {
    if(checkbox){
      setProductList(products.filter(p => p.inStock));
    } else {
      setProductList(products.map(p => p));
    }
  },[checkbox])

  return (
    <div>
      <div id='searchAndCheckBoxDiv'>
        <div id='searchDiv'>
          <input placeholder='search by name' onChange={ev => setSearch(ev.target.value)}></input>
        </div>
        <div id='checkBoxDiv'>
          <label htmlFor='checkBox'>in stock only</label>
          <input id='checkBox' type='checkbox' onChange={ev => setCheckbox(!checkbox)}></input>
        </div>
      </div>
      <ul>
        {(!checkbox) ?
          products.filter(_p => _p.name.includes(search)).map( product => {
            return (
              <li key={ product.id }>
                { product.name }
                { !!product.inStock && <em> is in stock</em>}
              </li>
            );
          })
        :
        products.filter(p => p.inStock).filter(_p => _p.name.includes(search)).map( product => {
          return (
            <li key={ product.id }>
              { product.name }
              { !!product.inStock && <em> is in stock</em>}
            </li>
          );
        })
        }
      </ul>
    </div>
  );
};

export default Products;
