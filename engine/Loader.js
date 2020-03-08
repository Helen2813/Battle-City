;(function () {
    'use strict'

    
    class Loader {
        constructor () {
            this.loadOrder = {
                images: [],
                jsons: []
            }
            this.resourses = {
                images: [],
                jsons: []
            }
        }

        addImage (name, src) {
            this.loadOrder.images.push({name, src})
        }

        load (callback) {
            const promises = []

            for (const ImageData of this.loadOrder.images) {
                const { name, src } = ImageData

                const promise = Loader
                    .loadImage(src)
                    .then( image => {
                        this.resourses.images[name] = image

                        if (this.loadOrder.images.includes(name)) {
                            const index = this.loadOrder.images.indexOf(name)
                            this.loadOrder.images.splice(index, 1)
                        }
                    })
                promises.push(promise)
            }

            Promise.all(promises).then(() => callback)
        }

        static loadImage (src) {
            return new Promise((resolve, reject) => {
                try {
                    const image = new Image
                    image.onload = () => resolve(image)
                    image.src = src
                }
                catch (err) {
                    reject(err)
                }
                
            })
        }

    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Loader = Loader

})();