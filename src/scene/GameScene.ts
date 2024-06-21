import {
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'

import GameEntity from '@/entities/GameEntity'
import GameMap from '@/map/GameMap'
import ResourceManager from '@/utils/ResourceManager'

export default class GameScene {
  private static _instance = new GameScene()
  static get instance() {
    return this._instance
  }
  private _width = window.innerWidth
  private _height = window.innerHeight
  private _renderer: WebGLRenderer
  private _camera: PerspectiveCamera

  // three.js scene
  private readonly _scene = new Scene()
  // Game entities array
  private _gameEntities: GameEntity[] = []

  private constructor() {
    // renderer
    this._renderer = new WebGLRenderer({ alpha: true, antialias: true })
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(this._width, this._height)
    // target element
    const targetElement = document.getElementById('app')
    if (!targetElement) {
      throw new Error('Unable to find target element.')
    }
    targetElement.appendChild(this._renderer.domElement)
    // setup camera
    const aspectRatio = this._width / this._height
    this._camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000)
    this._camera.position.set(7, 7, 15)
    // listen to size changes
    window.addEventListener('resize', this.resize)

    // add the game map
    const gameMap = new GameMap(new Vector3(0, 0, 0), 15)
    this._gameEntities.push(gameMap)
  }

  private resize = () => {
    this._width = window.innerWidth
    this._height = window.innerHeight
    this._renderer.setSize(this._width, this._height)
    this._camera.aspect = this._width / this._height
    this._camera.updateProjectionMatrix()
  }
  // Load game entities
  public load = async () => {
    await ResourceManager.instance.load()
    // load game entities
    for (let i = 0; i < this._gameEntities.length; i++) {
      const element = this._gameEntities[i]
      await element.load()
      this._scene.add(element.mesh)
    }
    // add a light to the scene
    const light = new HemisphereLight(0xffffbb, 0x080820, 1)
    this._scene.add(light)
  }

  public render = () => {
    requestAnimationFrame(this.render)

    this._renderer.render(this._scene, this._camera)
  }
}
