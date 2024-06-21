import { Mesh, Vector3 } from 'three'

export default abstract class GameEntity {
  protected _mesh: Mesh = new Mesh()
  get mesh() {
    return this._mesh
  }

  constructor(protected _position: Vector3) {
    this._mesh.position.set(
      this._position.x,
      this._position.y,
      this._position.z,
    )
  }

  public load = async () => {}
  public update = () => {}
}
