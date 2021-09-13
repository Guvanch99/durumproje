import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchAllProducts } from '../../redux/menu/actionCreators'
import {
  Sort,
  ProductsList,
  Spinner,
  PageHero,
  ArticleName
} from '../../components'

const Menu = () => {
  const { t } = useTranslation('translation')
  const [view, setView] = useState(true)
  const dispatch = useDispatch()

  const { allProducts } = useSelector(state => state.menu)
  const viewHandler = useCallback(() => setView(!view), [view])

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <>
      {!allProducts ? (
        <Spinner />
      ) : (
        <div>
          <PageHero title={t('pageHero.menu')} />
          <ArticleName name={t('articleNames.menu')} />
          <div>
            <Sort view={view} viewHandler={viewHandler} />
            <ProductsList view={view} />
          </div>
        </div>
      )}
    </>
  )
}

export default Menu
