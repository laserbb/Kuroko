export class Country {
  id: Number
  name: String

  constructor (id:Number, name: String){
    this.id = id
    this.name = name
  }
}

export class Category {
  id: Number
  name: String
  code: String

  constructor (id:Number, name: String, code: String){
    this.id = id
    this.name = name
    this.code = code
  }
}

export class Brand {
  id: Number
  name: String
  code: String

  constructor (id:Number, name: String, code: String){
    this.id = id
    this.name = name
    this.code = code
  }
}

export class Car {
  id: Number
  author: User
  title: String
  desc: String
  cover: String
  countries: Country
  category: String
  content: String
  brand: String
  constructor (id:Number, author: User, title: String, desc: String, cover: String, countries: Country, category: String,
               brand: String, content: String){
    this.id = id
    this.author = author
    this.title = title
    this.desc = desc
    this.cover = cover
    this.countries = countries
    this.category = category
    this.brand = brand
    this.content = content
  }
}

export class User {
  id: Number
  first_name: String
  last_name: String
  username: String
  email: String

  constructor (id:Number, first_name: String, last_name: String, username: String, email: String){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.username = username
    this.email = email
  }
}
