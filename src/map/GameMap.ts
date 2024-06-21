import { Mesh, MeshStandardMaterial, PlaneGeometry, Vector3 } from 'three'

import GameEntity from '@/entities/GameEntity'
import ResourceManager from '@/utils/ResourceManager'

class MapTile extends GameEntity {
  constructor(protected _position: Vector3) {
    super(_position)
  }

  public load = async () => {
    const tileTexture = ResourceManager.instance.getRandomTexture()
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshStandardMaterial({ map: tileTexture })

    this._mesh = new Mesh(geometry, material)
    this._mesh.position.set(
      this._position.x,
      this._position.y,
      this._position.z,
    )
  }
}

export default class GameMap extends GameEntity {
  private _tiles: MapTile[] = []

  constructor(
    protected _position: Vector3,
    private _size: number,
  ) {
    super(_position)

    // build the grid
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        this._tiles.push(new MapTile(new Vector3(i, j, 0)))
      }
    }
  }

  public load = async () => {
    for (let i = 0; i < this._tiles.length; i++) {
      const tile = this._tiles[i]
      await tile.load()
      this._mesh.add(tile.mesh)
    }
  }
}
