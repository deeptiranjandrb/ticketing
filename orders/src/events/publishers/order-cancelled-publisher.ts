import { Publisher, OrderCancelledEvent, Subjects } from '@drbgittix/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}