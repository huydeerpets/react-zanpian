// import { loadReportTypes } from '@actions/report';
import { loadUserInfo } from '@/store/actions/user'
import { ads } from '@/store/actions/ads'

// 初始化数据
// redux 中的数据清理、以及准备一些经常不变的数据
export default (store, uid) => {
  return new Promise(async resolve => {
    // 再其他地方已经处理，这里暂时保留逻辑
    // =======================================================
    // store的数据，如果不清空，store的数据会一直存在
    store.dispatch({ type: 'CLEAN' })

    // =======================================================
    // 一些经常通用数据，不会经常更新的数据，在服务器获取并储存在store中

    await ads({ id: 24 })(store.dispatch, store.getState)
    await ads({ id: 25 })(store.dispatch, store.getState)

    if (uid) {
      let res = await loadUserInfo({ uid })(store.dispatch, store.getState)
      resolve(res)
    } else {
      resolve([])
    }
  })
}
