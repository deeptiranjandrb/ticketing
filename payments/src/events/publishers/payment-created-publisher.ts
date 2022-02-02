import { Subjects, Publisher, PaymentCreatedEvent } from '@drbgittix/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}