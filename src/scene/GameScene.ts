import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

export default class GameScene {
  static #instance = new GameScene()
  static get instance() {
    return this.#instance
  }
  #width = window.innerWidth
  #height = window.innerHeight
  #renderer: WebGLRenderer
  #camera: PerspectiveCamera

  // three.js scene
  readonly #scene = new Scene()

  constructor() {
    // renderer
    this.#renderer = new WebGLRenderer({ alpha: true, antialias: true })
    this.#renderer.setPixelRatio(window.devicePixelRatio)
    this.#renderer.setSize(this.#width, this.#height)
    // target element
    const targetElement = document.getElementById('app')
    if (!targetElement) {
      throw new Error('Unable to find target element.')
    }
    targetElement.appendChild(this.#renderer.domElement)
    // setup camera
    const aspectRatio = this.#width / this.#height
    this.#camera = new PerspectiveCamera(45, aspectRatio, 0.1, 1000)
    this.#camera.position.set(0, 0, 3)
    // listen to size changes
    window.addEventListener('resize', this.#resize)
  }

  #resize = () => {
    this.#width = window.innerWidth
    this.#height = window.innerHeight
    this.#renderer.setSize(this.#width, this.#height)
    this.#camera.aspect = this.#width / this.#height
    this.#camera.updateProjectionMatrix()
  }

  load() {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)
    this.#scene.add(cube)
  }

  render = () => {
    requestAnimationFrame(this.render)
    this.#renderer.render(this.#scene, this.#camera)
  }
}
