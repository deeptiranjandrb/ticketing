import { Subjects, Listener, PaymentCreatedEvent,OrderStatus } from '@drbgittix/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
    subject:Subjects.PaymentCreated = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if(!order) {
            throw new Error('Order not found');
        }

        order.set({
            status: OrderStatus.Complete,
        });
        await order.save();

        //should emit an order updated event, but after order is completed we are not changing the particular 
        // order. In this app context we can ignore emiting another event
        
        msg.ack();

    }
}