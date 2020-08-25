class JsonSpec {
  /**
   * @param {string} type
   * @param {{_id: string, ...attributes}} target
   * @param {string} pagePath
   */
  static convertOne (type, target, pagePath) {
    const data = {
      type,
      id: target._id,
      attributes: {
        ...target
      }
    }
    const links = {
      self: pagePath
    }

    const response = {
      data,
      links
    }

    return response
  }

  /**
   * @param {string} type
   * @param {{_id: string, ...attributes}[]} targets
   * @param {string} pagePath
   */
  static convertMany (type, targets, pagePath) {
    const data = targets.map((target) => {
      return {
        type,
        id: target._id,
        attributes: {
          ...target
        }
      }
    })
    const links = {
      self: pagePath
    }

    const response = {
      data,
      links
    }

    return response
  }
}

module.exports = JsonSpec
