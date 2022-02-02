import { Publisher, OrderCreatedEvent, Subjects } from '@drbgittix/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}