Object.assign(Array.prototype, {
  setKey(key) {
    this._key = key
    this._list = {}
    for (const o of this) {
      if (o[key] === undefined) {
        delete this._list, delete this._key; return false
      }
      this._list[o[key]] = o
    }
    return true
  },
  get(v) { return this._list[v] },
  up(arr) {
    const drr = Object.keys(this._list)
    let add=0,up=0
    for (const o of arr) {
      const i = drr.indexOf(o[this._key]+'')
      if (i!==-1) drr.splice(i, 1),up++; else add++
      this.set(o)
    }
    for (const v of drr) {
      let o = {}; o[this._key] = v; this.del(o)
    }
    return { add, up, del: drr.length }
  },
  set(o) {
    if (!this._key) return false
    const v = o[this._key]
    if (this._list[v]) Object.assign(this._list[v], o)
    else {
      this._list[v]=o
      this.push(o)
    }
    return true
  },
  del(obj) {
    const ov = obj[this._key]
    let i = 0
    for (const o of this) {
      i++
      if (ov!=o[this._key]) continue
      delete this._list[ov]
      return this.splice(i-1, 1)[0]
    }
  }
})