module.exports = (product) => {
  const { id, name, description, price } = product
  const response = {
    type: 'products',
    id,
    attributes: {
      name,
      description,
      price
    },
    links: {
      self: `/products/${id}`
    }
  }

  return response
}
