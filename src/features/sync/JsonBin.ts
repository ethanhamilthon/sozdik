export class Npoint {
  private id
  private root = 'https://api.npoint.io/'
  constructor(id: string) {
    this.id = id
  }

  public async getData() {
    const res = await fetch(this.root + this.id)
    return await res.json()
  }

  public async setData(data: string) {
    const res = await fetch(this.root + this.id, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await res.json()
  }
}
