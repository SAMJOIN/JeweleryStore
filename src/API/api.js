import axios from "axios";
import md5 from "blueimp-md5";

const GeneratePassword = () => {
    const date = new Date();
    const timeStamp = date.toLocaleString('ru-Ru').split(',')[0].split('.').reverse().join('')
    // return 'a45cbdfd64776f5e4838b61122540faf'
    return md5(`Valantis_${timeStamp}`)
}

const instance = axios.create({
    baseURL: 'http://api.valantis.store:40000/',
    headers: { 'X-Auth': GeneratePassword() }
})

export const itemAPI = {
    async getIds(offset, limit) {
        try {
            const response = await instance.post('', {
                'action': 'get_ids',
                'params': { 'offset': offset, 'limit': limit }
            })
            return response.data.result;
        } catch (error) {
            console.error('Request failed: ', error);
            return await this.getIds(offset, limit);
        }
    },
    async getItems(ids) {
        try {
            const response = await instance.post('', {
                'action': 'get_items',
                'params': { 'ids': ids }
            })
            return response.data.result;
        } catch (error) {
            console.error('Request failed: ', error);
            return await this.getItems(ids);
        }
    },
    async filterItemsByPrice(price) {
        try {
            const response = await instance.post('', {
                'action': 'filter',
                'params': { "price": price}
            })
            return response.data.result;
        } catch (error) {
            console.error('Request failed: ', error);
            return await this.filterItemsByPrice(price);
        }
    },
    async filterItemsByProduct(product) {
        try {
            const response = await instance.post('', {
                'action': 'filter',
                'params': { "product": product}
            })
            return response.data.result;
        } catch (error) {
            console.error('Request failed: ', error);
            return await this.filterItemsByProduct(product);
        }
    },
    async filterItemsByBrand(brand) {
        try {
            const response = await instance.post('', {
                'action': 'filter',
                'params': { "brand": brand}
            })
            return response.data.result;
        } catch (error) {
            console.error('Request failed: ', error);
            return await this.filterItemsByBrand(brand);
        }
    },
    
}