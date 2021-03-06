import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import ArticleName from '../article-name'

import { DATA } from '../../data'

import './index.scss'

const { mostLovedFoodImage } = DATA

const FeaturedFood = () => {
  const { t } = useTranslation('translation')
  const { featuredProducts } = useSelector(state => state.home)

  return (
    <>
      <ArticleName name={t('articleNames.loved')} />
      <div className="featured-product">
        <img
          className="featured-product__main-image"
          src={mostLovedFoodImage}
          alt="doner"
        />
        <ul className="featured-product__menu">
          {featuredProducts.map(({ id, name, src, description, price }) => (
            <li className="featured-product__list" key={id}>
              <img className="featured-product__image" src={src} alt={name} />
              <div className="featured-product__container">
                <h1 className="featured-product__name">{t(name)}</h1>
                <p className="featured-product__description">
                  {t(description).slice(0, 50)}
                </p>
                <p className="featured-product__price">
                  {t('productPrice', { price })}
                  {t('productPriceCurrency')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default memo(FeaturedFood)
