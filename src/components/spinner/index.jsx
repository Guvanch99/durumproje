import { memo } from 'react'

import shawarma from '../../assets/shawarma.png'

import './index.scss'

const Spinner = () => (
  <div className="spinner">
    <img className="spinner_img" src={shawarma} alt="shawarma" />
  </div>
)
export default memo(Spinner)
