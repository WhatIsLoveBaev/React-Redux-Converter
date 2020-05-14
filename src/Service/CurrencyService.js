class CurrencyService {

    _apiBase = 'https://www.cbr-xml-daily.ru/daily_json.js'
    
    async getResource(url) {
        const res = await fetch(`${this._apiBase}`)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` `,received ${res.status}` )
        }
        return await res.json()
    }

    async getAllObject() {
        const res = await this.getResource()
        return res   
    }
    async getObjectValute() {
        const res = await this.getResource()
        
        return res.Valute
    }

    
}

export default CurrencyService

