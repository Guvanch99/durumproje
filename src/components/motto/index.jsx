import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { DATA } from '../../data'
import { ArticleName } from '..'

import './index.scss'

const { mottoImage } = DATA

const Motto = () => {
  const { t } = useTranslation('translation')

  return (
    <>
      <ArticleName name={t('articleNames.motto')} />
      <div className="motto">
        <img className="motto__image" src={mottoImage} alt="Motto" />
        <div className="motto__text">
          <h2 className="motto__text-main">{t('motto.mottoMain')} </h2>
          <h1 className="motto__text-secondary">{t('motto.mottoSecondary')}</h1>
        </div>
      </div>
    </>
  )
}

export default memo(Motto)
