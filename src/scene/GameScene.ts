import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

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

  constructor() {
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
    this._camera.position.set(0, 0, 3)
    // listen to size changes
    window.addEventListener('resize', this.resize)
  }

  public resize = () => {
    this._width = window.innerWidth
    this._height = window.innerHeight
    this._renderer.setSize(this._width, this._height)
    this._camera.aspect = this._width / this._height
    this._camera.updateProjectionMatrix()
  }

  public load() {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00ff })
    const cube = new Mesh(geometry, material)
    this._scene.add(cube)
  }

  public render = () => {
    requestAnimationFrame(this.render)
    this._renderer.render(this._scene, this._camera)
  }
}
