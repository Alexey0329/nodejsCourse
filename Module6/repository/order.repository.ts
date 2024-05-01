// import Order, {OrderEntity} from "../entity/order.entity.ts";
import Cart from "../model/cart.entity";
import Order from "../model/order.entity";
import { CartEntity } from "../model/cart.entity";
import { DeliveryDetails, OrderEntity, PaymentDetails } from "../model/order.entity";
import { getTotalCartPrice } from "../service/cart.service";

export const createNewOrder = async (userId: string): Promise<OrderEntity | boolean> => {
  let cart: CartEntity | null = null;
  if (userId) {
    cart = await Cart.findOne({ userId: userId });
  }
  if (!cart || cart.items.length === 0 || cart.isDeleted) {
    return false;
  }

  const paymentInfo = {
    type: 'credit_card',
    address: '123 Main St, London, London, 12345',
    creditCard: {
      number: '1234-1234-1234-1234',
      expiration: '12/24',
      cvv: '123'
    }
  } as PaymentDetails;

  const deliveryInfo = {
    type: 'post', address: {
      street: '123 Main St',
      city: 'London',
      state: 'London',
      zip: '12345'
    }
  } as DeliveryDetails;

  const total = await getTotalCartPrice(cart);

  const order = new Order({
    userId: cart.userId,
    cartId: cart.id,
    items: cart.items,
    payment: paymentInfo,
    delivery: deliveryInfo,
    comments: 'Please deliver before 5pm',
    status: 'created',
    total: total
  });
  const savedOrder = await order.save();
  cart.isDeleted = true;
  await cart.save();

  console.log('Saved order ' + savedOrder);
  return savedOrder;
}
