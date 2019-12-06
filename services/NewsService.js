import axios from 'axios';
const key = '587f618ce1104e4cac5d3aaa47792ba2';
const url = `https://newsapi.org/v2/top-headlines?apiKey=${key}`;

class NewsService {

  constructor(country = 'fr') {
    this.country = country;
  }

  async getNewsByCategories(categories = []) {
    let news = [];
    let promises = categories.map(category => axios.get(`${url}&country=${this.country}&category=${category}`));
    let res = await Promise.all(promises);
    res.map(({data}, index) => data.articles.map(article => news.push({ category: categories[index], ...article })));
    
    return news;
  }

}

export default NewsService;