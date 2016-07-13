class Component {
  constructor(model) {
    this.model = model
    model.onChange(() => this.render())
    this.el = document.createElement('div')
    document.body.appendChild(this.el)
  }
}

class Collection {
  constructor() {
    this.collection = []
    this.callbacks = []
  }

  onChange(fn) {
    this.callbacks.push(fn)
  }

  push(thing) {
    this.collection.push(thing)
    this.callbacks.forEach(function (callback) {
      callback()
    })
  }

  get(i) {
    return this.collection[i]
  }

  get length() {
    return this.collection.length
  }
}

class ChatComponent {

  constructor(model) {
    this.model = model
  }

  render () {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const form = document.createElement('form')

    const input = form.appendChild(document.createElement('input'))
    input.classList.add('message')

    const button = form.appendChild(document.createElement('input'))
    button.setAttribute('type', 'submit')

    el.appendChild(form)
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      this.model.push(input.value)
      input.value = ''
    }.bind(this))
  }

}

class CountComponent extends Component {
  constructor(model) {
    super(model)
    this.el.classList.add('count')
  }

  render () {
    this.el.innerHTML = this.model.length
  }
}


class MessageListComponent extends Component {

  render () {
    this.el.innerHTML = ''
    document.body.appendChild(this.el)

    const messages = document.createElement('div')
    messages.classList.add('messages')
    this.el.appendChild(messages)

    for (var i = 0; i < this.model.length; i++) {
      const div = document.createElement('div')
      div.innerHTML = this.model.get(i)
      messages.appendChild(div)
    }
  }

}

const collection = new Collection()
new ChatComponent(collection).render()
new CountComponent(collection).render()
new MessageListComponent(collection).render()
