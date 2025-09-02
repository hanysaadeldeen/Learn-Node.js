class ApiDelete {
  constructor(model) {
    this.model = model;
  }

  async Delete(prodId) {
    return await this.model.findByIdAndDelete(prodId);
  }
}

module.exports = ApiDelete;
