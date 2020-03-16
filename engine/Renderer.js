;(function () {
    'use strict'

    class Renderer {
        constructor (args = {}) {
            this.canvas = document.createElement('canvas')
            this.context = this.canvas.getContext('2d')

            this.background = args.background || 'white'
            this.canvas.width = args.width || 50
            this.canvas.height = args.height || 50
            this.update = args.update || (() => {})

            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        tick(timestamp) {
            this.clear()
            this.update(timestamp)
            requestAnimationFrame(timestamp => this.tick(timestamp))
        }

        draw (callback) {
            callback(this.canvas, this.context)
        }

        clear () {
            this.draw((canvas, context) => {
                context.fillStyle = this.background
                context.beginPath()
                context.rect(0, 0, canvas.width, canvas.height )
                context.fill()
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Renderer = Renderer
})();