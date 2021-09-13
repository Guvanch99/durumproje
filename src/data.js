import {
  ROUTER_ABOUT,
  ROUTER_HOME,
  ROUTER_LOGIN,
  ROUTER_MENU,
  ROUTER_PROMOTIONS,
  ROUTER_SIGN_UP
} from './constants'

export const DATA = {
  links: [
    {
      url: ROUTER_HOME,
      keyName: 'home'
    },
    {
      url: ROUTER_MENU,
      keyName: 'menu'
    },
    {
      url: ROUTER_ABOUT,
      keyName: 'about'
    },
    {
      url: ROUTER_PROMOTIONS,
      keyName: 'promotions'
    }
  ],
  menuAuthCart: [
    {
      url: ROUTER_LOGIN,
      keyName: 'login',
      iconName: 'fa-user'
    },
    {
      url: ROUTER_SIGN_UP,
      keyName: 'signUp',
      iconName: 'fa-user-plus'
    }
  ],
  sortOptions: [
    {
      value: '',
      keyName: 'notSelected'
    },
    {
      value: 'price-lowest',
      keyName: 'priceLowest'
    },
    {
      value: 'price-highest',
      keyName: 'priceHighest'
    },
    {
      value: 'name-a',
      keyName: 'nameAZ'
    },
    {
      value: 'name-z',
      keyName: 'nameZA'
    }
  ],
  images: [
    {
      url: 'https://images.pexels.com/photos/5779368/pexels-photo-5779368.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      text: 'Meat'
    },
    {
      url: 'https://images.pexels.com/photos/5779423/pexels-photo-5779423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      text: 'Shawarma'
    },

    {
      url: 'https://images.pexels.com/photos/5779372/pexels-photo-5779372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      text: 'cutting shawarma'
    }
  ],

  contactsKey: [
    [
      {
        icon: 'fas fa-map-marker-alt',
        text: 'contacts.contact.address.name'
      },
      {
        icon: 'fas fa-envelope',
        text: 'info@atadurum.com '
      },
      {
        icon: 'fas fa-phone-alt',
        text: '+375290789000'
      }
    ],
    [
      {
        icon: 'fab fa-instagram',
        text: 'instagram'
      },
      {
        icon: 'fab fa-vk',
        text: 'vk'
      },
      {
        icon: 'fab fa-telegram',
        text: 'telegram'
      }
    ],
    [
      {
        icon: 'fab fa-clock',
        text: 'contacts.workingSchedule.mondayThursday.name'
      },
      {
        icon: 'fab fa-clock',
        text: 'contacts.workingSchedule.friday.name'
      },
      {
        icon: 'fab fa-clock',
        text: 'contacts.workingSchedule.satSunday.name'
      }
    ]
  ],

  buttonTranslateKeys: ['All', 'Combo', 'Durum', 'Beverage'],

  tableNameTranslateKeys: [
    'img',
    'name',
    'amount',
    'price',
    'subTotal',
    'remove'
  ],

  whyWeTranslateKeys: ['Health', 'Food', 'Style', 'Afford'],

  ourValueTranslateKeys: [
    'firstValue',
    'secondValue',
    'thirdValue',
    'fourthValue'
  ],

  mottoImage:
    'https://thumbs.dreamstime.com/b/food-delivery-man-motorcycle-isolated-white-background-helmet-yellow-moped-vector-illustration-214857732.jpg',
  logo: 'https://i.ibb.co/TvkqJHJ/logo.png',
  mostLovedFoodImage: 'https://i.ibb.co/TMjP3zN/Doner.png',
  promoImage: 'https://i.ibb.co/s5S4LQq/promo.png'
}
