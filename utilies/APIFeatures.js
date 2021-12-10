class APIFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
      
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const storyQuery = ['keyword', 'page', 'limit'];
    storyQuery.forEach((item) => delete queryCopy[item]);

    //product filter by category with case insensitive

    /* let category={}
      if(queryCopy.category ) {
     category={
            $regex: queryCopy.category,
            $options: 'i',
        }
    }
    //this.query = this.query.find(JSON.parse({category}));
   console.log(category);*/

    //advance filter for price ,rating
    
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
   
    this.query = this.query.find(JSON.parse(queryStr));
    
    return this;
  }
  pagination(resPerPage){
    const currentPage=Number(this.queryStr.page) || 1
      const skip=resPerPage*(currentPage-1);
      this.query=this.query.limit(resPerPage).skip(skip)

    return this
  }
}

module.exports = APIFeatures;
