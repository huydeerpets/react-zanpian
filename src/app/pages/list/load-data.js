import { listLoad } from '@/store/actions/list'
import { configLoad } from '@/store/actions/config'

function getTypeId(name) {
  let id
  switch (name) {
    case 'tv':
      id = 201
      break
    case 'ova':
      id = 202
      break
    case 'juchang':
      id = 203
      break
    case 'tebie':
      id = 4
      break
    case 'zhenren':
      id = 204
      break
    case 'qita':
      id = 35
      break
    default:
      id = 3
      break
  }
  return id
}

function isEmpty(val, type) {
  return val === undefined || val === '' || val === '-' ? (type ? 'addtime' : '') : val
}

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { name, mcid, year, area, wd = '', order, letter, lz } = match.params
    const id = getTypeId(name)
    const reMcid = isEmpty(mcid)
    const reYear = isEmpty(year)
    const reArea = isEmpty(area)
    const reLetter = isEmpty(letter)
    const reLz = isEmpty(lz)
    const reOrder = isEmpty(order, 1)
    await listLoad({
      id,
      wd,
      mcid: reMcid,
      year: reYear,
      area: reArea,
      letter: reLetter,
      lz: reLz,
      order: reOrder
    })(store.dispatch, store.getState)
    await configLoad({ name: 'list' })(store.dispatch, store.getState)

    resolve({ code: 200 })
  })
}
