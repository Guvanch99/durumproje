import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeaturedProducts } from '../../redux/home/actionCreator'

import {
  FeaturedFood,
  ImageSlider,
  Motto,
  Contacts,
  Spinner
} from '../../components'

const Home = () => {
  const dispatch = useDispatch()
  const { featuredProducts } = useSelector(state => state.home)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  return (
    <>
      {featuredProducts ? (
        <>
          <ImageSlider />
          <Motto />
          <FeaturedFood />
          <Contacts />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Home
