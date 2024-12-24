import { request } from '../request'

export default {
  getCarStatus (params = {}) {
    return request({
      url: '/admin/robot/getOne',
      method: 'get',
      params
    })
  }
}
