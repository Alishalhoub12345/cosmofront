import React from 'react'

import ProductsPerDepartment from '../Components/ProductsPerDepartment/ProductsPerDepartment';
import { Outlet } from "react-router-dom";

function ProductsPerDepartmentPage() {


  return (
    <>
    <ProductsPerDepartment/>
    <Outlet />

    </>
  )
}

export default ProductsPerDepartmentPage