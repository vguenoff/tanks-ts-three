import { Texture, TextureLoader } from 'three'

export default class ResourceManager {
  private static _instance = new ResourceManager()
  public static get instance() {
    return this._instance
  }
  private _groundTextures: Texture[] = []

  private constructor() {}

  public load = async () => {
    // create a unique texture loader
    const textureLoader = new TextureLoader()
    await this._loadGroundTextures(textureLoader)
  }

  private _loadGroundTextures = async (textureLoader: TextureLoader) => {
    const groundTextureFiles = [
      'g1.png',
      'g2.png',
      'g3.png',
      'g4.png',
      'g5.png',
      'g6.png',
      'g7.png',
      'g8.png',
    ]

    for (let i = 0; i < groundTextureFiles.length; i++) {
      const element = groundTextureFiles[i]
      const texture = await textureLoader.loadAsync(`textures/${element}`)
      this._groundTextures.push(texture)
    }
  }

  public getRandomTexture = () =>
    this._groundTextures[
      Math.floor(Math.random() * this._groundTextures.length)
    ]
}
