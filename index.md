---
layout: home

hero:
  name: "Vue Modeler"
  text: "OOP for state management in Vue"
  tagline: "No store — no problem. Less boilerplate — more productivity"
  image:
    src: /logo.webp
  actions:
    - theme: brand
      text: Getting Started
      link: /introduction/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/vue-modeler

features:
  - icon: 📦
    title: Model instead of store
    details: No store — no problem. State is encapsulated in the model. The model is a shallowReactive object. Destroying the model destroys the state.
  - icon: ⚡
    title: Action is an object
    details: Has its own state and behavior for execution control. Created automatically from a model method.
  - icon: 🏛️
    title: OOP
    details: Model is defined via a standard class, actions via methods. Inheritance, encapsulation, polymorphism, destructor are available by default.
  - icon: 🏗️
    title: Model and dependency container
    details: No need to think about how to create, get, or remove a model after use — the container handles it.
  - icon: ✂️
    title: Less code
    details: Action has methods for execution control and error handling. You will write less boilerplate.
  - icon: 🧪
    title: Easy testing
    details: Less code — fewer tests.
  - icon: 🗜️
    title: Minimal size
    details: Compact library with minimal bundle size.
  - icon: 🔒
    title: Type safety
    details: All autocomplete hints work both inside and outside the class context.
---
