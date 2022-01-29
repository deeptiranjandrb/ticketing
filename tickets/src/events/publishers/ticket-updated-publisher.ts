import { Publisher, Subjects, TicketUpdatedEvent } from '@drbgittix/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}

