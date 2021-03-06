import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { CartItems } from '..'

import { DATA } from '../../data'

import './index.scss'


const { tableNameTranslateKeys } = DATA

const CartTable = () => {
  const { t } = useTranslation('translation')
  const { cart } = useSelector(state => state.cart)


  let tableHeadRows = tableNameTranslateKeys.map(key => (
    <th key={key}>
      <h4 style={{ margin: '0 0.4rem' }}>{t(`cartTable.${key}`)}</h4>
    </th>
  ))
  let table = cart.map(item => <CartItems key={item.id} {...item} />)

  return (
    <>
      <table className='table'>
        <thead className='table__header'>
        <tr>{tableHeadRows}</tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </>
  )
}

export default CartTable
