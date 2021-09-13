import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import {
  onChangeHandler,
  filterProducts
} from '../../redux/menu/actionCreators'
import { DATA } from '../../data'

import './index.scss'

const { sortOptions, buttonTranslateKeys } = DATA

const Sort = ({ view, viewHandler }) => {
  const dispatch = useDispatch()
  const { sort, sortCategory, filteredProducts } = useSelector(
    state => state.menu
  )

  const updateSort = ({ target }) => {
    const { value, name } = target
    const payload = {
      name,
      value
    }

    dispatch(onChangeHandler(payload))
  }
  useEffect(() => {
    dispatch(filterProducts())
  }, [sort, sortCategory, dispatch])

  const { t } = useTranslation('translation')

  return (
    <div className="sort">
      <div className="sort__views">
        <button className="sort__views-button" onClick={viewHandler}>
          <i
            className={`${view ? 'fas fa-th' : 'fas fa-list'} sort__views-icon`}
          />
        </button>
      </div>
      <div className="sort-buttons">
        {buttonTranslateKeys.map(key => {
          return (
            <button
              onClick={updateSort}
              key={key}
              name="sortCategory"
              className="sort-buttons__option"
              value={key}
            >
              {t(`sort.buttonNames.${key}`)}
            </button>
          )
        })}
      </div>
      {filteredProducts.length > 0 && (
        <h2 className="menu-count">
          {t('menuCount', { count: filteredProducts.length })}
        </h2>
      )}
      <form className="sort-form">
        <label className="sort-form__label" htmlFor="sort">
          {t('sort.sortLabel')}
        </label>
        <select
          onChange={updateSort}
          className="sort-form__select"
          value={sort}
          name="sort"
        >
          {sortOptions.map(({ value, keyName }, index) => (
            <option
              className="sort-form__option"
              key={index}
              value={value}
              disabled={index === 0 ? true : false}
            >
              {t(`sort.sortOptions.${keyName}.name`)}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default memo(Sort)

Sort.propTypes = {
  view: PropTypes.bool.isRequired,
  viewHandler: PropTypes.func.isRequired
}
