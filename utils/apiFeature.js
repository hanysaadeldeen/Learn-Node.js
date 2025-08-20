class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.page = 1; // default
    this.limit = 20;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|ne)\b/g,
      (match) => `$${match}`
    );
    const filter = JSON.parse(queryStr);
    // Object.assign(this.filterObj, filter);
    this.query = this.query.find(filter);
    return this;
  }

  // search with Keyword
  search() {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      const searchQuery = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
      this.query = this.query.find(searchQuery);
    }
    return this;
  }

  // Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort(sortBy);
    } else {
      this.query.sort("-createdAt");
    }
    return this;
  }

  // Field selection
  fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query.select(fields);
    } else {
      this.query.select("-__v");
    }
    return this;
  }

  // Pagination
  paginate() {
    this.page = this.queryString.page * 1 || 1;
    this.limit = this.queryString.limit * 1 || 20;
    const skip = (this.page - 1) * this.limit;
    this.query = this.query.skip(skip).limit(this.limit);
    return this;
  }
}

module.exports = ApiFeature;
