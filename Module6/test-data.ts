import { CartEntity, CartItemEntity } from "./model/cart.entity"
import { OrderEntity } from "./model/order.entity"
import { ProductEntity } from "./model/product.entity"
import { UserEntity } from "./model/user.entity"

export const usersList: UserEntity[] = [{
  "id": "81a04664-d3b4-4abd-ac44-20b4c0105af2",
  'role': 'admin',
  'email': 'admin@mail.com',
  'password': 'admin'
},
{
  "id": "1bc07dd7-23ee-498d-a415-40b4a626d272",
  "role": "user",
  'email': 'user@mail.com',
  'password': 'user'
}]

export const productsData = [{
  "id": "d2e682b6-438a-4c93-a417-4bd52ea9da74",
  "title": "Book",
  "description": "Interesting book",
  "price": 200
},
{
  "id": "08d375a2-41fe-4722-a6c0-aafdb9826ab2",
  "title": "Pen",
  "description": "Cute pen",
  "price": 20
},
{
  "id": "98ac8709-4062-4442-855d-7d7dc3632808",
  "title": "Mug",
  "description": "Coffe mug",
  "price": 80
}]

const bookProduct1: ProductEntity = {
  "id": "d2e682b6-438a-4c93-a417-4bd52ea9da74",
  "title": "Book",
  "description": "Interesting book",
  "price": 200
}
const product2: ProductEntity = {
  "id": "08d375a2-41fe-4722-a6c0-aafdb9826ab2",
  "title": "Pen",
  "description": "Cute pen",
  "price": 20
}
const product3: ProductEntity = {
  "id": "98ac8709-4062-4442-855d-7d7dc3632808",
  "title": "Mug",
  "description": "Coffe mug",
  "price": 80
}

const cartItem1: CartItemEntity = {
  product: bookProduct1,
  count: 2,
}
const cartItem2: CartItemEntity = {
  product: product2,
  count: 1,
}

export const carts: CartEntity[] = [{
  id: '1434fec6-cd85-420d-95c0-eee2301a971d',
  userId: '81a04664-d3b4-4abd-ac44-20b4c0105af2',
  isDeleted: false,
  items: [cartItem1],
},
{
  id: '167ab747-ffbe-4be2-9a1f-ac9a5ff70c1d',
  userId: '1bc07dd7-23ee-498d-a415-40b4a626d272',
  isDeleted: true,
  items: [],
}]

export const orderEntities: OrderEntity[] =
  [
    {
      id: 'order1',
      userId: '81a04664-d3b4-4abd-ac44-20b4c0105af2',
      cartId: '1434fec6-cd85-420d-95c0-eee2301a971d',
      items: [cartItem1],
      payment: {
        type: 'credit',
        creditCard: '1234-5678-9012-3456',
      },
      delivery: {
        type: 'home',
        address: '123 Main St',
      },
      comments: 'Please deliver after 5pm',
      status: 'created',
      total: 400,
    },
    {
      id: 'order2',
      userId: '1bc07dd7-23ee-498d-a415-40b4a626d272',
      cartId: '167ab747-ffbe-4be2-9a1f-ac9a5ff70c1d',
      items: [cartItem2],
      payment: {
        type: 'debit',
        creditCard: '2345-6789-0123-4567',
      },
      delivery: {
        type: 'office',
        address: '456 Broadway St',
      },
      comments: 'Please deliver before noon',
      status: 'created',
      total: 20,
    },
    {
      id: 'order3',
      userId: '81a04664-d3b4-4abd-ac44-20b4c0105af2',
      cartId: '1434fec6-cd85-420d-95c0-eee2301a971d',
      items: [cartItem1, cartItem2],
      payment: {
        type: 'cash',
      },
      delivery: {
        type: 'pickup',
        address: '789 Park Ave',
      },
      comments: 'I will pick up at 3pm',
      status: 'completed',
      total: 420,
    },
  ]