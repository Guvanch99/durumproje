import React from 'react'
import {MemoryRouter} from "react-router-dom";

import PromoDay from '../components/promo-day'

export default {
    title: 'PromoDay',
    component: PromoDay
}
export const baseLook = () => <MemoryRouter><PromoDay  /></MemoryRouter>
