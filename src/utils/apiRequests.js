import axios from 'axios';

const url = axios.create({
    baseURL: 'https://nc-marketplace.herokuapp.com/api'
})

export function getItemsForSale() {
    return url.get('/items').then(({ data }) => {
        return data;
    }).catch(err => console.log(err))
}

export function priceFormatter(priceInPence) {
    const pounds = priceInPence / 100;
    return `£${pounds}`
}

export function postItem(item) {
    return url.get('/categories').then(({ data }) => {
        const categoryArray = data.categories;
        const exists = categoryArray.find(cat => cat === item.category_name)
        if (!exists) return url.post('/categories', item.category_name)
    }).then(() => {
        return url.post('/items', item)
    }).then(() => { console.log('item created!') })
        .catch(err => console.log(err))
}