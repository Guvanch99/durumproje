import React from 'react'
import ListView from '../components/list-view'


export default {
    title: 'ListView',
    component: ListView
}
const products=[
    {
        "id": 1,
        "name": "products.1.name",
        "src": "https://i.ibb.co/vhs7GF2/kombo-cow.jpg",
        "description": "products.1.description",
        "price": 10,
        "type": "combo"
    },
    {
        "id": 2,
        "name": "products.2.name",
        "src": "https://i.ibb.co/WxdDstk/kombo-chicken.jpg",
        "description": "products.2.description",
        "price": 8,
        "type": "combo"
    },
    {
        "id": 3,
        "name": "products.3.name",
        "src": "https://i.ibb.co/S0Vq0y8/combo-mix.jpg",
        "description": "products.3.description",
        "price": 11,
        "type": "combo"
    },
    {
        "id": 4,
        "name": "products.4.name",
        "src": "https://i.ibb.co/KLDyxjX/Mega-Doner.jpg",
        "description": "products.4.description",
        "price": 9,
        "type": "durum"
    },
    {
        "id": 5,
        "name": "products.5.name",
        "src": "https://i.ibb.co/WsDJvjr/Doner-Tukey.png",
        "description": "products.5.description",
        "price": 5,
        "type": "durum"
    },
    {
        "id": 6,
        "name": "products.6.name",
        "src": "https://i.ibb.co/WsDJvjr/Doner-Tukey.png",
        "description": "products.6.description",
        "price": 5.5,
        "type": "durum"
    },
    {
        "id": 7,
        "name": "products.7.name",
        "src": "https://i.ibb.co/KV6kDgK/Doner-mushroom.png",
        "description": "products.7.description",
        "price": 5.5,
        "type": "durum"
    }
]
export const FewItems = () => <ListView products={products}/>
